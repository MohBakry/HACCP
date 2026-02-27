import React from 'react';
import styles from './styles.module.css';

export default function ExamFlaggedReview({
  exam,
  flaggedQuestions,
  answers,
  onReviewQuestion,
  onUnflagQuestion,
  onProceedToSubmit,
  onBackToExam,
}) {
  if (!flaggedQuestions || flaggedQuestions.length === 0) {
    return (
      <div className="container my-5">
        <div className={styles.confirmationCard}>
          <h3 className="mb-4">Review Flagged Questions</h3>
          <div className="alert alert-info">
            <p>No questions have been flagged for review.</p>
          </div>
          <div className="d-flex gap-3">
            <button className="btn btn-primary" onClick={onProceedToSubmit}>
              Proceed to Submit
            </button>
            <button className="btn btn-secondary" onClick={onBackToExam}>
              Back to Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Get flagged questions details
  const flaggedQuestionsDetails =
    exam?.questions?.filter((q) => flaggedQuestions.includes(q._id)) || [];

  return (
    <div className="container my-5">
      <div className={styles.confirmationCard}>
        <h3 className="mb-4">
          <i className="fas fa-flag me-2"></i>Review Flagged Questions
        </h3>
        <p className="text-muted">
          You have flagged {flaggedQuestions.length} question
          {flaggedQuestions.length !== 1 ? 's' : ''} for review.
        </p>

        <div className="mb-4">
          <div className="list-group">
            {flaggedQuestionsDetails.map((question) => {
              const answerForQuestion = answers.find(
                (ans) => ans.questionId === question._id
              );
              const isAnswered = !!answerForQuestion;

              return (
                <div key={question._id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      <div className="d-flex gap-2 align-items-center mb-2">
                        <span className="badge bg-danger">
                          <i className="fas fa-flag"></i> Question{' '}
                          {exam?.questions?.findIndex(
                            (q) => q._id === question._id
                          ) + 1}
                        </span>
                        {isAnswered ? (
                          <span className="badge bg-success">
                            <i className="fas fa-check"></i> Answered
                          </span>
                        ) : (
                          <span className="badge bg-warning">
                            <i className="fas fa-exclamation-circle"></i> Not
                            Answered
                          </span>
                        )}
                      </div>
                      <h6 className="mb-2">{question.question}</h6>
                      {isAnswered && (
                        <p className="mb-0 text-muted">
                          <small>
                            Your answer:{' '}
                            <strong>
                              {question.options?.find(
                                (opt) =>
                                  opt._id === answerForQuestion.selectedOptionId
                              )?.text || 'N/A'}
                            </strong>
                          </small>
                        </p>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onReviewQuestion(question._id)}
                        title="Review this question"
                      >
                        <i className="fas fa-eye"></i> Review
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onUnflagQuestion(question._id)}
                        title="Remove flag"
                      >
                        <i className="fas fa-times"></i> Unflag
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="alert alert-info">
          <strong>Reminder:</strong> Make sure all flagged questions are
          addressed before submitting.
        </div>

        <div className="d-flex gap-3 justify-content-end">
          <button className="btn btn-secondary" onClick={onBackToExam}>
            ← Back to Exam
          </button>
          <button className="btn btn-success" onClick={onProceedToSubmit}>
            <i className="fas fa-check me-2"></i>Proceed to Submit
          </button>
        </div>
      </div>
    </div>
  );
}
