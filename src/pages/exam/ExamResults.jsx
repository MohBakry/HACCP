import React from 'react';
import styles from './styles.module.css';

export default function ExamResults({
  examResult,
  exam,
  answers,
  //   courseId,
  onBackToDashboard,
  onViewCourse,
  onGenerateCertificate,
}) {
  const questionCount = exam?.questions?.length || 0;
  const answeredCount = examResult?.attempt?.answers?.length || answers.length;
  const score = examResult?.score || 0; // Score from API response (0-100)
  const passed = examResult?.passed || false; // Use passed flag from API response
  const submittedAt = examResult?.attempt?.updatedAt || examResult?.submittedAt;

  return (
    <div className="container my-5">
      <div className={styles.confirmationCard}>
        <div className="text-center">
          <h2 className={`mb-4 ${passed ? 'text-success' : 'text-danger'}`}>
            {passed ? (
              <>
                <i className="fas fa-trophy"></i> Congratulations!
              </>
            ) : (
              <>
                <i className="fas fa-times-circle"></i> Better Luck Next Time
              </>
            )}
          </h2>

          <div className="row my-4">
            <div className="col-md-6">
              <div className={styles.detailSection}>
                <h5>Your Score</h5>
                <h3 className={passed ? 'text-success' : 'text-danger'}>
                  {score}%
                </h3>
                <p className="text-muted">
                  {answeredCount} out of {questionCount} questions
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className={styles.detailSection}>
                <h5>Passing Score</h5>
                <h3 className="text-info">{exam?.passingScore || 70}%</h3>
                <p className="text-muted">
                  {passed ? (
                    <>
                      You passed! <i className="fas fa-check"></i>
                    </>
                  ) : (
                    'Not passed yet'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <strong>Exam Details:</strong>
            <ul className="text-start">
              <li>
                Submitted at:{' '}
                {submittedAt ? new Date(submittedAt).toLocaleString() : 'N/A'}
              </li>
              <li>Total Duration: {exam?.durationInMinutes || 30} minutes</li>
              <li>
                Questions Answered: {answeredCount}/{questionCount}
              </li>
            </ul>
          </div>

          <div className="d-flex gap-3 justify-content-center">
            {passed ? (
              <>
                <button
                  className="btn btn-success"
                  onClick={onGenerateCertificate}
                >
                  <i className="fas fa-certificate"></i> Generate Certificate
                </button>
                <button className="btn btn-primary" onClick={onViewCourse}>
                  <i className="fas fa-book-open"></i> Back to Course Content
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary" onClick={onBackToDashboard}>
                  <i className="fas fa-arrow-left"></i> Back to Dashboard
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={onViewCourse}
                >
                  <i className="fas fa-book-open"></i> Back to Course Content
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
