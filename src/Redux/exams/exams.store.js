import { createSlice } from '@reduxjs/toolkit';
import {
  getExamByCourseId,
  getExamQuestionsForStudent,
  createExam,
  updateExam,
  deleteExam,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUpdateQuestions,
} from './exams.service';

const initialState = {
  exam: null, // Current exam being viewed/edited
  exams: {}, // Cache of exams by courseId { courseId: examData }
  loading: {
    getExam: false,
    getStudentQuestions: false,
    createExam: false,
    updateExam: false,
    deleteExam: false,
    addQuestion: false,
    updateQuestion: false,
    deleteQuestion: false,
    bulkUpdateQuestions: false,
  },
  error: {
    getExam: '',
    getStudentQuestions: '',
    createExam: '',
    updateExam: '',
    deleteExam: '',
    addQuestion: '',
    updateQuestion: '',
    deleteQuestion: '',
    bulkUpdateQuestions: '',
  },
};

const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    clearCurrentExam: (state) => {
      state.exam = null;
    },
    clearExamErrors: (state) => {
      state.error = {
        getExam: '',
        getStudentQuestions: '',
        createExam: '',
        updateExam: '',
        deleteExam: '',
        addQuestion: '',
        updateQuestion: '',
        deleteQuestion: '',
        bulkUpdateQuestions: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Exam
      .addCase(getExamByCourseId.pending, (state) => {
        state.loading.getExam = true;
        state.error.getExam = '';
      })
      .addCase(getExamByCourseId.fulfilled, (state, action) => {
        state.loading.getExam = false;
        state.exam = action.payload;
        // Cache the exam
        if (action.payload?.courseId) {
          state.exams[action.payload.courseId] = action.payload;
        }
      })
      .addCase(getExamByCourseId.rejected, (state, action) => {
        state.loading.getExam = false;
        state.error.getExam = action.payload;
      })

      // Get Student Questions
      .addCase(getExamQuestionsForStudent.pending, (state) => {
        state.loading.getStudentQuestions = true;
        state.error.getStudentQuestions = '';
      })
      .addCase(getExamQuestionsForStudent.fulfilled, (state, action) => {
        state.loading.getStudentQuestions = false;
        state.exam = action.payload;
        // Cache the exam
        if (action.payload?.courseId) {
          state.exams[action.payload.courseId] = action.payload;
        }
      })
      .addCase(getExamQuestionsForStudent.rejected, (state, action) => {
        state.loading.getStudentQuestions = false;
        state.error.getStudentQuestions = action.payload;
      })

      // Create Exam
      .addCase(createExam.pending, (state) => {
        state.loading.createExam = true;
        state.error.createExam = '';
      })
      .addCase(createExam.fulfilled, (state, action) => {
        state.loading.createExam = false;
        state.exam = action.payload;
        // Cache the exam
        if (action.payload?.courseId) {
          state.exams[action.payload.courseId] = action.payload;
        }
      })
      .addCase(createExam.rejected, (state, action) => {
        state.loading.createExam = false;
        state.error.createExam = action.payload;
      })

      // Update Exam
      .addCase(updateExam.pending, (state) => {
        state.loading.updateExam = true;
        state.error.updateExam = '';
      })
      .addCase(updateExam.fulfilled, (state, action) => {
        state.loading.updateExam = false;
        state.exam = action.payload;
        // Update cache
        if (action.payload?.courseId) {
          state.exams[action.payload.courseId] = action.payload;
        }
      })
      .addCase(updateExam.rejected, (state, action) => {
        state.loading.updateExam = false;
        state.error.updateExam = action.payload;
      })

      // Delete Exam
      .addCase(deleteExam.pending, (state) => {
        state.loading.deleteExam = true;
        state.error.deleteExam = '';
      })
      .addCase(deleteExam.fulfilled, (state, action) => {
        state.loading.deleteExam = false;
        // Remove from cache
        const courseId = action.meta.arg;
        delete state.exams[courseId];
        if (state.exam?.courseId === courseId) {
          state.exam = null;
        }
      })
      .addCase(deleteExam.rejected, (state, action) => {
        state.loading.deleteExam = false;
        state.error.deleteExam = action.payload;
      })

      // Add Question
      .addCase(addQuestion.pending, (state) => {
        state.loading.addQuestion = true;
        state.error.addQuestion = '';
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.loading.addQuestion = false;
        // Update current exam with new question
        if (state.exam && action.payload.question) {
          state.exam.questions = [
            ...(state.exam.questions || []),
            action.payload.question,
          ];
        }
      })
      .addCase(addQuestion.rejected, (state, action) => {
        state.loading.addQuestion = false;
        state.error.addQuestion = action.payload;
      })

      // Update Question
      .addCase(updateQuestion.pending, (state) => {
        state.loading.updateQuestion = true;
        state.error.updateQuestion = '';
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.loading.updateQuestion = false;
        // Update question in current exam
        if (state.exam && action.payload.question) {
          const index = state.exam.questions.findIndex(
            (q) => q._id === action.payload.question._id
          );
          if (index !== -1) {
            state.exam.questions[index] = action.payload.question;
          }
        }
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.loading.updateQuestion = false;
        state.error.updateQuestion = action.payload;
      })

      // Delete Question
      .addCase(deleteQuestion.pending, (state) => {
        state.loading.deleteQuestion = true;
        state.error.deleteQuestion = '';
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading.deleteQuestion = false;
        // Remove question from current exam
        const questionId = action.meta.arg.questionId;
        if (state.exam && state.exam.questions) {
          state.exam.questions = state.exam.questions.filter(
            (q) => q._id !== questionId
          );
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading.deleteQuestion = false;
        state.error.deleteQuestion = action.payload;
      })

      // Bulk Update Questions
      .addCase(bulkUpdateQuestions.pending, (state) => {
        state.loading.bulkUpdateQuestions = true;
        state.error.bulkUpdateQuestions = '';
      })
      .addCase(bulkUpdateQuestions.fulfilled, (state, action) => {
        state.loading.bulkUpdateQuestions = false;
        // Update all questions in current exam
        if (state.exam && action.payload.questions) {
          state.exam.questions = action.payload.questions;
        }
      })
      .addCase(bulkUpdateQuestions.rejected, (state, action) => {
        state.loading.bulkUpdateQuestions = false;
        state.error.bulkUpdateQuestions = action.payload;
      });
  },
});

export const { clearCurrentExam, clearExamErrors } = examsSlice.actions;
export const examsReducer = examsSlice.reducer;
