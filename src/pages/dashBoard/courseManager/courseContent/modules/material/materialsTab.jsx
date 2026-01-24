// materials/MaterialsTab.jsx
import { useState } from 'react';
import MaterialList from './materialList';
import MaterialUploadModal from './materialForm';
import styles from '../../styles.module.css';
import { Button } from 'react-bootstrap';

const MaterialsTab = ({ module }) => {
  const [showModal, setShowModal] = useState(false);

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
      <MaterialList materials={module.materials} />

      <MaterialUploadModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onUpload={() => setShowModal(false)}
      />
    </>
  );
};

export default MaterialsTab;
