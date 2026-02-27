// StudentAnswerViewerModal.jsx
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import PDFPreview from '../../../../../shared/pdfPreview';

const StudentAnswerViewerModal = ({ show, onHide, submission }) => {
  const [showPdf, setShowPdf] = useState(false);

  if (!submission) return null;

  const isFileSubmission =
    submission.submissionType === 'file' || !!submission.answerFileUrl;
  const isTextSubmission =
    submission.submissionType === 'text' || submission.answerText;

  return (
    <>
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Answer - {submission.studentName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="mb-4">
            <h6 className="mb-3">Assessment: {submission.assessmentName}</h6>
            <p className="text-muted">
              Submitted: {new Date(submission.submittedAt).toLocaleString()}
            </p>
          </div>

          {/* File Submission */}
          {isFileSubmission && submission.answerFileUrl && (
            <div className="mb-4">
              <h6>Submitted File</h6>
              <div className="d-flex align-items-center gap-3">
                <div>
                  <p className="mb-2">
                    <i className="fas fa-file me-2"></i>
                    {submission.fileName || 'Submitted File'}
                  </p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setShowPdf(true)}
                  >
                    <i className="fas fa-eye me-2"></i> Preview
                  </Button>
                  <a
                    href={submission.answerFileUrl}
                    download={submission.fileName}
                    className="btn btn-outline-secondary btn-sm ms-2"
                  >
                    <i className="fas fa-download me-2"></i> Download
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Text Submission */}
          {isTextSubmission && submission.answerText && (
            <div className="mb-4">
              <h6>Student Answer</h6>
              <div className="p-3 bg-light rounded border">
                <div
                  dangerouslySetInnerHTML={{
                    __html: submission.answerText,
                  }}
                />
              </div>
            </div>
          )}

          {/* Existing Feedback */}
          {submission.feedback && (
            <div className="mb-4">
              <h6 className="text-success">Feedback</h6>
              <div className="p-3 bg-success bg-opacity-10 rounded border border-success">
                <p className="mb-2">
                  <strong>Score: </strong>
                  <span className="badge bg-success">
                    {submission.feedback.score}
                  </span>
                </p>
                <p className="mb-0">
                  <strong>Comments: </strong>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: submission.feedback.comments,
                    }}
                  />
                </p>
                <small className="text-muted d-block mt-2">
                  Reviewed:{' '}
                  {new Date(submission.feedback.submittedAt).toLocaleString()}
                </small>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* PDF Preview Modal */}
      <PDFPreview
        pdfUrl={submission.answerFileUrl}
        show={showPdf}
        onHide={() => setShowPdf(false)}
        title={`${submission.studentName}'s Submission`}
      />
    </>
  );
};

export default StudentAnswerViewerModal;
