import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

// Get exam by course ID (for admin/instructor)
export const getExamByCourseId = createAsyncThunk(
  'exams/getExamByCourseId',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`final-exam/${courseId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get exam'
      );
    }
  }
);

// Get exam questions for student
export const getExamQuestionsForStudent = createAsyncThunk(
  'exams/getExamQuestionsForStudent',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `final-exam/${courseId}/student/questions`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get exam questions'
      );
    }
  }
);

// Create exam for a course
export const createExam = createAsyncThunk(
  'exams/createExam',
  async ({ courseId, examData }, thunkAPI) => {
    try {
      const res = await axiosClient.post(`final-exam/${courseId}`, examData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to create exam'
      );
    }
  }
);

// Update exam settings (duration, passing score)
export const updateExam = createAsyncThunk(
  'exams/updateExam',
  async ({ id, examData }, thunkAPI) => {
    try {
      const res = await axiosClient.put(`final-exam/${id}`, examData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update exam'
      );
    }
  }
);

// Delete exam
export const deleteExam = createAsyncThunk(
  'exams/deleteExam',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`final-exam/${courseId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete exam'
      );
    }
  }
);

// Add question to exam
export const addQuestion = createAsyncThunk(
  'exams/addQuestion',
  async ({ examId, questionData }, thunkAPI) => {
    try {
      const res = await axiosClient.post(
        `final-exam/${examId}/questions`,
        questionData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add question'
      );
    }
  }
);

// Update question
export const updateQuestion = createAsyncThunk(
  'exams/updateQuestion',
  async ({ examId, questionId, questionData }, thunkAPI) => {
    try {
      const res = await axiosClient.put(
        `final-exam/${examId}/questions/${questionId}`,
        questionData
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update question'
      );
    }
  }
);

// Delete question
export const deleteQuestion = createAsyncThunk(
  'exams/deleteQuestion',
  async ({ examId, questionId }, thunkAPI) => {
    try {
      const res = await axiosClient.delete(
        `final-exam/${examId}/questions/${questionId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete question'
      );
    }
  }
);

// Bulk update questions (for reordering or multiple updates)
export const bulkUpdateQuestions = createAsyncThunk(
  'exams/bulkUpdateQuestions',
  async ({ courseId, questions }, thunkAPI) => {
    try {
      const res = await axiosClient.put(
        `courses/${courseId}/exam/questions/bulk`,
        { questions }
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update questions'
      );
    }
  }
);
