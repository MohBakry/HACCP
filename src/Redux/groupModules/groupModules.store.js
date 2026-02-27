import { createSlice } from '@reduxjs/toolkit';
import {
  getGroupModules,
  publishModuleForGroup,
  unpublishModuleForGroup,
  bulkUpdateModuleStatus,
  getEnrolledUsers,
} from './groupModules.service';

const initialState = {
  modules: [],
  enrolledUsers: [],
  groupName: null,
  courseTitle: null,
  loading: {
    getGroupModules: false,
    publishModule: false,
    unpublishModule: false,
    bulkUpdate: false,
    getEnrolledUsers: false,
  },
  error: {
    getGroupModules: '',
    publishModule: '',
    unpublishModule: '',
    bulkUpdate: '',
    getEnrolledUsers: '',
  },
};

const groupModulesSlice = createSlice({
  name: 'groupModules',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = { ...initialState.error };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Group Modules
      .addCase(getGroupModules.pending, (state) => {
        state.loading.getGroupModules = true;
        state.error.getGroupModules = '';
      })
      .addCase(getGroupModules.fulfilled, (state, action) => {
        state.loading.getGroupModules = false;
        state.modules = action.payload.modules || [];
        state.groupName = action.payload.groupName || null;
        state.courseTitle = action.payload.courseTitle || null;
      })
      .addCase(getGroupModules.rejected, (state, action) => {
        state.loading.getGroupModules = false;
        state.error.getGroupModules = action.payload;
        state.modules = [];
        state.groupName = null;
        state.courseTitle = null;
      })
      // Publish Module
      .addCase(publishModuleForGroup.pending, (state) => {
        state.loading.publishModule = true;
        state.error.publishModule = '';
      })
      .addCase(publishModuleForGroup.fulfilled, (state, action) => {
        state.loading.publishModule = false;
        // Update module status in the list
        const index = state.modules.findIndex(
          (m) => m._id === action.payload.moduleId
        );
        if (index !== -1) {
          state.modules[index].published = true;
          state.modules[index].publishedAt = action.payload.publishedAt;
        }
      })
      .addCase(publishModuleForGroup.rejected, (state, action) => {
        state.loading.publishModule = false;
        state.error.publishModule = action.payload;
      })
      // Unpublish Module
      .addCase(unpublishModuleForGroup.pending, (state) => {
        state.loading.unpublishModule = true;
        state.error.unpublishModule = '';
      })
      .addCase(unpublishModuleForGroup.fulfilled, (state, action) => {
        state.loading.unpublishModule = false;
        const index = state.modules.findIndex(
          (m) => m._id === action.payload.moduleId
        );
        if (index !== -1) {
          state.modules[index].published = false;
          state.modules[index].publishedAt = null;
        }
      })
      .addCase(unpublishModuleForGroup.rejected, (state, action) => {
        state.loading.unpublishModule = false;
        state.error.unpublishModule = action.payload;
      })
      // Bulk Update
      .addCase(bulkUpdateModuleStatus.pending, (state) => {
        state.loading.bulkUpdate = true;
        state.error.bulkUpdate = '';
      })
      .addCase(bulkUpdateModuleStatus.fulfilled, (state, action) => {
        state.loading.bulkUpdate = false;
        // Update all affected modules
        const updatedIds = action.payload.moduleIds;
        const newStatus = action.payload.action === 'publish';
        state.modules = state.modules.map((m) =>
          updatedIds.includes(m._id) ? { ...m, published: newStatus } : m
        );
      })
      .addCase(bulkUpdateModuleStatus.rejected, (state, action) => {
        state.loading.bulkUpdate = false;
        state.error.bulkUpdate = action.payload;
      })
      // Get Enrolled Users
      .addCase(getEnrolledUsers.pending, (state) => {
        state.loading.getEnrolledUsers = true;
        state.error.getEnrolledUsers = '';
      })
      .addCase(getEnrolledUsers.fulfilled, (state, action) => {
        state.loading.getEnrolledUsers = false;
        state.enrolledUsers = action.payload || [];
      })
      .addCase(getEnrolledUsers.rejected, (state, action) => {
        state.loading.getEnrolledUsers = false;
        state.error.getEnrolledUsers = action.payload;
        state.enrolledUsers = [];
      });
  },
});

export const { clearErrors } = groupModulesSlice.actions;
export const groupModulesReducer = groupModulesSlice.reducer;
