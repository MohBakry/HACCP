import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';
import Filters from '../../../shared/filters/Filters';
import Table from '../../../shared/table';
import { GroupForm } from './groupForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGroup, getGroups } from '../../../Redux/courses/courses.service';
import { getInstructors } from '../../../Redux/users/users.service';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import { GroupDetailsModal } from './groupDetailsModal';
import { useParams } from 'react-router-dom';

export default function CourseGroups() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const { groups, selectedCourse, instructors, loading } = useSelector(
    (state) => {
      return {
        groups: state.courses.groups,
        selectedCourse: state.courses.selectedCourse,
        instructors: state.users.instructors,
        loading: state.courses.loading,
      };
    }
  );

  const dispatch = useDispatch();
  const { courseId } = useParams();

  const selectsConfig = [
    {
      key: 'status',
      placeholder: 'All Status',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
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

  const [group, setGroup] = useState({
    id: null,
    courseId: courseId || '',
    instructorId: '',
    startDate: '',
    endDate: '',
    discount: 0,
  });

  useEffect(() => {
    if (courseId) {
      dispatch(getGroups(courseId));
      dispatch(getInstructors());
    }
  }, [dispatch, courseId]);

  //   useEffect(() => {
  //     if (courseId && courses.length > 0) {
  //       const selectedCourse = courses.find((c) => c._id === courseId);
  //     } else {
  //     }
  //   }, [courses, selectedCourse]);

  const openAddModal = () => {
    setGroup({
      id: null,
      courseId: courseId || '',
      instructorId: '',
      startDate: '',
      endDate: '',
      discount: 0,
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setGroup(item);
    setShowModal(true);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Course Groups Report', 10, 10);

    groups?.forEach((g, idx) => {
      const course = selectedCourse;
      const instructor = instructors.find((i) => i._id === g.instructorId);

      doc.text(
        `${idx + 1}. Group for ${course?.title || 'Unknown Course'}`,
        10,
        20 + idx * 40
      );
      doc.text(
        `   Instructor: ${instructor?.name || 'N/A'}`,
        10,
        26 + idx * 40
      );
      doc.text(`   Start Date: ${g.startDate}`, 10, 32 + idx * 40);
      doc.text(`   End Date: ${g.endDate}`, 10, 38 + idx * 40);
      doc.text(`   Discount: ${g.discount}%`, 10, 44 + idx * 40);
    });

    doc.save('course_groups_report.pdf');
  };

  const exportExcel = () => {
    const data = groups?.map((g) => {
      const course = selectedCourse;
      const instructor = instructors.find((i) => i._id === g.instructorId);

      return {
        Course: course?.title || 'Unknown',
        Instructor: instructor?.name || 'N/A',
        'Start Date': g.startDate,
        'End Date': g.endDate,
        Discount: `${g.discount}%`,
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Course Groups');
    XLSX.writeFile(wb, 'course_groups_report.xlsx');
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        <h3 className="me-auto">{selectedCourse?.title || ''} Course</h3>
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button className={`${styles.addButton}`} onClick={openAddModal}>
            <i className="fa fa-plus me-1"></i> Add Group
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
        data={groups}
        columns={[
          {
            key: 'name',
            label: 'Group Name',
            component: (data) => {
              return data.name || 'N/A';
            },
          },
          {
            key: 'instructorId',
            label: 'Instructor',
            component: (data) => {
              const instructor = data.instructorId?.name;
              return instructor || 'N/A';
            },
          },
          {
            key: 'startDate',
            label: 'Start Date',
            component: (data) => new Date(data.startDate).toLocaleDateString(),
          },
          {
            key: 'endDate',
            label: 'End Date',
            component: (data) => new Date(data.endDate).toLocaleDateString(),
          },
          {
            key: 'discount',
            label: 'Discount (%)',
            component: (data) => `${data.discount}%`,
          },
          {
            key: 'status',
            label: 'Status',
            component: (data) => {
              const now = new Date();
              const end = new Date(data.endDate);
              return end > now ? (
                <Badge bg="success">Active</Badge>
              ) : (
                <Badge bg="secondary">Inactive</Badge>
              );
            },
          },
        ]}
        onEdit={openEditModal}
        onDelete={(data) => {
          setShowDeleteModal(true);
          setGroup(data);
        }}
        onView={(data) => {
          setShowDetailsModal(true);
          setGroup(data);

          // If needed, dispatch something for details
        }}
      />

      <GroupForm
        group={group}
        showModal={showModal}
        setShowModal={setShowModal}
        courseId={courseId}
      />
      <GroupDetailsModal
        course={selectedCourse}
        data={group}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Group"
        message={`Are you sure you want to delete this group?`}
        loading={loading?.deleteGroup}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          dispatch(deleteGroup(group._id))
            .unwrap()
            .then(() => {
              dispatch(getGroups());
              setShowDeleteModal(false);
            });
        }}
      />
    </div>
  );
}
