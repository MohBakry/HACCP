// redux/courseTracksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addCourseTrack,
  deleteCourseTrack,
  getCourseTrackDetails,
  getCourseTracks,
  updateCourseTrack,
  getPublishedCourseTracks,
  getPublishedCourseTrackDetails,
} from './courseTracks.service';

const initialState = {
  courseTracks: [],
  publishedCourseTracks: [],
  selectedCourseTrack: null,
  trackDetails: null,
  loading: {
    getCourseTracks: false,
    addCourseTrack: false,
    updateCourseTrack: false,
    getCourseTrackDetails: false,
    deleteCourseTrack: false,
    getPublishedCourseTracks: false,
    getPublishedCourseTrackDetails: false,
  },
  error: {
    getCourseTracks: '',
    addCourseTrack: '',
    updateCourseTrack: '',
    getCourseTrackDetails: '',
    deleteCourseTrack: '',
    getPublishedCourseTracks: '',
    getPublishedCourseTrackDetails: '',
  },
};

const courseTracksSlice = createSlice({
  name: 'courseTracks',
  initialState,
  reducers: {
    clearSelectedCourseTrack: (state) => {
      state.selectedCourseTrack = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseTracks.pending, (state) => {
        state.loading.getCourseTracks = true;
        state.error.getCourseTracks = '';
      })
      .addCase(getCourseTracks.fulfilled, (state, action) => {
        state.loading.getCourseTracks = false;
        state.courseTracks = action.payload.courseTracks;
      })
      .addCase(getCourseTracks.rejected, (state, action) => {
        state.loading.getCourseTracks = false;
        state.courseTracks = [];
        state.error.getCourseTracks = action.payload;
      })
      .addCase(addCourseTrack.pending, (state) => {
        state.loading.addCourseTrack = true;
        state.error.addCourseTrack = '';
      })
      .addCase(addCourseTrack.fulfilled, (state) => {
        state.loading.addCourseTrack = false;
      })
      .addCase(addCourseTrack.rejected, (state, action) => {
        state.loading.addCourseTrack = false;
        state.error.addCourseTrack = action.payload;
      })
      .addCase(updateCourseTrack.pending, (state) => {
        state.loading.updateCourseTrack = true;
        state.error.updateCourseTrack = '';
      })
      .addCase(updateCourseTrack.fulfilled, (state) => {
        state.loading.updateCourseTrack = false;
      })
      .addCase(updateCourseTrack.rejected, (state, action) => {
        state.loading.updateCourseTrack = false;
        state.error.updateCourseTrack = action.payload;
      })
      .addCase(getCourseTrackDetails.pending, (state) => {
        state.loading.getCourseTrackDetails = true;
        state.error.getCourseTrackDetails = '';
      })
      .addCase(getCourseTrackDetails.fulfilled, (state, action) => {
        state.loading.getCourseTrackDetails = false;
        state.selectedCourseTrack = action.payload;
      })
      .addCase(getCourseTrackDetails.rejected, (state, action) => {
        state.loading.getCourseTrackDetails = false;
        state.error.getCourseTrackDetails = action.payload;
      })
      .addCase(deleteCourseTrack.pending, (state) => {
        state.loading.deleteCourseTrack = true;
        state.error.deleteCourseTrack = '';
      })
      .addCase(deleteCourseTrack.fulfilled, (state) => {
        state.loading.deleteCourseTrack = false;
      })
      .addCase(deleteCourseTrack.rejected, (state, action) => {
        state.loading.deleteCourseTrack = false;
        state.error.deleteCourseTrack = action.payload;
      })
      .addCase(getPublishedCourseTracks.pending, (state) => {
        state.loading.getPublishedCourseTracks = true;
        state.error.getPublishedCourseTracks = '';
      })
      .addCase(getPublishedCourseTracks.fulfilled, (state, action) => {
        state.loading.getPublishedCourseTracks = false;
        state.publishedCourseTracks = action.payload.courseTracks || action.payload;
      })
      .addCase(getPublishedCourseTracks.rejected, (state, action) => {
        state.loading.getPublishedCourseTracks = false;
        state.error.getPublishedCourseTracks = action.payload;
      })
      .addCase(getPublishedCourseTrackDetails.pending, (state) => {
        state.loading.getPublishedCourseTrackDetails = true;
        state.error.getPublishedCourseTrackDetails = '';
      })
      .addCase(getPublishedCourseTrackDetails.fulfilled, (state, action) => {
        state.loading.getPublishedCourseTrackDetails = false;
        state.trackDetails = action.payload;
      })
      .addCase(getPublishedCourseTrackDetails.rejected, (state, action) => {
        state.loading.getPublishedCourseTrackDetails = false;
        state.error.getPublishedCourseTrackDetails = action.payload;
      });
  },
});

export const { clearSelectedCourseTrack } = courseTracksSlice.actions;
export const courseTracksReducer = courseTracksSlice.reducer;
