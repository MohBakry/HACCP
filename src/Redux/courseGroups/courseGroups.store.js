// redux/coursesSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  getGroups,
  addGroup,
  updateGroup,
  deleteGroup,
} from './courseGroups.service';

const initialState = {
  data: [],
  item: null,
  groups: [],
  course: null,
  loading: {
    getGroups: false,
    addGroup: false,
    updateGroup: false,
    deleteGroup: false,
  },
  error: {
    getGroups: '',
    addGroup: '',
    updateGroup: '',
    deleteGroup: '',
  },
};

const courseGroupsSlice = createSlice({
  name: 'courseGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.loading.getGroups = true;
        state.error.getGroups = '';
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.loading.getGroups = false;
        state.groups = action.payload.groups;
        state.selectedCourse = action.payload.course;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.loading.getGroups = false;
        state.groups = [];
        state.error.getGroups = action.payload;
      })
      .addCase(addGroup.pending, (state) => {
        state.loading.addGroup = true;
        state.error.addGroup = '';
      })
      .addCase(addGroup.fulfilled, (state) => {
        state.loading.addGroup = false;
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.loading.addGroup = false;
        state.error.addGroup = action.payload;
      })
      .addCase(updateGroup.pending, (state) => {
        state.loading.updateGroup = true;
        state.error.updateGroup = '';
      })
      .addCase(updateGroup.fulfilled, (state) => {
        state.loading.updateGroup = false;
      })
      .addCase(updateGroup.rejected, (state, action) => {
        state.loading.updateGroup = false;
        state.error.updateGroup = action.payload;
      })
      .addCase(deleteGroup.pending, (state) => {
        state.loading.deleteGroup = true;
        state.error.deleteGroup = '';
      })
      .addCase(deleteGroup.fulfilled, (state) => {
        state.loading.deleteGroup = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading.deleteGroup = false;
        state.error.deleteGroup = action.payload;
      });
  },
});

// export const {} = coursesSlice.actions;
export let courseGroupsReducer = courseGroupsSlice.reducer;
