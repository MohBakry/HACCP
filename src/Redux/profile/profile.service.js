import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

// Get user profile
export const getUserProfile = createAsyncThunk(
  'profile/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get('users/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch profile'
      );
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put('users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update profile'
      );
    }
  }
);
