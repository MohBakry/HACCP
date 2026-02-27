import React, { useState, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Modal } from 'react-bootstrap';
import styles from './styles.module.css';

// Set the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PDFPreview = ({
  pdfUrl,
  show,
  onHide,
  title = 'PDF Preview',
  width = 600,
  height = 800,
}) => {
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        setLoading(true);

        const loadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          disableRange: true,
          disableStream: true,
        });

        const pdfDoc = await loadingTask.promise;
        setPdf(pdfDoc);
        setNumPages(pdfDoc.numPages);
        setLoading(false);
      } catch (e) {
        setError(e.message || 'Failed to load PDF');
        setLoading(false);
      }
    };

    if (pdfUrl && show) {
      loadPdf();
    }
  }, [pdfUrl, show]);

  // useEffect(() => {
  //   const loadPdf = async () => {
  //     try {
  //       setLoading(true);
  //       const loadingTask = pdfjsLib.getDocument(pdfUrl);
  //       const pdfDoc = await loadingTask.promise;
  //       setPdf(pdfDoc);
  //       setNumPages(pdfDoc.numPages);
  //       setLoading(false);
  //     } catch (e) {
  //       setError(e.message || 'Failed to load PDF');
  //       setLoading(false);
  //     }
  //   };

  //   if (pdfUrl && show) {
  //     loadPdf();
  //   }
  // }, [pdfUrl, show]);

  const renderPage = async (pageNum) => {
    if (!pdf) return null;

    const page = await pdf.getPage(pageNum);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    await page.render(renderContext).promise;
    return canvas;
  };

  useEffect(() => {
    const renderCurrentPage = async () => {
      const canvas = await renderPage(pageNumber);
      if (canvas) {
        const container = document.getElementById('pdf-container');
        if (container) {
          container.innerHTML = '';
          container.appendChild(canvas);
        }
      }
    };

    if (pdf && show) {
      renderCurrentPage();
    }
  }, [pageNumber, pdf, show]);

  const nextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleClose = () => {
    setPdf(null);
    setPageNumber(1);
    setNumPages(null);
    setLoading(true);
    setError(null);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <div className={styles.loading}>Loading PDF...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && (
          <div className={styles.pdfPreview}>
            <div className={styles.controls}>
              <button onClick={prevPage} disabled={pageNumber <= 1}>
                Previous
              </button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <button onClick={nextPage} disabled={pageNumber >= numPages}>
                Next
              </button>
            </div>
            <div
              id="pdf-container"
              className={styles.pdfContainer}
              style={{ width, height }}
            ></div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PDFPreview;
