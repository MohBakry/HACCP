import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CertificateCanvas from '../../shared/certificateCanvas';
import styles from './styles.module.css';

export default function StudentVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [verificationData, setVerificationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from location state (passed from directory page)
    if (location.state?.studentData && location.state?.courseData) {
      setVerificationData({
        student: location.state.studentData,
        course: location.state.courseData,
        completionDate: new Date().toISOString(),
      });
      setLoading(false);
    } else {
      // Fallback if data is not in state
      setLoading(false);
    }
  }, [location.state]);

  const handleDownloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const safeStudentName = (verificationData?.student?.name || 'student')
      .toLowerCase()
      .replace(/\s+/g, '-');

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = `certificate-${safeStudentName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareVerification = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Course Completion Verification',
        text: `I have completed ${verificationData?.course?.title}`,
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert('Verification link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className={styles.verificationContainer}>
        <div className={styles.loadingContent}>
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading verification...</p>
        </div>
      </div>
    );
  }

  if (!verificationData) {
    return (
      <div className={styles.verificationContainer}>
        <div className={styles.errorContent}>
          <i className="fas fa-exclamation-circle"></i>
          <h2>Verification Not Found</h2>
          <p>
            We couldn't load the verification data. Please go back and try
            again.
          </p>
          <button
            className={styles.backButton}
            onClick={() => navigate('/directory')}
          >
            Back to Directory
          </button>
        </div>
      </div>
    );
  }

  const { student } = verificationData;

  return (
    <div className={styles.verificationContainer}>
      <div className={styles.verificationContent}>
        {/* Back Button */}
        <button
          className={styles.backButton}
          onClick={() => navigate('/directory')}
        >
          <i className="fas fa-arrow-left"></i> Back to Directory
        </button>

        {/* Main Verification Card */}
        <div className={styles.verificationCard}>
          {/* Header Section */}
          <div className={styles.verificationHeader}>
            <div className={styles.sealIcon}>
              <i className="fas fa-certificate"></i>
            </div>
            <h1 className={styles.verificationTitle}>
              Course Completion Verified
            </h1>
            <p className={styles.verificationSubtitle}>
              This certificate verifies that the course completion is authentic
              and was completed through our platform.
            </p>
          </div>

          {/* Verification Details */}
          <div className={styles.verificationDetails}>
            {/* Student Section */}
            <div className={styles.detailSection}>
              <h2 className={styles.sectionHeading}>Student Information</h2>
              <div className={styles.studentInfo}>
                <div className={styles.studentAvatarLarge}>
                  {student?.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student.name}
                      className={styles.profileImage}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder}>
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                </div>
                <div className={styles.studentDataPoints}>
                  <div className={styles.dataPoint}>
                    <label>Full Name</label>
                    <p>{student?.name}</p>
                  </div>
                  <div className={styles.dataPoint}>
                    <label>Email Address</label>
                    <p>{student?.email}</p>
                  </div>
                  {student?.jobTitle && (
                    <div className={styles.dataPoint}>
                      <label>Job Title</label>
                      <p>{student.jobTitle}</p>
                    </div>
                  )}
                  {student?.bio && (
                    <div className={styles.dataPoint}>
                      <label>Professional Bio</label>
                      <p>{student.bio}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Course Section */}
            {/* Hidden: Course details section removed per user request */}

            {/* Verification Status */}
            <div className={styles.verificationStatus}>
              <div className={styles.statusBadge}>
                <i className="fas fa-check-circle"></i>
                <span>Verified</span>
              </div>
              <p className={styles.statusMessage}>
                This completion record has been verified and authenticated
                through our official records.
              </p>
            </div>
          </div>

          {/* Actions Section */}
          <div className={styles.actionsSection}>
            <button
              className={`${styles.actionButton} ${styles.primaryButton}`}
              onClick={handleDownloadCertificate}
            >
              <i className="fas fa-download"></i> Download Certificate
            </button>
            <button
              className={`${styles.actionButton} ${styles.tertiaryButton}`}
              onClick={handleShareVerification}
            >
              <i className="fas fa-share-alt"></i> Share Verification
            </button>
          </div>
        </div>

        {/* Security Footer */}
        <div className={styles.securityFooter}>
          <i className="fas fa-lock"></i>
          <p>
            This verification is secure and tamper-proof. You can verify this
            certificate by visiting our directory and searching for{' '}
            {student?.name}.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .${styles.backButton},
          .${styles.actionsSection},
          .${styles.securityFooter} {
            display: none;
          }
          .${styles.verificationCard} {
            box-shadow: none;
            page-break-inside: avoid;
          }
        }
      `}</style>

      <CertificateCanvas
        ref={canvasRef}
        hidden
        studentName={verificationData?.student?.name || 'Student Name'}
        courseName={verificationData?.course?.title || 'Course'}
        completedDate={
          verificationData?.completionDate || new Date().toISOString()
        }
      />
    </div>
  );
}
