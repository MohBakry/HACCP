import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import styles from './styles.module.css';
import Filters from '../../../shared/filters/Filters';
import Table from '../../../shared/table';
import { CourseTrackForm } from './courseTrackForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCourseTrack,
  getCourseTrackDetails,
  getCourseTracks,
} from '../../../Redux/courseTracks/courseTracks.service';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import { CourseTrackDetailsModal } from './courseTrackDetailsModal';

export default function CourseTracks() {
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    published: '',
  });
  const { courseTracks, selectedCourseTrack, loading } = useSelector(
    (state) => state.courseTracks
  );

  const dispatch = useDispatch();

  const selectsConfig = [
    {
      key: 'published',
      placeholder: 'All Status',
      options: [
        { label: 'Published', value: 'true' },
        { label: 'Not Published', value: 'false' },
      ],
    },
  ];

  const resetFilters = () => {
    setFilters({
      search: '',
      published: '',
    });
  };

  useEffect(() => {
    console.log('Filters changed:', filters);
  }, [filters]);

  const [courseTrack, setCourseTrack] = useState({
    id: null,
    name: '',
    description: '',
    courses: [],
  });

  useEffect(() => {
    dispatch(getCourseTracks());
  }, [dispatch]);

  const openAddModal = () => {
    setCourseTrack({
      id: null,
      name: '',
      description: '',
      courses: [],
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setCourseTrack(item);
    setShowModal(true);
  };

  const exportExcel = () => {
    const data = courseTracks?.map((track) => ({
      Name: track.name,
      Description: track.description,
      'Number of Courses': track.courses?.length || 0,
      Courses:
        track.courses?.map((c) => c.title || c.name).join(', ') || 'None',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Course Tracks');
    XLSX.writeFile(wb, 'course_tracks_report.xlsx');
  };

  return (
    <div className="container py-2">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button className={`${styles.addButton}`} onClick={openAddModal}>
            <i className="fa fa-plus me-1"></i> Add Course Track
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
        data={courseTracks}
        columns={[
          { key: 'name', label: 'Track Name' },
          { key: 'description', label: 'Description' },
          {
            key: 'courses',
            label: 'Number of Courses',
            component: (data) => (
              <span>{data.courses?.length || 0} courses</span>
            ),
          },
          {
            key: 'published',
            label: 'Published',
            component: (data) =>
              data.published ? (
                <span className="badge bg-success">Published</span>
              ) : (
                <span className="badge bg-secondary">Not Published</span>
              ),
          },
        ]}
        onEdit={openEditModal}
        onDelete={(data) => {
          setShowDeleteModal(true);
          setCourseTrack(data);
        }}
        onView={(data) => {
          setShowDetailsModal(true);
          dispatch(getCourseTrackDetails(data._id));
        }}
      />

      <CourseTrackForm
        courseTrack={courseTrack}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <CourseTrackDetailsModal
        data={selectedCourseTrack}
        showModal={showDetailsModal}
        setShowModal={setShowDetailsModal}
      />
      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Course Track"
        message={`Are you sure you want to delete this course track?`}
        loading={loading?.deleteCourseTrack}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          dispatch(deleteCourseTrack(courseTrack._id))
            .unwrap()
            .then(() => {
              dispatch(getCourseTracks());
              setShowDeleteModal(false);
            });
        }}
      />
    </div>
  );
}
