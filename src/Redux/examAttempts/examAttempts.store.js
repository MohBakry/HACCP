import { createSlice } from '@reduxjs/toolkit';
import {
  startExamAttempt,
  getExamAttemptByGroupAndCourse,
  submitExamAttempt,
  getExamAttemptDetails,
  updateExamAttempt,
} from './examAttempts.service';

const initialState = {
  currentAttempt: null, // Current exam attempt
  attempt: null, // Cached attempt details
  attempts: {}, // Cache of attempts by ID
  answers: [], // Array of { questionId, selectedOptionId }
  flaggedQuestions: [], // Array of questionIds flagged for review
  loading: {
    startAttempt: false,
    getAttempt: false,
    submitAttempt: false,
    getAttemptDetails: false,
    updateAttempt: false,
  },
  error: {
    startAttempt: '',
    getAttempt: '',
    submitAttempt: '',
    getAttemptDetails: '',
    updateAttempt: '',
  },
};

const examAttemptsSlice = createSlice({
  name: 'examAttempts',
  initialState,
  reducers: {
    // Local actions for client-side state
    setCurrentAttempt: (state, action) => {
      state.currentAttempt = action.payload;
    },
    setAnswer: (state, action) => {
      const { questionId, selectedOptionId } = action.payload;
      // Remove existing answer for this question if it exists
      state.answers = state.answers.filter((ans) => ans.questionId !== questionId);
      // Add new answer
      state.answers.push({ questionId, selectedOptionId });
    },
    setFlaggedQuestion: (state, action) => {
      const { questionId, flagged } = action.payload;
      if (flagged) {
        // Add to flagged if not already present
        if (!state.flaggedQuestions.includes(questionId)) {
          state.flaggedQuestions.push(questionId);
        }
      } else {
        // Remove from flagged
        state.flaggedQuestions = state.flaggedQuestions.filter((id) => id !== questionId);
      }
    },
    clearAnswers: (state) => {
      state.answers = [];
      state.flaggedQuestions = [];
    },
    setAnswersFromAttempt: (state, action) => {
      const { answers, flaggedQuestions } = action.payload;
      // Validate and set answers
      state.answers = Array.isArray(answers) ? answers : [];
      // Validate and set flagged questions
      state.flaggedQuestions = Array.isArray(flaggedQuestions) ? flaggedQuestions : [];
    },
    clearCurrentAttempt: (state) => {
      state.currentAttempt = null;
      state.answers = [];
      state.flaggedQuestions = [];
    },
    clearExamAttemptsErrors: (state) => {
      state.error = {
        startAttempt: '',
        getAttempt: '',
        submitAttempt: '',
        getAttemptDetails: '',
        updateAttempt: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Start Exam Attempt
      .addCase(startExamAttempt.pending, (state) => {
        state.loading.startAttempt = true;
        state.error.startAttempt = '';
      })
      .addCase(startExamAttempt.fulfilled, (state, action) => {
        state.loading.startAttempt = false;
        state.currentAttempt = action.payload;
        state.attempts[action.payload.id] = action.payload;
      })
      .addCase(startExamAttempt.rejected, (state, action) => {
        state.loading.startAttempt = false;
        state.error.startAttempt = action.payload;
      })

      // Get Exam Attempt by Course and Group
      .addCase(getExamAttemptByGroupAndCourse.pending, (state) => {
        state.loading.getAttempt = true;
        state.error.getAttempt = '';
      })
      .addCase(getExamAttemptByGroupAndCourse.fulfilled, (state, action) => {
        state.loading.getAttempt = false;
        if (action.payload) {
          state.currentAttempt = action.payload;
          state.attempts[action.payload.id] = action.payload;
          // Load answers into local cache
          if (action.payload.answers) {
            state.answers = action.payload.answers.reduce((acc, ans) => {
              acc[ans.questionId] = ans.answer;
              return acc;
            }, {});
          }
          // Load flagged questions
          if (action.payload.flaggedQuestions) {
            state.flaggedQuestions = action.payload.flaggedQuestions.reduce(
              (acc, item) => {
                acc[item.questionId] = true;
                return acc;
              },
              {}
            );
          }
        }
      })
      .addCase(getExamAttemptByGroupAndCourse.rejected, (state, action) => {
        state.loading.getAttempt = false;
        state.error.getAttempt = action.payload;
      })

      // Submit Exam Attempt
      .addCase(submitExamAttempt.pending, (state) => {
        state.loading.submitAttempt = true;
        state.error.submitAttempt = '';
      })
      .addCase(submitExamAttempt.fulfilled, (state, action) => {
        state.loading.submitAttempt = false;
        state.attempt = action.payload;
        if (state.currentAttempt) {
          state.currentAttempt.submitted = true;
          state.currentAttempt.submittedAt = action.payload.submittedAt;
        }
      })
      .addCase(submitExamAttempt.rejected, (state, action) => {
        state.loading.submitAttempt = false;
        state.error.submitAttempt = action.payload;
      })

      // Get Exam Attempt Details
      .addCase(getExamAttemptDetails.pending, (state) => {
        state.loading.getAttemptDetails = true;
        state.error.getAttemptDetails = '';
      })
      .addCase(getExamAttemptDetails.fulfilled, (state, action) => {
        state.loading.getAttemptDetails = false;
        state.attempt = action.payload;
        state.attempts[action.payload.id] = action.payload;
      })
      .addCase(getExamAttemptDetails.rejected, (state, action) => {
        state.loading.getAttemptDetails = false;
        state.error.getAttemptDetails = action.payload;
      })

      // Update Exam Attempt
      .addCase(updateExamAttempt.pending, (state) => {
        state.loading.updateAttempt = true;
        state.error.updateAttempt = '';
      })
      .addCase(updateExamAttempt.fulfilled, (state, action) => {
        state.loading.updateAttempt = false;
        state.currentAttempt = action.payload;
        state.attempts[action.payload.id] = action.payload;
      })
      .addCase(updateExamAttempt.rejected, (state, action) => {
        state.loading.updateAttempt = false;
        state.error.updateAttempt = action.payload;
      });
  },
});

export const {
  setCurrentAttempt,
  setAnswer,
  setFlaggedQuestion,
  clearAnswers,
  setAnswersFromAttempt,
  clearCurrentAttempt,
  clearExamAttemptsErrors,
} = examAttemptsSlice.actions;

export const examAttemptsReducer = examAttemptsSlice.reducer;
