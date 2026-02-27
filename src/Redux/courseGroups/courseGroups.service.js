import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

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
  async ({ courseId, groupId }, thunkAPI) => {
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
