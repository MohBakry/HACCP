import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';
import Filters from '../../../shared/filters/Filters';
import Table from '../../../shared/table';
import { InstructorForm } from './instructorForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteInstructor,
  getInstructorCourses,
  getInstructors,
} from '../../../Redux/users/users.service';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import { InstructorCoursesModal } from './instructorDetailsModal';

const fallbackImage = 'https://via.placeholder.com/80';

export default function Instructors() {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const { instructors, selectedInstructor, loading } = useSelector(
    (state) => state.users
  );

  const dispatch = useDispatch();

  const selectsConfig = [
    {
      key: 'status',
      placeholder: 'All Status',
      options: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
  ];

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
    });
  };

  useEffect(() => {
    console.log('Filters changed:', filters);
  }, [filters]);

  const [instructor, setInstructor] = useState({
    id: null,
    name: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
  });

  useEffect(() => {
    dispatch(getInstructors());
  }, []);

  const openAddModal = () => {
    setInstructor({
      id: null,
      name: '',
      email: '',
      phoneNumber: '',
      profilePicture: '',
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setInstructor(item);
    setShowModal(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Instructor Report', 10, 10);

    instructors?.forEach((i, idx) => {
      const courseTitles = i.assignedCourses
        .map((cid) => {
          const c = courses.find((c) => c.id === cid);
          return c ? c.title : 'Unknown';
        })
        .join(', ');

      const groupNames = i.groups?.map((g) => g.name).join(', ') || 'None';

      doc.text(`${idx + 1}. ${i.name} (ID: ${i.id})`, 10, 20 + idx * 30);
      doc.text(`   Email: ${i.email}`, 10, 26 + idx * 30);
      doc.text(`   Courses: ${courseTitles || 'None'}`, 10, 32 + idx * 30);
      doc.text(`   Groups: ${groupNames}`, 10, 38 + idx * 30);
    });

    doc.save('instructors_report.pdf');
  };

  const exportExcel = () => {
    const data = instructors?.map((i) => ({
      Name: i.name,
      ID: i.id,
      Email: i.email,
      'Assigned Courses': i.assignedCourses
        .map((cid) => {
          const c = courses.find((c) => c.id === cid);
          return c ? c.title : 'Unknown';
        })
        .join(', '),
      Groups: i.groups?.map((g) => g.stratDate).join(', ') || 'None',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Instructors');
    XLSX.writeFile(wb, 'instructors_report.xlsx');
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button className={`${styles.addButton}`} onClick={openAddModal}>
            <i className="fa fa-plus me-1"></i> Add
          </Button>
          <Button
            className="btn btn-outline-danger bg-light"
            onClick={exportPDF}
          >
            <i className="fa fa-file-pdf me-1"></i> Export PDF
          </Button>
          <Button
            className="btn btn-outline-success bg-light"
            onClick={exportExcel}
          >
            <i className="fa fa-file-excel me-1"></i> Export Excel
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Filters
          filters={filters}
          onChange={setFilters}
          selects={selectsConfig}
          onReset={resetFilters}
        />
      </div>
      <Table
        data={instructors}
        columns={[
          {
            key: 'profilePicture',
            label: '',
            component: (data) =>
              data.profilePicture ? (
                <img
                  src={data.profilePicture}
                  alt={data.name}
                  style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <i
                  className={`fa fa-user pt-2 ${styles.iconColor}`}
                  style={{ width: '35px', height: '35px', fontSize: '30px' }}
                ></i>
              ),
          },
          { key: 'name', label: 'User Name' },
          { key: 'email', label: 'Email' },
          { key: 'phoneNumber', label: 'Phone' },
          {
            key: 'isActive',
            label: 'Status',
            component: (data) =>
              data.isActive ? (
                <label className="text-success">Active</label>
              ) : (
                <label className="text-danger">Deactivated</label>
              ),
          },
        ]}
        onEdit={openEditModal}
        onDelete={(data) => {
          setShowDeleteModal(true);
          setInstructor(data);
        }}
        onView={(data) => {
          setShowDetailsModal(true);
          dispatch(getInstructorCourses(data._id));
        }}
      />

      <InstructorForm
        instructor={instructor}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <InstructorCoursesModal
        data={selectedInstructor}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Instructor"
        message={`Are you sure you want to delete user?`}
        loading={loading?.deleteInstructor}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          dispatch(deleteInstructor(instructor._id))
            .unwrap()
            .then(() => {
              dispatch(getInstructors());
              setShowDeleteModal(false);
            });
        }}
      />
    </div>
  );
}
