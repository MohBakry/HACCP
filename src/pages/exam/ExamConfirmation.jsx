import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';
import { startExamAttempt } from '../../Redux/examAttempts/examAttempts.service';
import { setCurrentAttempt } from '../../Redux/examAttempts/examAttempts.store';
import LoadingSpinner from '../../shared/LoadingSpinner';

export default function ExamConfirmation({
  exam,
  onConfirm,
  onCancel,
  isResuming = false,
}) {
  const dispatch = useDispatch();
  const { courseId, groupId } = useParams();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const currentUser = useSelector((state) => state.auth?.user);
  const currentAttempt = useSelector(
    (state) => state.examAttempts.currentAttempt
  );

  if (!exam) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">Exam not found</div>
      </div>
    );
  }

  const handleConfirmExam = async () => {
    if (!agreed) {
      setError('Please agree to the exam instructions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log(currentAttempt, 'current attempt');
      if (!isResuming && !currentAttempt) {
        // Start/Resume the attempt
        console.log('Starting new attempt...');
        const result = await dispatch(
          startExamAttempt({
            courseId,
            groupId,
            examId: exam.id,
          })
        ).unwrap();

        dispatch(setCurrentAttempt(result));
        onConfirm(result);
      } else {
        onConfirm();
      }
    } catch (err) {
      setError(err.message || 'Failed to start exam');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hours`;
  };

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.confirmationCard}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <i className="fas fa-hourglass-start me-2"></i>Exam Confirmation
          </h2>
          {isResuming && (
            <div className="alert alert-info mt-3">
              <strong>Resume Mode:</strong> You have an existing attempt.
              Clicking "Start Exam" will continue from where you left off.
            </div>
          )}
        </div>

        {/* Exam Details */}
        <div className="row mt-4">
          <div className="col-md-6">
            <div className={styles.detailSection}>
              <h5> Exam Details</h5>
              {/* <div className={styles.detailItem}>
                <span className={styles.label}>Exam Name:</span>
                <span className={styles.value}>{exam.title}</span>
              </div> */}
              <div className={styles.detailItem}>
                <span className={styles.label}>Total Questions:</span>
                <span className={styles.value}>
                  {exam.questions?.length || 0}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Duration:</span>
                <span className={styles.value}>
                  {formatDuration(exam.durationInMinutes || 30)}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Passing Score:</span>
                <span className={styles.value}>{exam.passingScore || 50}%</span>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className={styles.detailSection}>
              <h5>
                <i className="fas fa-user me-2"></i>Student Information
              </h5>
              <div className={styles.detailItem}>
                <span className={styles.label}>Student Name:</span>
                <span className={styles.value}>
                  {currentUser?.name || 'N/A'}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Student ID:</span>
                <span className={styles.value}>{currentUser?.id || 'N/A'}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Course:</span>
                <span className={styles.value}>{exam.courseName || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className={styles.instructionsSection}>
          <h5>
            <i className="fas fa-list me-2"></i>Instructions
          </h5>
          <ul className={styles.instructions}>
            <li>
              <i className="fas fa-clock me-2"></i>
              <strong>Time Management:</strong> You have{' '}
              <strong>{formatDuration(exam.duration || 30)}</strong> to complete
              this exam. The timer will start when you click "Start Exam".
            </li>
            <li>
              <i className="fas fa-question-circle me-2"></i>
              <strong>Question Format:</strong> Questions will be displayed one
              by one. You can move between questions using Next/Previous
              buttons.
            </li>
            <li>
              <i className="fas fa-check-circle me-2"></i>
              <strong>Answer Saving:</strong> Your answers are automatically
              saved to the database. You don't need to manually save.
            </li>
            <li>
              <i className="fas fa-flag me-2"></i>
              <strong>Flag for Review:</strong> You can flag any question for
              review before final submission.
            </li>
            <li>
              <i className="fas fa-mobile-alt me-2"></i>
              <strong>Device Switch Warning:</strong> If you change browsers or
              devices, you will need to re-answer all questions. Your current
              progress will not transfer to a different device/browser.
            </li>
            <li>
              <i className="fas fa-sync-alt me-2"></i>
              <strong>Page Refresh:</strong> If you refresh the page, your
              answers are saved and you can continue the exam from where you
              left off on the same device.
            </li>
            <li>
              <i className="fas fa-lock me-2"></i>
              <strong>Submission:</strong> Once you submit, you cannot change
              your answers. Review all questions before submitting.
            </li>
            <li>
              <i className="fas fa-save me-2"></i>
              <strong>Automatic Submission:</strong> If time runs out, your exam
              will be automatically submitted.
            </li>
          </ul>
        </div>

        {/* Device Change Warning */}
        <div className={styles.warningBox}>
          <h5>
            <i className="fas fa-exclamation-triangle me-2"></i>Important:
            Device/Browser Switch
          </h5>
          <p>
            If you open this exam in a <strong>different browser</strong> or on
            a <strong>different device</strong>, you will need to{' '}
            <strong>start the exam from scratch</strong> and{' '}
            <strong>re-answer all questions</strong>. Your progress is
            device/browser-specific.
          </p>
          <p className="mb-0">
            <strong>Recommendation:</strong> Complete the exam on a single
            device and in a single browser to avoid losing progress.
          </p>
        </div>

        {/* Confirmation Checkbox */}
        <div className={styles.agreementSection}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="agreeTerms"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                setError('');
              }}
            />
            <label className="form-check-label" htmlFor="agreeTerms">
              I have read and understand all exam instructions, including the
              device/browser switch limitation. I'm ready to start the exam.
            </label>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            ← Cancel
          </button>
          <button
            className={`btn ${agreed ? 'btn-success' : 'btn-secondary'}`}
            onClick={handleConfirmExam}
            disabled={!agreed || isLoading}
          >
            {isLoading ? <LoadingSpinner /> : ''}
            {isLoading
              ? ' Starting...'
              : isResuming
                ? '▶️ Continue Exam'
                : '▶️ Start Exam'}
          </button>
        </div>
      </div>
    </div>
  );
}
