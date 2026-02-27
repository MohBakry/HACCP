import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
// import PDFPreviewModal from './PDFPreviewModal';
import PDFPreview from '../../../../../../shared/pdfPreview';

const MaterialItem = ({ material, onDelete }) => {
  // const [showPreview, setShowPreview] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  useEffect(() => {
    if (material && material.fileUrl) {
      setPdfUrl(material.fileUrl);
    }
  }, [material]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center flex-grow-1">
          <i className="fas fa-file-pdf me-2 text-danger" />
          <button
            className="btn btn-link p-0 text-decoration-none text-start flex-grow-1"
            // onClick={() => setShowPreview(true)}
            style={{ cursor: 'pointer' }}
          >
            {material.title || material.fileName}
          </button>
        </div>

        <div className="d-flex gap-2">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowPdf(true)}
            title="Preview PDF"
          >
            <i className="fas fa-eye"></i>
          </Button>
          <Button
            variant="link"
            className="text-danger p-1"
            onClick={() => onDelete(material._id)}
            title="Delete material"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </div>
      </div>
      <PDFPreview
        pdfUrl={pdfUrl}
        show={showPdf}
        onHide={() => setShowPdf(false)}
        title="Document Preview"
      />
      {/* <PDFPreviewModal
        show={showPreview}
        onHide={() => setShowPreview(false)}
        pdfUrl={material.fileUrl || material.url || material.pdfUrl}
        title={material.title || material.fileName}
      /> */}
    </>
  );
};

export default MaterialItem;
