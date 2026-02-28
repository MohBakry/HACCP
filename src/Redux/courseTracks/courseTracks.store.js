// redux/courseTracksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addCourseTrack,
  checkTrackCompletion,
  deleteCourseTrack,
  enrollInCourseTrack,
  getCourseTrackDetails,
  getCourseTracks,
  getMyTrackEnrollments,
  getTrackProgress,
  updateCourseTrack,
  getPublishedCourseTracks,
  getPublishedCourseTrackDetails,
  updateTrackProgressByCourse,
} from './courseTracks.service';

const initialState = {
  courseTracks: [],
  publishedCourseTracks: [],
  selectedCourseTrack: null,
  trackDetails: null,
  myTrackEnrollments: [],
  currentTrackProgress: null,
  trackCompletionStatus: null,
  loading: {
    getCourseTracks: false,
    addCourseTrack: false,
    updateCourseTrack: false,
    getCourseTrackDetails: false,
    deleteCourseTrack: false,
    getPublishedCourseTracks: false,
    getPublishedCourseTrackDetails: false,
    enrollInCourseTrack: false,
    getMyTrackEnrollments: false,
    getTrackProgress: false,
    checkTrackCompletion: false,
    updateTrackProgressByCourse: false,
  },
  error: {
    getCourseTracks: '',
    addCourseTrack: '',
    updateCourseTrack: '',
    getCourseTrackDetails: '',
    deleteCourseTrack: '',
    getPublishedCourseTracks: '',
    getPublishedCourseTrackDetails: '',
    enrollInCourseTrack: '',
    getMyTrackEnrollments: '',
    getTrackProgress: '',
    checkTrackCompletion: '',
    updateTrackProgressByCourse: '',
  },
};

const courseTracksSlice = createSlice({
  name: 'courseTracks',
  initialState,
  reducers: {
    clearSelectedCourseTrack: (state) => {
      state.selectedCourseTrack = null;
    },
    clearTrackProgressState: (state) => {
      state.currentTrackProgress = null;
      state.trackCompletionStatus = null;
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
        state.publishedCourseTracks =
          action.payload.courseTracks || action.payload;
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
      })
      .addCase(enrollInCourseTrack.pending, (state) => {
        state.loading.enrollInCourseTrack = true;
        state.error.enrollInCourseTrack = '';
      })
      .addCase(enrollInCourseTrack.fulfilled, (state, action) => {
        state.loading.enrollInCourseTrack = false;
        state.currentTrackProgress = action.payload?.trackProgress || null;
      })
      .addCase(enrollInCourseTrack.rejected, (state, action) => {
        state.loading.enrollInCourseTrack = false;
        state.error.enrollInCourseTrack = action.payload;
      })
      .addCase(getMyTrackEnrollments.pending, (state) => {
        state.loading.getMyTrackEnrollments = true;
        state.error.getMyTrackEnrollments = '';
      })
      .addCase(getMyTrackEnrollments.fulfilled, (state, action) => {
        state.loading.getMyTrackEnrollments = false;
        state.myTrackEnrollments = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(getMyTrackEnrollments.rejected, (state, action) => {
        state.loading.getMyTrackEnrollments = false;
        state.error.getMyTrackEnrollments = action.payload;
      })
      .addCase(getTrackProgress.pending, (state) => {
        state.loading.getTrackProgress = true;
        state.error.getTrackProgress = '';
      })
      .addCase(getTrackProgress.fulfilled, (state, action) => {
        state.loading.getTrackProgress = false;
        state.currentTrackProgress = action.payload;
      })
      .addCase(getTrackProgress.rejected, (state, action) => {
        state.loading.getTrackProgress = false;
        state.currentTrackProgress = null;
        state.error.getTrackProgress = action.payload;
      })
      .addCase(checkTrackCompletion.pending, (state) => {
        state.loading.checkTrackCompletion = true;
        state.error.checkTrackCompletion = '';
      })
      .addCase(checkTrackCompletion.fulfilled, (state, action) => {
        state.loading.checkTrackCompletion = false;
        state.trackCompletionStatus = action.payload;
      })
      .addCase(checkTrackCompletion.rejected, (state, action) => {
        state.loading.checkTrackCompletion = false;
        state.trackCompletionStatus = null;
        state.error.checkTrackCompletion = action.payload;
      })
      .addCase(updateTrackProgressByCourse.pending, (state) => {
        state.loading.updateTrackProgressByCourse = true;
        state.error.updateTrackProgressByCourse = '';
      })
      .addCase(updateTrackProgressByCourse.fulfilled, (state, action) => {
        state.loading.updateTrackProgressByCourse = false;

        const updatedTracks = action.payload?.trackProgress || [];
        if (state.currentTrackProgress?._id) {
          const matchedTrack = updatedTracks.find((item) => {
            const itemTrackId = item?.trackId?._id || item?.trackId;
            const currentTrackId =
              state.currentTrackProgress?.trackId?._id ||
              state.currentTrackProgress?.trackId;
            return itemTrackId === currentTrackId;
          });

          if (matchedTrack) {
            state.currentTrackProgress = matchedTrack;
          }
        }
      })
      .addCase(updateTrackProgressByCourse.rejected, (state, action) => {
        state.loading.updateTrackProgressByCourse = false;
        state.error.updateTrackProgressByCourse = action.payload;
      });
  },
});

export const { clearSelectedCourseTrack, clearTrackProgressState } =
  courseTracksSlice.actions;
export const courseTracksReducer = courseTracksSlice.reducer;
