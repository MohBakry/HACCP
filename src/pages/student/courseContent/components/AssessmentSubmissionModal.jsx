import React from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import styles from '../styles.module.css';

export default function AssessmentSubmissionModal({
  show,
  onHide,
  selectedModule,
  selectedAssessment,
  assessmentText,
  setAssessmentText,
  assessmentFile,
  setAssessmentFile,
  submitting,
  onSubmit,
}) {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        setAssessmentFile(null);
        setAssessmentText('');
      }}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-upload me-2"></i>
          {selectedAssessment?.studentSubmission?.status === 'rejected' ||
          selectedAssessment?.studentSubmission?.status === 'failed'
            ? 'Resubmit'
            : selectedAssessment?.studentSubmission
              ? 'View'
              : 'Submit'}{' '}
          Assessment - {selectedAssessment?.title || selectedModule?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Text Area for Written Response */}
          <Form.Group className="mb-4">
            <Form.Label className={styles.formLabel}>
              <i className="fas fa-pen me-2"></i>
              Your Response (Optional)
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={assessmentText}
              onChange={(e) => setAssessmentText(e.target.value)}
              placeholder="Enter your written response here..."
              className={styles.textArea}
            />
            <Form.Text className="text-muted">
              You can submit text, a file, or both.
            </Form.Text>
          </Form.Group>

          {/* File Upload */}
          <Form.Group>
            <Form.Label className={styles.formLabel}>
              <i className="fas fa-file-upload me-2"></i>
              Upload File (Optional)
            </Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setAssessmentFile(e.target.files[0])}
              accept=".pdf,.doc,.docx,.zip,.jpg,.jpeg,.png,.xls,.xlsx"
              className={styles.fileInput}
            />
            <Form.Text className="text-muted">
              Accepted formats: PDF, DOC, DOCX, ZIP, JPG, PNG, XLS (Max 20MB)
            </Form.Text>
          </Form.Group>

          {assessmentFile && (
            <Alert variant="info" className="mt-3">
              <i className="fas fa-check me-2"></i>
              Selected: <strong>{assessmentFile.name}</strong>
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onHide();
            setAssessmentFile(null);
            setAssessmentText('');
          }}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onSubmit}
          disabled={submitting || (!assessmentFile && !assessmentText)}
        >
          {submitting ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Submitting...
            </>
          ) : (
            <>
              <i className="fas fa-check me-2"></i>
              Submit Assessment
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
