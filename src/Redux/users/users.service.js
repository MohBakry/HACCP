import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getInstructors = createAsyncThunk(
  'get/instructors',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('users/get-instructor');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get data'
      );
    }
  }
);

export const addInstructor = createAsyncThunk(
  'add/instructor',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.post('users/add-instructor', body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get data'
      );
    }
  }
);

export const updateInstructor = createAsyncThunk(
  'users/update-instructor',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(
        `users/update-instructor/${body._id}`,
        body
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);

export const getInstructorCourses = createAsyncThunk(
  'users/get-instructor/courses',
  async (instructorId, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `users/get-instructor/${instructorId}/courses`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);

export const deleteInstructor = createAsyncThunk(
  'users/delete-instructor',
  async (instructorId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`users/instructor/${instructorId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update'
      );
    }
  }
);
