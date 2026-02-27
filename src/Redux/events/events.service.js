import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../config/axiosClient';

export const getEvents = createAsyncThunk('get/events', async (_, thunkAPI) => {
  try {
    const res = await axiosClient.get('events');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || 'Failed to get events'
    );
  }
});

export const addEvent = createAsyncThunk(
  'add/event',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.post('events', body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to add event'
      );
    }
  }
);

export const updateEvent = createAsyncThunk(
  'update/event',
  async (body, thunkAPI) => {
    try {
      const res = await axiosClient.put(`events/${body._id}`, body);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to update event'
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  'delete/event',
  async (eventId, thunkAPI) => {
    try {
      const res = await axiosClient.delete(`events/${eventId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to delete event'
      );
    }
  }
);

export const uploadEventImage = createAsyncThunk(
  'events/uploadImage',
  async ({ eventId, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await axiosClient.post(`/events/${eventId}/image`, formData, {
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

export const getEventById = createAsyncThunk(
  'get/eventById',
  async (eventId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`events/${eventId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get event by ID'
      );
    }
  }
);

export const getPublishedEvents = createAsyncThunk(
  'get/publishedEvents',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('events/published');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get published events'
      );
    }
  }
);

export const getHighlightedEvents = createAsyncThunk(
  'get/highlightedEvents',
  async (_, thunkAPI) => {
    try {
      const res = await axiosClient.get('events/highlighted');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get highlighted events'
      );
    }
  }
);

export const getPublishedEventDetails = createAsyncThunk(
  'get/publishedEventDetails',
  async (eventId, thunkAPI) => {
    try {
      const res = await axiosClient.get(`events/published/${eventId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to get event details'
      );
    }
  }
);
