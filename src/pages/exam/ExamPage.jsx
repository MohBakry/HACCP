import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ExamConfirmation from './ExamConfirmation';
import ExamLoading from './ExamLoading';
import ExamError from './ExamError';
import ExamResume from './ExamResume';
import ExamTaking from './ExamTaking';
import ExamFlaggedReview from './ExamFlaggedReview';
import ExamResults from './ExamResults';
import DeviceChangeWarningModal from './DeviceChangeWarning';
import {
  getExamAttemptByGroupAndCourse,
  submitExamAttempt,
} from '../../Redux/examAttempts/examAttempts.service';
import {
  setCurrentAttempt,
  setAnswer,
  setFlaggedQuestion,
  clearCurrentAttempt,
} from '../../Redux/examAttempts/examAttempts.store';
import { getExamQuestionsForStudent } from '../../Redux/exams/exams.service';
import {
  isDeviceChanged,
  updateDeviceFingerprint,
  saveAnswersLocally,
  saveFlaggedQuestionsLocally,
  getAnswersLocally,
  getFlaggedQuestionsLocally,
} from './examService';

export default function ExamPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId, groupId } = useParams();

  // Redux States
  const exam = useSelector((state) => state.exams.exam);
  const currentAttempt = useSelector(
    (state) => state.examAttempts.currentAttempt
  );
  const answers = useSelector((state) => state.examAttempts.answers);
  const flaggedQuestions = useSelector(
    (state) => state.examAttempts.flaggedQuestions
  );
  const loading = useSelector((state) => state.examAttempts.loading);

  // Local States
  const [stage, setStage] = useState('loading'); // loading, check-attempt, confirmation, exam, review, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showDeviceWarning, setShowDeviceWarning] = useState(false);
  const [existingAttempt, setExistingAttempt] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unsubmittedChanges, setUnsubmittedChanges] = useState(false);

  // Initial load - check if exam and attempt exist
  useEffect(() => {
    const initializeExam = async () => {
      try {
        if (!exam) {
          await dispatch(getExamQuestionsForStudent(courseId)).unwrap();
        }

        // Check if there's an existing attempt
        try {
          const attempt = await dispatch(
            getExamAttemptByGroupAndCourse({ courseId, groupId })
          ).unwrap();

          if (attempt && !attempt.submitted) {
            setExistingAttempt(attempt);
            setStage('check-attempt');
          } else if (attempt?.submitted) {
            setExamResult(attempt);
            setStage('results');
          } else {
            setStage('confirmation');
          }
        } catch {
          // No e_isting attempt
          setStage('confirmation');
        }

        // Check for device change
        if (isDeviceChanged()) {
          setShowDeviceWarning(true);
        }
      } catch (err) {
        setError(err.message || 'Failed to load exam');
        setStage('error');
      }
    };

    initializeExam();
  }, [courseId, dispatch, exam, groupId]);

  // Restore answers from localStorage when entering exam stage
  useEffect(() => {
    if (
      stage === 'exam' &&
      currentAttempt?.attempt?._id &&
      answers.length === 0
    ) {
      const savedAnswers = getAnswersLocally(currentAttempt.attempt._id);
      const savedFlags = getFlaggedQuestionsLocally(currentAttempt.attempt._id);

      // Load answers from localStorage
      if (Array.isArray(savedAnswers) && savedAnswers.length > 0) {
        savedAnswers.forEach((ans) => {
          dispatch(
            setAnswer({
              questionId: ans.questionId,
              selectedOptionId: ans.selectedOptionId,
            })
          );
        });
      }

      // Load flagged questions
      if (Array.isArray(savedFlags) && savedFlags.length > 0) {
        savedFlags.forEach((qId) => {
          dispatch(setFlaggedQuestion({ questionId: qId, flagged: true }));
        });
      }
    }
  }, [stage, currentAttempt?.attempt?._id, dispatch, answers.length]);

  // Timer management
  useEffect(() => {
    if (stage !== 'exam' || !currentAttempt) return;

    const handleAutoSubmit = async () => {
      console.log('Time up! Auto-submitting exam...');
      if (!isSubmitting) {
        setIsSubmitting(true);
        try {
          const result = await dispatch(
            submitExamAttempt({
              courseId,
              groupId,
              answers: answers, // answers is already in array format { questionId, selectedOptionId }
            })
          ).unwrap();

          setExamResult(result);
          setStage('results');
          dispatch(clearCurrentAttempt());
          setUnsubmittedChanges(false);
        } catch (err) {
          setError(err.message || 'Failed to submit exam');
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    stage,
    currentAttempt,
    dispatch,
    answers,
    isSubmitting,
    exam?.durationInMinutes,
  ]);
  // Auto-save answers locally
  useEffect(() => {
    if (stage === 'exam' && answers.length > 0) {
      setUnsubmittedChanges(true);
      saveAnswersLocally(currentAttempt?.attempt?._id, answers);

      // Hide saving indicator after a short delay
      const timer = setTimeout(() => {
        setUnsubmittedChanges(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [answers, stage, currentAttempt?.attempt?._id]);

  const handleStartExam = async (attempt) => {
    try {
      if (!currentAttempt) {
        dispatch(setCurrentAttempt(attempt));
      }

      // Load saved answers and flags from localStorage
      // Use _id field from MongoDB document
      if (attempt?.attempt?._id) {
        const savedAnswers = getAnswersLocally(attempt.attempt._id);
        const savedFlags = getFlaggedQuestionsLocally(attempt.attempt._id);

        // Load answers (array structure)
        if (Array.isArray(savedAnswers) && savedAnswers.length > 0) {
          savedAnswers.forEach((ans) => {
            dispatch(
              setAnswer({
                questionId: ans.questionId,
                selectedOptionId: ans.selectedOptionId,
              })
            );
          });
        }

        // Load flagged questions
        if (Array.isArray(savedFlags) && savedFlags.length > 0) {
          savedFlags.forEach((qId) => {
            dispatch(setFlaggedQuestion({ questionId: qId, flagged: true }));
          });
        }
      }

      // Set timer based on exam duration
      const durationSeconds = (exam?.durationInMinutes || 30) * 60;
      setTimeLeft(durationSeconds);

      setStage('exam');
      setCurrentQuestionIndex(0);
      updateDeviceFingerprint();
    } catch (err) {
      setError(err.message || 'Failed to start exam');
    }
  };

  const handleContinueExam = async () => {
    try {
      if (existingAttempt) {
        dispatch(setCurrentAttempt(existingAttempt));

        // Get timing information from attempt response
        // The API response includes: startTime, durationInMinutes, serverNow
        const startTime = new Date(existingAttempt.startTime);
        const serverNow = new Date(existingAttempt.serverNow);
        const durationSeconds = (existingAttempt.durationInMinutes || 60) * 60;

        // Calculate elapsed time from server time (accurate, not client time)
        const elapsedSeconds = Math.floor((serverNow - startTime) / 1000);
        const remaining = Math.max(durationSeconds - elapsedSeconds, 0);

        setTimeLeft(remaining);

        // Load saved answers from localStorage (primary source for current session)
        if (existingAttempt?.attempt?._id) {
          const savedAnswers = getAnswersLocally(existingAttempt.attempt._id);
          const savedFlags = getFlaggedQuestionsLocally(
            existingAttempt.attempt._id
          );

          // Load answers from localStorage first (user's current work)
          if (Array.isArray(savedAnswers) && savedAnswers.length > 0) {
            savedAnswers.forEach((ans) => {
              dispatch(
                setAnswer({
                  questionId: ans.questionId,
                  selectedOptionId: ans.selectedOptionId,
                })
              );
            });
          }

          // Load flagged questions
          if (Array.isArray(savedFlags) && savedFlags.length > 0) {
            savedFlags.forEach((qId) => {
              dispatch(setFlaggedQuestion({ questionId: qId, flagged: true }));
            });
          }
        }

        setStage('exam');
        updateDeviceFingerprint();
      }
    } catch (err) {
      setError(err.message || 'Failed to continue exam');
    }
  };

  const handleAnswerChange = (questionId, selectedOptionId) => {
    // Save to Redux (immediate state) with array structure
    dispatch(setAnswer({ questionId, selectedOptionId }));

    // Save to localStorage for persistence across refresh
    // Use _id field from MongoDB document
    if (currentAttempt?.attempt?._id) {
      saveAnswersLocally(currentAttempt.attempt._id, answers);
    }
  };

  const handleFlagQuestion = (questionId, flagged) => {
    // Calculate new flagged state
    let updatedFlaggedQuestions;
    if (flagged) {
      // Add to flagged if not already present
      updatedFlaggedQuestions = flaggedQuestions.includes(questionId)
        ? flaggedQuestions
        : [...flaggedQuestions, questionId];
    } else {
      // Remove from flagged
      updatedFlaggedQuestions = flaggedQuestions.filter(
        (id) => id !== questionId
      );
    }

    // Save to Redux (immediate state)
    dispatch(setFlaggedQuestion({ questionId, flagged }));

    // Save to localStorage for persistence across refresh
    if (currentAttempt?.attempt?._id) {
      saveFlaggedQuestionsLocally(
        currentAttempt.attempt._id,
        updatedFlaggedQuestions
      );
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (exam?.questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitExamAnswers = async () => {
    // If there are flagged questions, go to review stage instead
    if (flaggedQuestions.length > 0) {
      setStage('review');
      return;
    }

    // Otherwise proceed with submission
    proceedToSubmitExam();
  };

  const proceedToSubmitExam = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await dispatch(
        submitExamAttempt({
          courseId,
          groupId,
          answers: answers, // answers is already in array format { questionId, selectedOptionId }
        })
      ).unwrap();

      setExamResult(result);
      setStage('results');
      dispatch(clearCurrentAttempt());
      setUnsubmittedChanges(false);
    } catch (err) {
      setError(err.message || 'Failed to submit exam');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewFlaggedQuestion = (questionId) => {
    // Find the question index
    const questionIndex =
      exam?.questions?.findIndex((q) => q._id === questionId) || 0;
    setCurrentQuestionIndex(questionIndex);
    setStage('exam');
  };

  const handleUnflagQuestion = (questionId, flagged = false) => {
    // Unflag the question
    dispatch(setFlaggedQuestion({ questionId, flagged }));

    // Update flagged questions array
    const updatedFlaggedQuestions = flaggedQuestions.filter(
      (id) => id !== questionId
    );

    // Save to localStorage
    if (currentAttempt?.id) {
      saveFlaggedQuestionsLocally(currentAttempt.id, updatedFlaggedQuestions);
    }
  };

  const handleProceedToSubmitFromReview = () => {
    proceedToSubmitExam();
  };

  const handleDeviceWarningConfirm = () => {
    setShowDeviceWarning(false);
    updateDeviceFingerprint();
    // Continue with the flow
    if (stage === 'check-attempt') {
      handleContinueExam();
    } else {
      setStage('confirmation');
    }
  };

  const handleDeviceWarningCancel = () => {
    setShowDeviceWarning(false);
    navigate(-1);
  };

  if (stage === 'loading') {
    return <ExamLoading />;
  }

  if (error && stage === 'error') {
    return <ExamError error={error} onGoBack={() => navigate(-1)} />;
  }

  if (stage === 'check-attempt') {
    return (
      <ExamResume
        onContinue={handleContinueExam}
        onStartNew={() => {
          setExistingAttempt(null);
          setStage('confirmation');
        }}
        loading={loading.getAttempt}
      />
    );
  }

  if (stage === 'confirmation') {
    return (
      <>
        <ExamConfirmation
          exam={exam}
          isResuming={false}
          onConfirm={handleStartExam}
          onCancel={() => navigate(-1)}
        />
        <DeviceChangeWarningModal
          show={showDeviceWarning}
          onConfirm={handleDeviceWarningConfirm}
          onCancel={handleDeviceWarningCancel}
        />
      </>
    );
  }

  if (stage === 'exam') {
    return (
      <ExamTaking
        exam={exam}
        currentQuestionIndex={currentQuestionIndex}
        answers={answers}
        flaggedQuestions={flaggedQuestions}
        timeLeft={timeLeft}
        unsubmittedChanges={unsubmittedChanges}
        onAnswerChange={handleAnswerChange}
        onFlagToggle={handleFlagQuestion}
        onNext={handleNextQuestion}
        onPrevious={handlePreviousQuestion}
        onSubmit={submitExamAnswers}
      />
    );
  }

  if (stage === 'review') {
    return (
      <ExamFlaggedReview
        exam={exam}
        flaggedQuestions={flaggedQuestions}
        answers={answers}
        onReviewQuestion={handleReviewFlaggedQuestion}
        onUnflagQuestion={handleUnflagQuestion}
        onProceedToSubmit={handleProceedToSubmitFromReview}
        onBackToExam={() => setStage('exam')}
      />
    );
  }

  if (stage === 'results' && examResult) {
    return (
      <ExamResults
        examResult={examResult}
        exam={exam}
        answers={answers}
        courseId={courseId}
        onBackToDashboard={() => navigate('/')}
        onViewCourse={() => navigate(`/courses/${courseId}`)}
        onGenerateCertificate={() => {
          // TODO: Implement certificate generation
          // This could navigate to a certificate page or trigger a download
          console.log('Generate certificate for course:', courseId);
          // Example: navigate(`/certificate/${courseId}/${examResult?.attempt?._id}`);
        }}
      />
    );
  }

  return (
    <div className="container my-5">
      <div className="alert alert-danger">
        Unexpected state. Please try again.
        <button className="btn btn-primary ms-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
}
