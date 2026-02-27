// assessments/AssessmentsTab.jsx
import { useState } from 'react';
import AssessmentFormModal from './assessmentForm';
import AssessmentList from './assessmentList';
import DeleteConfirmModal from '../../../../../../shared/deleteConfirmation/DeleteConfirmationModal';
import styles from '../../styles.module.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  uploadAssessment,
  deleteAssessment,
  getCourseContent,
} from '../../../../../../Redux/courseContent/courseContent.service';
import { useParams } from 'react-router-dom';

const AssessmentsTab = ({ module }) => {
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.courseContent);
  const { courseId } = useParams();

  const handleDeleteClick = (assessmentId) => {
    setAssessmentToDelete(assessmentId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (assessmentId) => {
    try {
      await dispatch(
        deleteAssessment({
          courseId,
          moduleId: module._id,
          assessmentId,
        })
      ).unwrap();
      // Refresh course content after deletion
      dispatch(getCourseContent(courseId));
      setShowDeleteModal(false);
      setAssessmentToDelete(null);
    } catch (error) {
      console.error('Failed to delete assessment:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setAssessmentToDelete(null);
  };

  const handleSubmit = async (values) => {
    try {
      await dispatch(
        uploadAssessment({
          courseId,
          moduleId: module._id,
          title: values.title,
          description: values.description,
          file: values.file,
        })
      ).unwrap();
      // Refresh course content after upload
      dispatch(getCourseContent(courseId));
    } catch (error) {
      console.error('Failed to upload assessment:', error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-end mt-3">
        <Button
          className={`btn btn-sm btn-outline-primary mb-2 ${styles.button}`}
          onClick={() => setShow(true)}
        >
          <i className="fa fa-plus me-1"></i> Add Assessment
        </Button>
      </div>

      <AssessmentList
        assessments={module.assessments || []}
        onDelete={handleDeleteClick}
      />

      <AssessmentFormModal
        show={show}
        onClose={() => setShow(false)}
        onSubmit={handleSubmit}
        loading={loading.uploadAssessment}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Assessment"
        message="Are you sure you want to delete this assessment? This action cannot be undone."
        confirmText="Delete Assessment"
        loading={loading.deleteAssessment}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        itemId={assessmentToDelete}
      />
    </>
  );
};

export default AssessmentsTab;
