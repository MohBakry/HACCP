import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getNews = createAsyncThunk('get/news', async (_, thunkAPI) => {
  try {
    const res = await axiosClient.get('news');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to get news'
    );
  }
});

export const addNews = createAsyncThunk('add/news', async (body, thunkAPI) => {
  try {
    const res = await axiosClient.post('news', body);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to add news'
    );
  }
});

export const updateNews = createAsyncThunk(
  'update/news',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(`news/${body._id}`, body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update news'
      );
    }
  }
);

export const deleteNews = createAsyncThunk(
  'delete/news',
  async (newsId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`news/${newsId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete news'
      );
    }
  }
);

export const uploadNewsImage = createAsyncThunk(
  'news/uploadImage',
  async ({ newsId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axiosClient.post(`/news/${newsId}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return res.data; // { imageUrl }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getPublishedNews = createAsyncThunk(
  'get/publishedNews',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('news/published');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get published news'
      );
    }
  }
);

export const getHighlightedNews = createAsyncThunk(
  'get/highlightedNews',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('news/highlighted');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get highlighted news'
      );
    }
  }
);

export const getPublishedNewsDetails = createAsyncThunk(
  'get/publishedNewsDetails',
  async (newsId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`news/published/${newsId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get news details'
      );
    }
  }
);
