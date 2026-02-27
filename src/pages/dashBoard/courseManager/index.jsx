import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../../shared/CourseCard';
import Filters from '../../../shared/filters/Filters';
import RichTextInput from '../../../shared/formComponents/richTextInput';
import DeleteConfirmModal from '../../../shared/deleteConfirmation/DeleteConfirmationModal';
import { useToast } from '../../../shared/toast/useToast';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import {
  getCourses,
  deleteCourse,
} from '../../../Redux/courses/courses.service';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

export default function CourseManager() {
  // const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [instructors] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const { showSuccess, showError } = useToast();
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const { user } = useSelector((state) => state.auth);
  const { courses, loading } = useSelector((state) => state.courses);

  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

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

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (loading.getCourses) {
      dispatch(showLoading());
    } else if (!loading.getCourses) {
      dispatch(hideLoading());
    }
  }, [loading.getCourses, dispatch]);

  const handleDeleteCourse = (id) => {
    setCourseToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = async () => {
    if (!courseToDelete) return;

    try {
      await dispatch(deleteCourse(courseToDelete)).unwrap();
      showSuccess('Course deleted successfully!');
      await dispatch(getCourses());
    } catch (error) {
      showError(`Failed to delete course: ${error}`);
    } finally {
      setShowDeleteModal(false);
      setCourseToDelete(null);
    }
  };

  const handleDeleteGroup = (id) => {
    if (!window.confirm('Delete this group?')) return;
    const updated = groups.filter((g) => g.id !== id);
    setGroups(updated);
    localStorage.setItem('groups', JSON.stringify(updated));
  };

  const exportPDF = () => {};
  const exportExcel = () => {};

  // ------------------ RENDER ----------------------
  console.log(user, 'user');
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            className={`${styles.addButton}`}
            onClick={() => navigate('/dashboard/manage-courses/add')}
          >
            <i className="fa fa-plus me-1"></i> Add Course
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

      {courses.map((c) => {
        const courseGroups = groups.filter((g) => g.courseId === c.id);
        return (
          <div key={c.id} className="my-4">
            <CourseCard
              {...c}
              viewMode="list"
              adminMode={isAdmin}
              onEdit={() => navigate(`/dashboard/manage-courses/edit/${c._id}`)}
              onDelete={() => handleDeleteCourse(c._id)}
            />

            {courseGroups.length > 0 && (
              <div className="mt-3">
                <h6>Groups for this Course:</h6>
                {courseGroups.map((g) => {
                  const instructor = instructors.find(
                    (i) => i.id === g.instructorId
                  );
                  return (
                    <div
                      key={g.id}
                      className="border p-2 my-2 d-flex justify-content-between"
                    >
                      <div>
                        <strong>Instructor:</strong> {instructor?.name || 'N/A'}{' '}
                        | <strong>Start:</strong> {g.startDate} |{' '}
                        <strong>End:</strong> {g.endDate} |{' '}
                        <strong>Discount:</strong> {g.discount}%
                      </div>
                      <div>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteGroup(g.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={confirmDeleteCourse}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone and will remove all associated data."
        loading={loading.deleteCourse}
      />
    </div>
  );
}
