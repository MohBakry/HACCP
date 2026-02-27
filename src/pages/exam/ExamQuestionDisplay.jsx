import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';
import {
  //   setAnswer,
  setFlaggedQuestion,
} from '../../Redux/examAttempts/examAttempts.store';

export default function ExamQuestionDisplay({
  question,
  currentQuestionNumber,
  totalQuestions,
  selectedAnswer,
  isFlagged,
  onAnswerChange,
  onFlagToggle,
  onNext,
  onPrevious,
  onSubmit,
  isLastQuestion,
  timeLeft,
  isReviewMode = false,
  hasFlaggedQuestions = false,
  //   correctAnswer = null,
}) {
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(selectedAnswer || '');

  useEffect(() => {
    setSelectedOption(selectedAnswer || '');
  }, [question._id, selectedAnswer]);

  const handleOptionChange = (option) => {
    if (isReviewMode) return; // Don't allow changes in review mode

    // Handle both object and string option types
    const optionId = typeof option === 'object' ? option._id : option;

    setSelectedOption(optionId);
    // Pass questionId and selectedOptionId to parent handler
    onAnswerChange(question._id, optionId);
  };

  const handleToggleFlag = () => {
    const newFlaggedState = !isFlagged;
    dispatch(
      setFlaggedQuestion({
        questionId: question._id,
        flagged: newFlaggedState,
      })
    );
    onFlagToggle(question._id, newFlaggedState);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const getTimeColor = () => {
    const timeInMinutes = timeLeft / 60;
    if (timeInMinutes < 5) return 'danger';
    if (timeInMinutes < 10) return 'warning';
    return 'success';
  };

  return (
    <div className={styles.questionContainer}>
      {/* Header with Timer and Progress */}
      <div className={styles.questionHeader}>
        <div className={styles.progressInfo}>
          <div className="progress" style={{ height: '25px' }}>
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{
                width: `${(currentQuestionNumber / totalQuestions) * 100}%`,
              }}
              aria-valuenow={currentQuestionNumber}
              aria-valuemin="0"
              aria-valuemax={totalQuestions}
            >
              {Math.round((currentQuestionNumber / totalQuestions) * 100)}%
            </div>
          </div>
          <p className={styles.questionNumber}>
            Question {currentQuestionNumber} of {totalQuestions}
          </p>
        </div>

        <div className={styles.timerSection}>
          <span className={`badge bg-${getTimeColor()} fs-6`}>
            ⏱️ {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Question Content */}
      <div className={styles.questionContent}>
        <div className={styles.questionTitle}>
          <h5>{question.questionText}</h5>
          {!isReviewMode && (
            <button
              className={`btn btn-sm ${isFlagged ? 'btn-danger' : 'btn-outline-danger'}`}
              onClick={handleToggleFlag}
              title="Flag for review"
            >
              🚩 {isFlagged ? 'Flagged' : 'Flag'}
            </button>
          )}
        </div>

        {/* Options */}
        <div className={styles.optionsContainer}>
          {question.options?.map((option, index) => (
            <div
              key={option._id || index}
              className={`${styles.optionCard} ${
                selectedOption === option._id ? styles.selected : ''
              }`}
            >
              <label className={styles.optionLabel}>
                {!isReviewMode ? (
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={option._id}
                    checked={selectedOption === option._id}
                    onChange={() => handleOptionChange(option)}
                    disabled={isReviewMode}
                    className={styles.optionInput}
                  />
                ) : (
                  <span className={styles.optionInputDisplay}>
                    {selectedOption === option._id ? '✓' : '◯'}
                  </span>
                )}
                <span className={styles.optionText}>{option.text}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Review Mode Answer Display */}
        {isReviewMode && (
          <div className={styles.reviewSection}>
            <div className="alert alert-info">
              <strong>Your Answer:</strong>{' '}
              {selectedOption
                ? question.options?.find((opt) => opt._id === selectedOption)
                    ?.text || 'No answer'
                : 'No answer'}
            </div>
          </div>
        )}

        {/* No Answer Warning */}
        {!selectedOption && !isReviewMode && (
          <div className="alert alert-warning">
            <strong>Note:</strong> You haven't answered this question yet.
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className={styles.navigationButtons}>
        <button
          className="btn btn-outline-primary"
          onClick={onPrevious}
          disabled={currentQuestionNumber === 1}
        >
          ← Previous
        </button>

        <div className={styles.buttonGroup}>
          {!isLastQuestion ? (
            <button className="btn btn-primary" onClick={onNext}>
              Next →
            </button>
          ) : hasFlaggedQuestions ? (
            <button className="btn btn-warning" onClick={onSubmit}>
              👁️ Review Answers
            </button>
          ) : (
            <button className="btn btn-success" onClick={onSubmit}>
              ✓ Submit Exam
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
