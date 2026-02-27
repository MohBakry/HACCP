import React from 'react';
import ExamQuestionDisplay from './ExamQuestionDisplay';

export default function ExamTaking({
  exam,
  currentQuestionIndex,
  answers,
  flaggedQuestions,
  timeLeft,
  unsubmittedChanges,
  onAnswerChange,
  onFlagToggle,
  onNext,
  onPrevious,
  onSubmit,
}) {
  if (!exam?.questions || exam.questions.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">
          No questions available for this exam.
        </div>
      </div>
    );
  }

  const currentQuestion = exam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1;

  // Find the selected answer for current question
  const answerForQuestion = answers.find(
    (ans) => ans.questionId === currentQuestion._id
  );

  // Check if question is flagged
  const isFlagged = flaggedQuestions.includes(currentQuestion._id);

  return (
    <>
      <div className="container my-4">
        <ExamQuestionDisplay
          question={currentQuestion}
          currentQuestionNumber={currentQuestionIndex + 1}
          totalQuestions={exam.questions.length}
          selectedAnswer={answerForQuestion?.selectedOptionId}
          isFlagged={isFlagged}
          onAnswerChange={onAnswerChange}
          onFlagToggle={onFlagToggle}
          onNext={onNext}
          onPrevious={onPrevious}
          onSubmit={onSubmit}
          isLastQuestion={isLastQuestion}
          timeLeft={timeLeft}
          isReviewMode={false}
          hasFlaggedQuestions={flaggedQuestions.length > 0}
        />
      </div>

      {/* Auto-save indicator */}
      {unsubmittedChanges && (
        <div className="position-fixed bottom-0 end-0 p-3">
          <small className="text-muted bg-light p-2 rounded">
            💾 Saving...
          </small>
        </div>
      )}
    </>
  );
}
