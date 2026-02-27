import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaDownload, FaArrowLeft } from 'react-icons/fa';
import CertificateCanvas from '../../shared/certificateCanvas';
import styles from './styles.module.css';

const Certificate = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth?.user);

  // Get certificate data from route state
  const { courseName, completedDate, certificateId } = location.state || {};

  useEffect(() => {
    if (!courseName || !completedDate) {
      navigate('/dashboard');
      return;
    }
  }, [courseName, completedDate, navigate]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = `certificate-${user?.fullName || 'student'}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className={styles.certificateContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleGoBack}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1>Your Certificate</h1>
      </div>

      <div className={styles.certificateWrapper}>
        <CertificateCanvas
          ref={canvasRef}
          className={styles.certificateCanvas}
          studentName={user?.name || user?.fullName || 'Student Name'}
          courseName={courseName || 'Course'}
          completedDate={completedDate || new Date().toISOString()}
          certificateId={certificateId}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.downloadButton} onClick={handleDownload}>
          <FaDownload /> Download Certificate
        </button>
      </div>
    </div>
  );
};

export default Certificate;
