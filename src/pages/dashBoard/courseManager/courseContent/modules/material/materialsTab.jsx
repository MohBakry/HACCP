// materials/MaterialsTab.jsx
import { useState } from 'react';
import MaterialList from './materialList';
import MaterialUploadModal from './materialForm';
import DeleteConfirmModal from '../../../../../../shared/deleteConfirmation/DeleteConfirmationModal';
import styles from '../../styles.module.css';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteMaterial,
  getCourseContent,
} from '../../../../../../Redux/courseContent/courseContent.service';
import { useParams } from 'react-router-dom';

const MaterialsTab = ({ module }) => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState(null);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.courseContent);
  const { courseId } = useParams();

  const handleDeleteClick = (materialId) => {
    setMaterialToDelete(materialId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async (materialId) => {
    try {
      await dispatch(
        deleteMaterial({
          courseId,
          moduleId: module._id,
          materialId,
        })
      ).unwrap();
      // Refresh course content after deletion
      dispatch(getCourseContent(courseId));
      setShowDeleteModal(false);
      setMaterialToDelete(null);
    } catch (error) {
      console.error('Failed to delete material:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setMaterialToDelete(null);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          className={`btn btn-sm btn-outline-primary mb-2 ${styles.button}`}
          onClick={() => setShowModal(true)}
        >
          <i className="fa fa-plus me-1"></i> Add Material
        </Button>
      </div>
      <MaterialList
        moduleId={module._id}
        materials={module.materials}
        onDelete={handleDeleteClick}
      />

      <MaterialUploadModal
        show={showModal}
        moduleId={module._id}
        onClose={() => setShowModal(false)}
        onUpload={() => setShowModal(false)}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Material"
        message="Are you sure you want to delete this material? This action cannot be undone."
        confirmText="Delete Material"
        loading={loading}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        itemId={materialToDelete}
      />
    </>
  );
};

export default MaterialsTab;
