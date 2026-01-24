// redux/coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addCourse,
  deleteCourse,
  getCourses,
  updateCourse,
  uploadCourseThumbnail,
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
  uploadMaterial,
} from './courses.service';

const initialState = {
  courses: [],
  groups: [],
  course: null,
  loading: {
    getCourses: false,
    addCourse: false,
    updateCourse: false,
    deleteCourse: false,
    getGroups: false,
    addGroup: false,
    updateGroup: false,
    deleteGroup: false,
    uploadMaterial: false,
  },
  error: {
    getCourses: '',
    addCourse: '',
    updateCourse: '',
    deleteCourse: '',
    getGroups: '',
    addGroup: '',
    updateGroup: '',
    deleteGroup: '',
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
      .addCase(getGroups.pending, (state) => {
        state.loading.getGroups = true;
        state.error.getGroups = '';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.loading.getGroups = false;
        state.groups = action.payload.groups;
        state.selectedCourse = action.payload.course;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading.getGroups = false;
        state.groups = [];
        state.error.getGroups = action.payload;
      })
      .addCase(addGroup.pending, (state) => {
        state.loading.addGroup = true;
        state.error.addGroup = '';
      })
      .addCase(addGroup.fulfilled, (state) => {
        state.loading.addGroup = false;
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.loading.addGroup = false;
        state.error.addGroup = action.payload;
      })
      .addCase(updateGroup.pending, (state) => {
        state.loading.updateGroup = true;
        state.error.updateGroup = '';
      })
      .addCase(updateGroup.fulfilled, (state) => {
        state.loading.updateGroup = false;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading.updateGroup = false;
        state.error.updateGroup = action.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading.deleteGroup = true;
        state.error.deleteGroup = '';
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.loading.deleteGroup = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading.deleteGroup = false;
        state.error.deleteGroup = action.payload;
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
      });
  },
});

// export const {} = coursesSlice.actions;
export let coursesReducer = coursesSlice.reducer;
