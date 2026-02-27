// assessments/AssessmentItem.jsx
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import PDFPreview from '../../../../../../shared/pdfPreview';

const AssessmentItem = ({ assessment, onDelete }) => {
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    if (assessment && assessment.fileUrl) {
      setPdfUrl(assessment.fileUrl);
    }
  }, [assessment]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 p-3 border rounded">
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-file-alt me-2 text-primary" />
            <strong>{assessment.title}</strong>
          </div>
          {assessment.description && (
            <div
              className="text-muted small"
              dangerouslySetInnerHTML={{ __html: assessment.description }}
              style={{ maxWidth: '600px' }}
            />
          )}
        </div>

        <div className="d-flex gap-2">
          {assessment.fileUrl && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowPdf(true)}
              title="Preview Assessment"
            >
              <i className="fas fa-eye"></i>
            </Button>
          )}
          <Button
            variant="link"
            className="text-danger p-1"
            onClick={() => onDelete(assessment._id)}
            title="Delete assessment"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </div>

      {assessment.fileUrl && (
        <PDFPreview
          pdfUrl={pdfUrl}
          show={showPdf}
          onHide={() => setShowPdf(false)}
          title={assessment.title || 'Assessment Preview'}
        />
      )}
    </>
  );
};

export default AssessmentItem;
