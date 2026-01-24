import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getCourses = createAsyncThunk(
  'get/courses',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('courses');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get data'
      );
    }
  }
);

export const addCourse = createAsyncThunk(
  'add/course',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.post('courses', body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add course'
      );
    }
  }
);

export const updateCourse = createAsyncThunk(
  'update/course',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(`courses/${body._id}`, body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update course'
      );
    }
  }
);

export const deleteCourse = createAsyncThunk(
  'delete/course',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`courses/${courseId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete course'
      );
    }
  }
);

export const uploadCourseThumbnail = createAsyncThunk(
  'courses/uploadThumbnail',
  async ({ courseId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axiosClient.post(
        `/courses/${courseId}/thumbnail`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return res.data; // { imageUrl }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getGroups = createAsyncThunk(
  'get/groups',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`/course/${courseId}/groups`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get groups'
      );
    }
  }
);

export const addGroup = createAsyncThunk(
  'add/group',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `/course/${body.courseId}/groups`,
        body
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add group'
      );
    }
  }
);

export const updateGroup = createAsyncThunk(
  'update/group',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(
        `/course/${body.courseId}/groups/${body._id}`,
        body
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update group'
      );
    }
  }
);

export const deleteGroup = createAsyncThunk(
  'delete/group',
  async (courseId, groupId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(
        `/course/${courseId}/groups/${groupId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete group'
      );
    }
  }
);

export const uploadMaterial = createAsyncThunk(
  'upload/material',
  async ({ courseId, moduleId, title, file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const res = await axiosClient.post(
        `courses/${courseId}/${moduleId}/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to upload material'
      );
    }
  }
);
