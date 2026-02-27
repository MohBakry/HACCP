import { createSlice } from '@reduxjs/toolkit';
import {
  addNews,
  deleteNews,
  getHighlightedNews,
  getNews,
  getPublishedNews,
  getPublishedNewsDetails,
  updateNews,
  uploadNewsImage,
} from './news.service';

const initialState = {
  news: [],
  publishedNews: [],
  highlightedNews: [],
  newsItem: null,
  newsDetails: null,
  loading: {
    getNews: false,
    getPublishedNews: false,
    getHighlightedNews: false,
    getPublishedNewsDetails: false,
    addNews: false,
    updateNews: false,
    deleteNews: false,
    uploadNewsImage: false,
  },
  error: {
    getNews: '',
    getPublishedNews: '',
    getHighlightedNews: '',
    getPublishedNewsDetails: '',
    addNews: '',
    updateNews: '',
    deleteNews: '',
    uploadNewsImage: '',
  },
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading.getNews = true;
        state.error.getNews = '';
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading.getNews = false;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading.getNews = false;
        state.news = [];
        state.error.getNews = action.payload;
      })
      .addCase(addNews.pending, (state) => {
        state.loading.addNews = true;
        state.error.addNews = '';
      })
      .addCase(addNews.fulfilled, (state) => {
        state.loading.addNews = false;
      })
      .addCase(addNews.rejected, (state, action) => {
        state.loading.addNews = false;
        state.error.addNews = action.payload;
      })
      .addCase(updateNews.pending, (state) => {
        state.loading.updateNews = true;
        state.error.updateNews = '';
      })
      .addCase(updateNews.fulfilled, (state) => {
        state.loading.updateNews = false;
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.loading.updateNews = false;
        state.error.updateNews = action.payload;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading.deleteNews = true;
        state.error.deleteNews = '';
      })
      .addCase(deleteNews.fulfilled, (state) => {
        state.loading.deleteNews = false;
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.loading.deleteNews = false;
        state.error.deleteNews = action.payload;
      })
      .addCase(uploadNewsImage.pending, (state) => {
        state.loading.uploadNewsImage = true;
        state.error.uploadNewsImage = '';
      })
      .addCase(uploadNewsImage.fulfilled, (state) => {
        state.loading.uploadNewsImage = false;
      })
      .addCase(uploadNewsImage.rejected, (state, action) => {
        state.loading.uploadNewsImage = false;
        state.error.uploadNewsImage = action.payload;
      })
      .addCase(getPublishedNews.pending, (state) => {
        state.loading.getPublishedNews = true;
        state.error.getPublishedNews = '';
      })
      .addCase(getPublishedNews.fulfilled, (state, action) => {
        state.loading.getPublishedNews = false;
        state.publishedNews = action.payload;
      })
      .addCase(getPublishedNews.rejected, (state, action) => {
        state.loading.getPublishedNews = false;
        state.publishedNews = [];
        state.error.getPublishedNews = action.payload;
      })
      .addCase(getHighlightedNews.pending, (state) => {
        state.loading.getHighlightedNews = true;
        state.error.getHighlightedNews = '';
      })
      .addCase(getHighlightedNews.fulfilled, (state, action) => {
        state.loading.getHighlightedNews = false;
        state.highlightedNews = action.payload;
      })
      .addCase(getHighlightedNews.rejected, (state, action) => {
        state.loading.getHighlightedNews = false;
        state.highlightedNews = [];
        state.error.getHighlightedNews = action.payload;
      })
      .addCase(getPublishedNewsDetails.pending, (state) => {
        state.loading.getPublishedNewsDetails = true;
        state.error.getPublishedNewsDetails = '';
      })
      .addCase(getPublishedNewsDetails.fulfilled, (state, action) => {
        state.loading.getPublishedNewsDetails = false;
        state.newsDetails = action.payload;
      })
      .addCase(getPublishedNewsDetails.rejected, (state, action) => {
        state.loading.getPublishedNewsDetails = false;
        state.newsDetails = null;
        state.error.getPublishedNewsDetails = action.payload;
      });
  },
});

export default newsSlice.reducer;
