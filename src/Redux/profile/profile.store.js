import { createSlice } from '@reduxjs/toolkit';
import { getUserProfile, updateUserProfile } from './profile.service';

const initialState = {
  profile: null,
  loading: {
    getUserProfile: false,
    updateUserProfile: false,
  },
  error: {
    getUserProfile: '',
    updateUserProfile: '',
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfileErrors: (state) => {
      state.error.getUserProfile = '';
      state.error.updateUserProfile = '';
    },
  },
  extraReducers: (builder) => {
    // Get user profile
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading.getUserProfile = true;
      state.error.getUserProfile = '';
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading.getUserProfile = false;
      state.profile = action.payload;
    });
    builder.addCase(getUserProfile.rejected, (state, action) => {
      state.loading.getUserProfile = false;
      state.error.getUserProfile = action.payload;
    });

    // Update user profile
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading.updateUserProfile = true;
      state.error.updateUserProfile = '';
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading.updateUserProfile = false;
      state.profile = action.payload.user;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading.updateUserProfile = false;
      state.error.updateUserProfile = action.payload;
    });
  },
});

export const { clearProfileErrors } = profileSlice.actions;
export default profileSlice.reducer;
