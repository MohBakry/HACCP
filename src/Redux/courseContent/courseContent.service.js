import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getCourseContent = createAsyncThunk(
  'course/fetchCourseContent',
  async (courseId, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(`/courses/${courseId}/course-content`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load course'
      );
    }
  }
);

export const addModule = createAsyncThunk(
  'course/addModule',
  async ({ courseId, moduleData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(
        `/courses/${courseId}/modules`,
        moduleData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add module'
      );
    }
  }
);

export const editModule = createAsyncThunk(
  'course/editModule',
  async ({ courseId, moduleId, moduleData }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.put(
        `/courses/${courseId}/modules/${moduleId}`,
        moduleData
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to edit module'
      );
    }
  }
);

export const deleteMaterial = createAsyncThunk(
  'course/deleteMaterial',
  async ({ courseId, moduleId, materialId }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.delete(
        `/course-content/${courseId}/${moduleId}/${materialId}/material`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete material'
      );
    }
  }
);

// Student Course Content Services
export const getStudentCourseContent = createAsyncThunk(
  'student/getCourseContent',
  async ({ courseId, groupId }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.get(
        `/courses/${courseId}/groups/${groupId}/content`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load course content'
      );
    }
  }
);

export const submitAssessment = createAsyncThunk(
  'student/submitAssessment',
  async (
    { courseId, groupId, moduleId, assessmentId, formData },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosClient.post(
        `students/courses/${courseId}/groups/${groupId}/modules/${moduleId}/assessments/${assessmentId}/submit`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to submit assessment'
      );
    }
  }
);

export const markModuleComplete = createAsyncThunk(
  'student/markModuleComplete',
  async ({ courseId, moduleId }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.post(
        `/enrollments/${courseId}/modules/${moduleId}/complete`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to mark module as complete'
      );
    }
  }
);

// Instructor Assessment Management
export const uploadAssessment = createAsyncThunk(
  'course/uploadAssessment',
  async (
    { courseId, moduleId, title, description, file },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      if (file) {
        formData.append('file', file);
      }

      const res = await axiosClient.post(
        `/course-content/${courseId}/${moduleId}/upload-assessment`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to upload assessment'
      );
    }
  }
);

export const deleteAssessment = createAsyncThunk(
  'course/deleteAssessment',
  async ({ courseId, moduleId, assessmentId }, { rejectWithValue }) => {
    try {
      const res = await axiosClient.delete(
        `/course-content/${courseId}/${moduleId}/${assessmentId}/assessment`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete assessment'
      );
    }
  }
);

// Get assessment submissions for instructor grading
export const getAssessmentSubmissions = createAsyncThunk(
  'course/getAssessmentSubmissions',
  async ({ courseId, groupId, studentId }, { rejectWithValue }) => {
    try {
      const url = `assessments/${courseId}/groups/${groupId}/assessments/all`;
      const res = await axiosClient.get(url, {
        params: studentId ? { studentId } : undefined,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch submissions'
      );
    }
  }
);

// Submit feedback and score for assessment
export const submitAssessmentFeedback = createAsyncThunk(
  'course/submitAssessmentFeedback',
  async ({ id, score, feedback }, { rejectWithValue }) => {
    try {
      const url = `assessments/${id}/grade`;
      const res = await axiosClient.post(url, {
        score,
        feedback,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to submit feedback'
      );
    }
  }
);
