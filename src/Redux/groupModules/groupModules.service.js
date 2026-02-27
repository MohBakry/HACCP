import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

// Get all modules for a specific course group
export const getGroupModules = createAsyncThunk(
  'groupModules/getGroupModules',
  async ({ courseId, groupId }, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `/course/${courseId}/groups/${groupId}/modules`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get group modules'
      );
    }
  }
);

// Publish a module for a specific group
export const publishModuleForGroup = createAsyncThunk(
  'groupModules/publishModule',
  async ({ courseId, groupId, moduleId }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `/course/${courseId}/groups/${groupId}/modules/${moduleId}/publish`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to publish module'
      );
    }
  }
);

// Unpublish a module for a specific group
export const unpublishModuleForGroup = createAsyncThunk(
  'groupModules/unpublishModule',
  async ({ courseId, groupId, moduleId }, thunkAPI) => {
    try {
      const res = await axiosClient.delete(
        `/course/${courseId}/groups/${groupId}/modules/${moduleId}/unpublish`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to unpublish module'
      );
    }
  }
);

// Bulk publish/unpublish modules
export const bulkUpdateModuleStatus = createAsyncThunk(
  'groupModules/bulkUpdate',
  async ({ courseId, groupId, moduleIds, action }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `/course/${courseId}/groups/${groupId}/modules/bulk-update`,
        { moduleIds, action }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update modules'
      );
    }
  }
);

// Get enrolled users for a group
export const getEnrolledUsers = createAsyncThunk(
  'groupModules/getEnrolledUsers',
  async ({ courseId, groupId }, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `/course/${courseId}/groups/${groupId}/enrolled-users`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get enrolled users'
      );
    }
  }
);
