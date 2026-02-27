import React from 'react';
import styles from './styles.module.css';
import { ProgressBar } from 'react-bootstrap';

const ProgressOverlay = ({
  isLoading,
  message,
  progress,
  uploadSpeed,
  estimatedTime,
}) => {
  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <ProgressBar
          animated
          style={{ color: '#83c7d0', width: '100%' }}
          now={progress}
          label={`${progress}%`}
          striped
        />
        <span className="mt-2">{message || 'Uploading...'}</span>

        {/* Upload metrics - speed and ETA */}
        {(uploadSpeed > 0 || estimatedTime > 0) && (
          <div className="d-flex gap-4 justify-content-center mt-3 text-muted small">
            {uploadSpeed > 0 && (
              <div>
                <i className="fas fa-tachometer-alt me-1"></i>
                Speed: <strong>{uploadSpeed} MB/s</strong>
              </div>
            )}
            {estimatedTime > 0 && (
              <div>
                <i className="fas fa-clock me-1"></i>
                ETA: <strong>{estimatedTime}s</strong>
              </div>
            )}
          </div>
        )}

        <small className="text-muted d-block mt-3">
          Please don’t close or refresh the page
        </small>
      </div>
    </div>
  );
};

export default ProgressOverlay;
