import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  message: '',
};

const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.isLoading = true;
      state.message = action.payload || 'Loading...';
    },
    hideLoading: (state) => {
      state.isLoading = false;
      state.message = '';
    },
  },
});

export const { showLoading, hideLoading } = rootSlice.actions;
export const rootReducer = rootSlice.reducer;
