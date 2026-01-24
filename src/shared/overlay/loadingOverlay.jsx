import React from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.css';
import { Spinner } from 'react-bootstrap';

const LoadingOverlay = () => {
  const { isLoading, message } = useSelector((state) => state.root);

  if (!isLoading) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <Spinner
          animation="grow"
          style={{ color: '#83c7d0', width: '7rem', height: '7rem' }}
        />
        <span className="mt-2">{message || 'Loading...'}</span>
      </div>
    </div>
  );
};

export default LoadingOverlay;
