import { createSlice } from '@reduxjs/toolkit';
import {
  getCourseContent,
  addModule,
  editModule,
  deleteMaterial,
  getStudentCourseContent,
  submitAssessment,
  markModuleComplete,
  uploadAssessment,
  deleteAssessment,
  getAssessmentSubmissions,
  submitAssessmentFeedback,
} from './courseContent.service';

const initialState = {
  data: null,
  courseContent: null,
  loading: {
    getCourseContent: false,
    getStudentCourseContent: false,
    submitAssessment: false,
    markModuleComplete: false,
    uploadAssessment: false,
    deleteAssessment: false,
    getAssessmentSubmissions: false,
    submitAssessmentFeedback: false,
  },
  error: {
    getCourseContent: null,
    getStudentCourseContent: null,
    submitAssessment: null,
    markModuleComplete: null,
    uploadAssessment: null,
    deleteAssessment: null,
    getAssessmentSubmissions: null,
    submitAssessmentFeedback: null,
  },
};

const courseContentSlice = createSlice({
  name: 'courseContent',
  initialState,
  reducers: {
    clearCourse(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseContent.pending, (state) => {
        state.loading.getCourseContent = true;
        state.error.getCourseContent = null;
      })
      .addCase(getCourseContent.fulfilled, (state, action) => {
        state.loading.getCourseContent = false;
        state.data = action.payload;
      })
      .addCase(getCourseContent.rejected, (state, action) => {
        state.loading.getCourseContent = false;
        state.error.getCourseContent = action.payload;
      })
      .addCase(addModule.pending, (state) => {
        state.loading.getCourseContent = true;
        state.error.getCourseContent = null;
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.loading.getCourseContent = false;
        if (state.data && state.data.modules) {
          state.data.modules.push(action.payload);
        }
      })
      .addCase(addModule.rejected, (state, action) => {
        state.loading.getCourseContent = false;
        state.error.getCourseContent = action.payload;
      })
      .addCase(editModule.pending, (state) => {
        state.loading.getCourseContent = true;
        state.error.getCourseContent = null;
      })
      .addCase(editModule.fulfilled, (state, action) => {
        state.loading.getCourseContent = false;
        if (state.data && state.data.modules) {
          const index = state.data.modules.findIndex(
            (module) => module.id === action.payload.id
          );
          if (index !== -1) {
            state.data.modules[index] = action.payload;
          }
        }
      })
      .addCase(editModule.rejected, (state, action) => {
        state.loading.getCourseContent = false;
        state.error.getCourseContent = action.payload;
      })
      .addCase(deleteMaterial.pending, (state) => {
        state.loading.getCourseContent = true;
        state.error.getCourseContent = null;
      })
      .addCase(deleteMaterial.fulfilled, (state) => {
        state.loading.getCourseContent = false;
        // The material deletion will be reflected when course content is refetched
        // or we could optimistically update the state here
      })
      .addCase(deleteMaterial.rejected, (state, action) => {
        state.loading.getCourseContent = false;
        state.error.getCourseContent = action.payload;
      })
      // Student Course Content
      .addCase(getStudentCourseContent.pending, (state) => {
        state.loading.getStudentCourseContent = true;
        state.error.getStudentCourseContent = null;
      })
      .addCase(getStudentCourseContent.fulfilled, (state, action) => {
        state.loading.getStudentCourseContent = false;
        state.courseContent = action.payload;
      })
      .addCase(getStudentCourseContent.rejected, (state, action) => {
        state.loading.getStudentCourseContent = false;
        state.error.getStudentCourseContent = action.payload;
      })
      // Submit Assessment
      .addCase(submitAssessment.pending, (state) => {
        state.loading.submitAssessment = true;
        state.error.submitAssessment = null;
      })
      .addCase(submitAssessment.fulfilled, (state) => {
        state.loading.submitAssessment = false;
      })
      .addCase(submitAssessment.rejected, (state, action) => {
        state.loading.submitAssessment = false;
        state.error.submitAssessment = action.payload;
      })
      // Mark Module Complete
      .addCase(markModuleComplete.pending, (state) => {
        state.loading.markModuleComplete = true;
        state.error.markModuleComplete = null;
      })
      .addCase(markModuleComplete.fulfilled, (state) => {
        state.loading.markModuleComplete = false;
      })
      // Upload Assessment
      .addCase(uploadAssessment.pending, (state) => {
        state.loading.uploadAssessment = true;
        state.error.uploadAssessment = null;
      })
      .addCase(uploadAssessment.fulfilled, (state) => {
        state.loading.uploadAssessment = false;
      })
      .addCase(uploadAssessment.rejected, (state, action) => {
        state.loading.uploadAssessment = false;
        state.error.uploadAssessment = action.payload;
      })
      // Delete Assessment
      .addCase(deleteAssessment.pending, (state) => {
        state.loading.deleteAssessment = true;
        state.error.deleteAssessment = null;
      })
      .addCase(deleteAssessment.fulfilled, (state) => {
        state.loading.deleteAssessment = false;
      })
      .addCase(deleteAssessment.rejected, (state, action) => {
        state.loading.deleteAssessment = false;
        state.error.deleteAssessment = action.payload;
      })
      // Get Assessment Submissions
      .addCase(getAssessmentSubmissions.pending, (state) => {
        state.loading.getAssessmentSubmissions = true;
        state.error.getAssessmentSubmissions = null;
      })
      .addCase(getAssessmentSubmissions.fulfilled, (state, action) => {
        state.loading.getAssessmentSubmissions = false;
        state.studentAssessments = action.payload;
      })
      .addCase(getAssessmentSubmissions.rejected, (state, action) => {
        state.loading.getAssessmentSubmissions = false;
        state.error.getAssessmentSubmissions = action.payload;
      })
      // Submit Assessment Feedback
      .addCase(submitAssessmentFeedback.pending, (state) => {
        state.loading.submitAssessmentFeedback = true;
        state.error.submitAssessmentFeedback = null;
      })
      .addCase(submitAssessmentFeedback.fulfilled, (state) => {
        state.loading.submitAssessmentFeedback = false;
      })
      .addCase(submitAssessmentFeedback.rejected, (state, action) => {
        state.loading.submitAssessmentFeedback = false;
        state.error.submitAssessmentFeedback = action.payload;
      })
      .addCase(markModuleComplete.rejected, (state, action) => {
        state.loading.markModuleComplete = false;
        state.error.markModuleComplete = action.payload;
      });
  },
});

export const { clearCourse } = courseContentSlice.actions;
export const courseContentReducer = courseContentSlice.reducer;
