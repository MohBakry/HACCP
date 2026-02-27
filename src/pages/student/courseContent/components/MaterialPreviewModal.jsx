import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from '../styles.module.css';

export default function MaterialPreviewModal({
  show,
  onHide,
  selectedMaterial,
}) {
  return (
    <Modal show={show} onHide={onHide} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-file me-2"></i>
          {selectedMaterial?.title || selectedMaterial?.fileName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.materialPreviewBody}>
        {selectedMaterial?.fileUrl && (
          <div className={styles.previewContainer}>
            {selectedMaterial.fileUrl.endsWith('.pdf') ? (
              <iframe
                src={selectedMaterial.fileUrl}
                width="100%"
                height="600"
                title={selectedMaterial.title || selectedMaterial.fileName}
              ></iframe>
            ) : (
              <div className={styles.downloadPrompt}>
                <i className="fas fa-file fa-3x mb-3"></i>
                <p>Preview not available for this file type.</p>
                <a
                  href={selectedMaterial.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <i className="fas fa-download me-2"></i>
                  Download File
                </a>
              </div>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
