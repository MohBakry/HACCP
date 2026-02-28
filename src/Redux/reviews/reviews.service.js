import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const submitOrUpdateReview = createAsyncThunk(
  'reviews/submitOrUpdate',
  async ({ courseId, rating, reviewText }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `reviews/courses/${courseId}/reviews`,
        {
          rating,
          reviewText,
          courseId,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to submit review'
      );
    }
  }
);

export const getCourseReviews = createAsyncThunk(
  'reviews/getCourseReviews',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`reviews/courses/${courseId}/reviews`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get reviews'
      );
    }
  }
);

export const getMyReview = createAsyncThunk(
  'reviews/getMyReview',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `reviews/courses/${courseId}/my-review`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get your review'
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  'reviews/deleteReview',
  async (reviewId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`reviews/${reviewId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete review'
      );
    }
  }
);

export const getAverageRating = createAsyncThunk(
  'reviews/getAverageRating',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `reviews/courses/${courseId}/average-rating`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get rating'
      );
    }
  }
);
