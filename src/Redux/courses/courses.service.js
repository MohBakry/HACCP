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

export const uploadMaterial = createAsyncThunk(
  'upload/material',
  async ({ courseId, moduleId, title, file }, thunkAPI) => {
    console.log(file, 'file');
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);

      const res = await axiosClient.post(
        `course-content/${courseId}/${moduleId}/upload`,
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

export const getPublishedCourses = createAsyncThunk(
  'get/publishedCourses',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('courses/published');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get published courses'
      );
    }
  }
);

export const getHighlightedCourses = createAsyncThunk(
  'get/highlightedCourses',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('courses/highlighted');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get highlighted courses'
      );
    }
  }
);

export const getPublishedCourseDetails = createAsyncThunk(
  'get/publishedCourseDetails',
  async (courseId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`courses/published/${courseId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get course details'
      );
    }
  }
);

export const getEnrolledCourses = createAsyncThunk(
  'get/enrolledCourses',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('courses/my-courses');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get enrolled courses'
      );
    }
  }
);

export const getCoursesWithCompletedStudents = createAsyncThunk(
  'get/coursesWithCompletedStudents',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        'directory/courses-with-completed-students'
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          'Failed to get courses with completed students'
      );
    }
  }
);

export const verifyStudentCourseCompletion = createAsyncThunk(
  'verify/studentCourseCompletion',
  async ({ studentId, courseId }, thunkAPI) => {
    try {
      const res = await axiosClient.get(
        `courses/verify-completion/${courseId}/${studentId}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to verify completion'
      );
    }
  }
);
