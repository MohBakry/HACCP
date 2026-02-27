import { createSlice } from '@reduxjs/toolkit';
import {
  addEvent,
  deleteEvent,
  getEventById,
  getEvents,
  getHighlightedEvents,
  getPublishedEventDetails,
  getPublishedEvents,
  updateEvent,
  uploadEventImage,
} from './events.service';

const initialState = {
  events: [],
  publishedEvents: [],
  highlightedEvents: [],
  event: null,
  eventDetails: null,
  loading: {
    getEvents: false,
    getPublishedEvents: false,
    getHighlightedEvents: false,
    getPublishedEventDetails: false,
    addEvent: false,
    updateEvent: false,
    deleteEvent: false,
    uploadEventImage: false,
    getEventById: false,
  },
  error: {
    getEvents: '',
    getPublishedEvents: '',
    getHighlightedEvents: '',
    getPublishedEventDetails: '',
    addEvent: '',
    updateEvent: '',
    deleteEvent: '',
    uploadEventImage: '',
    getEventById: '',
  },
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading.getEvents = true;
        state.error.getEvents = '';
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading.getEvents = false;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading.getEvents = false;
        state.events = [];
        state.error.getEvents = action.payload;
      })
      .addCase(addEvent.pending, (state) => {
        state.loading.addEvent = true;
        state.error.addEvent = '';
      })
      .addCase(addEvent.fulfilled, (state) => {
        state.loading.addEvent = false;
      })
      .addCase(addEvent.rejected, (state, action) => {
        state.loading.addEvent = false;
        state.error.addEvent = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading.updateEvent = true;
        state.error.updateEvent = '';
      })
      .addCase(updateEvent.fulfilled, (state) => {
        state.loading.updateEvent = false;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading.updateEvent = false;
        state.error.updateEvent = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading.deleteEvent = true;
        state.error.deleteEvent = '';
      })
      .addCase(deleteEvent.fulfilled, (state) => {
        state.loading.deleteEvent = false;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading.deleteEvent = false;
        state.error.deleteEvent = action.payload;
      })
      .addCase(uploadEventImage.pending, (state) => {
        state.loading.uploadEventImage = true;
        state.error.uploadEventImage = '';
      })
      .addCase(uploadEventImage.fulfilled, (state) => {
        state.loading.uploadEventImage = false;
      })
      .addCase(uploadEventImage.rejected, (state, action) => {
        state.loading.uploadEventImage = false;
        state.error.uploadEventImage = action.payload;
      })
      .addCase(getEventById.pending, (state) => {
        state.loading.getEventById = true;
        state.error.getEventById = '';
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.loading.getEventById = false;
        state.event = action.payload;
      })
      .addCase(getEventById.rejected, (state, action) => {
        state.loading.getEventById = false;
        state.error.getEventById = action.payload;
      })
      .addCase(getPublishedEvents.pending, (state) => {
        state.loading.getPublishedEvents = true;
        state.error.getPublishedEvents = '';
      })
      .addCase(getPublishedEvents.fulfilled, (state, action) => {
        state.loading.getPublishedEvents = false;
        state.publishedEvents = action.payload;
      })
      .addCase(getPublishedEvents.rejected, (state, action) => {
        state.loading.getPublishedEvents = false;
        state.publishedEvents = [];
        state.error.getPublishedEvents = action.payload;
      })
      .addCase(getHighlightedEvents.pending, (state) => {
        state.loading.getHighlightedEvents = true;
        state.error.getHighlightedEvents = '';
      })
      .addCase(getHighlightedEvents.fulfilled, (state, action) => {
        state.loading.getHighlightedEvents = false;
        state.highlightedEvents = action.payload;
      })
      .addCase(getHighlightedEvents.rejected, (state, action) => {
        state.loading.getHighlightedEvents = false;
        state.highlightedEvents = [];
        state.error.getHighlightedEvents = action.payload;
      })
      .addCase(getPublishedEventDetails.pending, (state) => {
        state.loading.getPublishedEventDetails = true;
        state.error.getPublishedEventDetails = '';
      })
      .addCase(getPublishedEventDetails.fulfilled, (state, action) => {
        state.loading.getPublishedEventDetails = false;
        state.eventDetails = action.payload;
      })
      .addCase(getPublishedEventDetails.rejected, (state, action) => {
        state.loading.getPublishedEventDetails = false;
        state.eventDetails = null;
        state.error.getPublishedEventDetails = action.payload;
      });
  },
});

export default eventsSlice.reducer;
