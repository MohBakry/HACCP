import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getCourseTracks = createAsyncThunk(
  'get/courseTracks',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('course-tracks');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get data'
      );
    }
  }
);

export const addCourseTrack = createAsyncThunk(
  'add/courseTrack',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.post('course-tracks/', body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add course track'
      );
    }
  }
);

export const updateCourseTrack = createAsyncThunk(
  'courseTracks/update-course-track',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(`course-tracks/${body._id}`, body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);

export const getCourseTrackDetails = createAsyncThunk(
  'courseTracks/get-course-track-details',
  async (trackId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`course-tracks/${trackId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get details'
      );
    }
  }
);

export const deleteCourseTrack = createAsyncThunk(
  'courseTracks/delete-course-track',
  async (trackId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(
        `course-tracks/course-track/${trackId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete'
      );
    }
  }
);

export const getPublishedCourseTracks = createAsyncThunk(
  'courseTracks/get-published',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('course-tracks/published');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get published course tracks'
      );
    }
  }
);

export const getPublishedCourseTrackDetails = createAsyncThunk(
  'courseTracks/get-published-details',
  async (trackId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`course-tracks/published/${trackId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get course track details'
      );
    }
  }
);

export const enrollInCourseTrack = createAsyncThunk(
  'courseTracks/enroll',
  async ({ trackId }, thunkAPI) => {
    try {
      const res = await axiosClient.post('course-tracks/enroll', { trackId });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to enroll in course track'
      );
    }
  }
);

export const getMyTrackEnrollments = createAsyncThunk(
  'courseTracks/get-my-enrollments',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('course-tracks/my-enrollments');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch track enrollments'
      );
    }
  }
);

export const getTrackProgress = createAsyncThunk(
  'courseTracks/get-track-progress',
  async (trackId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`course-tracks/${trackId}/progress`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch track progress'
      );
    }
  }
);

export const checkTrackCompletion = createAsyncThunk(
  'courseTracks/check-track-completion',
  async (trackId, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `course-tracks/${trackId}/check-completion`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to check track completion'
      );
    }
  }
);

export const updateTrackProgressByCourse = createAsyncThunk(
  'courseTracks/update-progress-by-course',
  async ({ courseId }, thunkAPI) => {
    try {
      const res = await axiosClient.put('course-tracks/update-progress', {
        courseId,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update track progress'
      );
    }
  }
);
