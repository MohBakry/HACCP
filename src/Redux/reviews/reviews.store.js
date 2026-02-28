import { createSlice } from '@reduxjs/toolkit';
import {
  submitOrUpdateReview,
  getCourseReviews,
  getMyReview,
  deleteReview,
  getAverageRating,
} from './reviews.service';

const initialState = {
  courseReviews: null,
  myReview: null,
  averageRating: null,
  loading: {
    submitOrUpdateReview: false,
    getCourseReviews: false,
    getMyReview: false,
    deleteReview: false,
    getAverageRating: false,
  },
  error: {
    submitOrUpdateReview: '',
    getCourseReviews: '',
    getMyReview: '',
    deleteReview: '',
    getAverageRating: '',
  },
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearMyReview: (state) => {
      state.myReview = null;
    },
    clearReviewErrors: (state) => {
      state.error = {
        submitOrUpdateReview: '',
        getCourseReviews: '',
        getMyReview: '',
        deleteReview: '',
        getAverageRating: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrUpdateReview.pending, (state) => {
        state.loading.submitOrUpdateReview = true;
        state.error.submitOrUpdateReview = '';
      })
      .addCase(submitOrUpdateReview.fulfilled, (state, action) => {
        state.loading.submitOrUpdateReview = false;
        state.myReview = action.payload.review;
      })
      .addCase(submitOrUpdateReview.rejected, (state, action) => {
        state.loading.submitOrUpdateReview = false;
        state.error.submitOrUpdateReview = action.payload;
      })
      .addCase(getCourseReviews.pending, (state) => {
        state.loading.getCourseReviews = true;
        state.error.getCourseReviews = '';
      })
      .addCase(getCourseReviews.fulfilled, (state, action) => {
        state.loading.getCourseReviews = false;
        state.courseReviews = action.payload;
      })
      .addCase(getCourseReviews.rejected, (state, action) => {
        state.loading.getCourseReviews = false;
        state.error.getCourseReviews = action.payload;
      })
      .addCase(getMyReview.pending, (state) => {
        state.loading.getMyReview = true;
        state.error.getMyReview = '';
      })
      .addCase(getMyReview.fulfilled, (state, action) => {
        state.loading.getMyReview = false;
        state.myReview = action.payload;
      })
      .addCase(getMyReview.rejected, (state, action) => {
        state.loading.getMyReview = false;
        state.myReview = null;
        state.error.getMyReview = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading.deleteReview = true;
        state.error.deleteReview = '';
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading.deleteReview = false;
        state.myReview = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading.deleteReview = false;
        state.error.deleteReview = action.payload;
      })
      .addCase(getAverageRating.pending, (state) => {
        state.loading.getAverageRating = true;
        state.error.getAverageRating = '';
      })
      .addCase(getAverageRating.fulfilled, (state, action) => {
        state.loading.getAverageRating = false;
        state.averageRating = action.payload;
      })
      .addCase(getAverageRating.rejected, (state, action) => {
        state.loading.getAverageRating = false;
        state.error.getAverageRating = action.payload;
      });
  },
});

export const { clearMyReview, clearReviewErrors } = reviewsSlice.actions;
export const reviewsReducer = reviewsSlice.reducer;
