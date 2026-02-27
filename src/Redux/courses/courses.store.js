// redux/coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addCourse,
  deleteCourse,
  getCourses,
  getHighlightedCourses,
  getPublishedCourseDetails,
  getPublishedCourses,
  getEnrolledCourses,
  getCoursesWithCompletedStudents,
  verifyStudentCourseCompletion,
  updateCourse,
  uploadCourseThumbnail,
  uploadMaterial,
} from './courses.service';

const initialState = {
  courses: [],
  publishedCourses: [],
  highlightedCourses: [],
  enrolledCourses: [],
  coursesWithCompletedStudents: [],
  completionVerification: null,
  courseDetails: null,
  groups: [],
  course: null,
  loading: {
    getCourses: false,
    getPublishedCourses: false,
    getHighlightedCourses: false,
    getPublishedCourseDetails: false,
    getEnrolledCourses: false,
    getCoursesWithCompletedStudents: false,
    verifyStudentCourseCompletion: false,
    addCourse: false,
    updateCourse: false,
    deleteCourse: false,
    uploadMaterial: false,
  },
  error: {
    getCourses: '',
    getPublishedCourses: '',
    getHighlightedCourses: '',
    getPublishedCourseDetails: '',
    getEnrolledCourses: '',
    getCoursesWithCompletedStudents: '',
    verifyStudentCourseCompletion: '',
    addCourse: '',
    updateCourse: '',
    deleteCourse: '',
    uploadMaterial: '',
  },
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourses.pending, (state) => {
        state.loading.getCourses = true;
        state.error.getCourses = '';
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading.getCourses = false;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading.getCourses = false;
        state.courses = [];
        state.error.getCourses = action.payload;
      })
      .addCase(addCourse.pending, (state) => {
        state.loading.addCourse = true;
        state.error.addCourse = '';
      })
      .addCase(addCourse.fulfilled, (state) => {
        state.loading.addCourse = false;
      })
      .addCase(addCourse.rejected, (state, action) => {
        state.loading.addCourse = false;
        state.error.addCourse = action.payload;
      })
      .addCase(updateCourse.pending, (state) => {
        state.loading.updateCourse = true;
        state.error.updateCourse = '';
      })
      .addCase(updateCourse.fulfilled, (state) => {
        state.loading.updateCourse = false;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading.updateCourse = false;
        state.error.updateCourse = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => {
        state.loading.deleteCourse = true;
        state.error.deleteCourse = '';
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.loading.deleteCourse = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading.deleteCourse = false;
        state.error.deleteCourse = action.payload;
      })
      .addCase(uploadCourseThumbnail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCourseThumbnail.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentCourse) {
          state.currentCourse.thumbnailUrl = action.payload.imageUrl;
        }
      })
      .addCase(uploadCourseThumbnail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadMaterial.pending, (state) => {
        state.loading.uploadMaterial = true;
        state.error.uploadMaterial = '';
      })
      .addCase(uploadMaterial.fulfilled, (state) => {
        state.loading.uploadMaterial = false;
      })
      .addCase(uploadMaterial.rejected, (state, action) => {
        state.loading.uploadMaterial = false;
        state.error.uploadMaterial = action.payload;
      })
      .addCase(getPublishedCourses.pending, (state) => {
        state.loading.getPublishedCourses = true;
        state.error.getPublishedCourses = '';
      })
      .addCase(getPublishedCourses.fulfilled, (state, action) => {
        state.loading.getPublishedCourses = false;
        state.publishedCourses = action.payload;
      })
      .addCase(getPublishedCourses.rejected, (state, action) => {
        state.loading.getPublishedCourses = false;
        state.publishedCourses = [];
        state.error.getPublishedCourses = action.payload;
      })
      .addCase(getHighlightedCourses.pending, (state) => {
        state.loading.getHighlightedCourses = true;
        state.error.getHighlightedCourses = '';
      })
      .addCase(getHighlightedCourses.fulfilled, (state, action) => {
        state.loading.getHighlightedCourses = false;
        state.highlightedCourses = action.payload;
      })
      .addCase(getHighlightedCourses.rejected, (state, action) => {
        state.loading.getHighlightedCourses = false;
        state.highlightedCourses = [];
        state.error.getHighlightedCourses = action.payload;
      })
      .addCase(getPublishedCourseDetails.pending, (state) => {
        state.loading.getPublishedCourseDetails = true;
        state.error.getPublishedCourseDetails = '';
      })
      .addCase(getPublishedCourseDetails.fulfilled, (state, action) => {
        state.loading.getPublishedCourseDetails = false;
        state.courseDetails = action.payload;
      })
      .addCase(getPublishedCourseDetails.rejected, (state, action) => {
        state.loading.getPublishedCourseDetails = false;
        state.courseDetails = null;
        state.error.getPublishedCourseDetails = action.payload;
      })
      .addCase(getEnrolledCourses.pending, (state) => {
        state.loading.getEnrolledCourses = true;
        state.error.getEnrolledCourses = '';
      })
      .addCase(getEnrolledCourses.fulfilled, (state, action) => {
        state.loading.getEnrolledCourses = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(getEnrolledCourses.rejected, (state, action) => {
        state.loading.getEnrolledCourses = false;
        state.enrolledCourses = [];
        state.error.getEnrolledCourses = action.payload;
      })
      .addCase(getCoursesWithCompletedStudents.pending, (state) => {
        state.loading.getCoursesWithCompletedStudents = true;
        state.error.getCoursesWithCompletedStudents = '';
      })
      .addCase(getCoursesWithCompletedStudents.fulfilled, (state, action) => {
        state.loading.getCoursesWithCompletedStudents = false;
        state.coursesWithCompletedStudents = action.payload;
      })
      .addCase(getCoursesWithCompletedStudents.rejected, (state, action) => {
        state.loading.getCoursesWithCompletedStudents = false;
        state.coursesWithCompletedStudents = [];
        state.error.getCoursesWithCompletedStudents = action.payload;
      })
      .addCase(verifyStudentCourseCompletion.pending, (state) => {
        state.loading.verifyStudentCourseCompletion = true;
        state.error.verifyStudentCourseCompletion = '';
      })
      .addCase(verifyStudentCourseCompletion.fulfilled, (state, action) => {
        state.loading.verifyStudentCourseCompletion = false;
        state.completionVerification = action.payload;
      })
      .addCase(verifyStudentCourseCompletion.rejected, (state, action) => {
        state.loading.verifyStudentCourseCompletion = false;
        state.completionVerification = null;
        state.error.verifyStudentCourseCompletion = action.payload;
      });
  },
});

// export const {} = coursesSlice.actions;
export let coursesReducer = coursesSlice.reducer;
