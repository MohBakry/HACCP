import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

// Start a new exam attempt
export const startExamAttempt = createAsyncThunk(
  'examAttempts/startExamAttempt',
  async ({ courseId, groupId, examId }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `final-exam/${courseId}/${groupId}/start`,
        {
          courseId,
          groupId,
          examId,
          startedAt: new Date().toISOString(),
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to start exam attempt'
      );
    }
  }
);

// Get attempt by course and group ID
export const getExamAttemptByGroupAndCourse = createAsyncThunk(
  'examAttempts/getExamAttemptByGroupAndCourse',
  async ({ courseId, groupId }, thunkAPI) => {
    try {
      const res = await axiosClient.get(`final-exam/${courseId}/${groupId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get exam attempt'
      );
    }
  }
);

// Save answer to attempt
export const saveAnswer = createAsyncThunk(
  'examAttempts/saveAnswer',
  async ({ attemptId, questionId, answer }, thunkAPI) => {
    try {
      const res = await axiosClient.post(`exam-attempts/${attemptId}/answer`, {
        questionId,
        answer,
        answeredAt: new Date().toISOString(),
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to save answer'
      );
    }
  }
);

// Flag question for review
export const flagQuestionForReview = createAsyncThunk(
  'examAttempts/flagQuestionForReview',
  async ({ attemptId, questionId, flagged }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `exam-attempts/${attemptId}/flag-review`,
        {
          questionId,
          flagged,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to flag question'
      );
    }
  }
);

// Submit exam attempt
export const submitExamAttempt = createAsyncThunk(
  'examAttempts/submitExamAttempt',
  async ({ courseId, groupId, answers }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `final-exam/${courseId}/${groupId}/submit`,
        {
          answers,
        }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to submit exam'
      );
    }
  }
);

// Get attempt details
export const getExamAttemptDetails = createAsyncThunk(
  'examAttempts/getExamAttemptDetails',
  async (attemptId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`exam-attempts/${attemptId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get attempt details'
      );
    }
  }
);

// Update attempt (for resuming)
export const updateExamAttempt = createAsyncThunk(
  'examAttempts/updateExamAttempt',
  async ({ attemptId, updates }, thunkAPI) => {
    try {
      const res = await axiosClient.put(`exam-attempts/${attemptId}`, updates);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update attempt'
      );
    }
  }
);
