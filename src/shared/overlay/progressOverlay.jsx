import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { ProgressBar } from 'react-bootstrap';

const ProgressOverlay = () => {
  const { isLoading, message, progress } = useSelector((state) => state.root);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <ProgressBar
          animated
          style={{ color: '#83c7d0' }}
          now={progress}
          label={`${progress}%`}
          striped
        />
        <span className="mt-2">{message || 'Uploading...'}</span>

        <small className="text-muted d-block mt-2">
          Please don’t close or refresh the page
        </small>
      </div>
    </div>
  );
};

export default ProgressOverlay;
