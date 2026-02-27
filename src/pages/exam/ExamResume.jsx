import React from 'react';
import LoadingSpinner from '../../shared/LoadingSpinner';
import styles from './styles.module.css';

export default function ExamResume({ onContinue, onStartNew, loading }) {
  return (
    <div className="container my-5">
      <div className={styles.confirmationCard}>
        <h3 className="mb-4">Resume Exam</h3>
        <p>
          We found an existing exam attempt for this course. Would you like to
          continue from where you left off?
        </p>
        <div className="d-flex gap-3">
          <button
            className="btn btn-success"
            onClick={onContinue}
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : ''}
            Continue Exam
          </button>
          <button className="btn btn-secondary" onClick={onStartNew}>
            Start New Exam
          </button>
        </div>
      </div>
    </div>
  );
}
