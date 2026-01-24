// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  addInstructor,
  deleteInstructor,
  getInstructorCourses,
  getInstructors,
} from './users.service';

const initialState = {
  instructors: [],
  selectedInstructor: null,
  loading: {
    getInstructors: false,
    addInstructor: false,
    getInstructorDetails: false,
    deleteInstructor: false,
  },
  error: {
    getInstructors: '',
    addInstructor: '',
    getInstructorDetails: '',
    deleteInstructor: '',
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInstructors.pending, (state) => {
        state.loading.getInstructors = true;
        state.error.getInstructors = '';
      })
      .addCase(getInstructors.fulfilled, (state, action) => {
        state.loading.getInstructors = false;
        state.instructors = action.payload;
      })
      .addCase(getInstructors.rejected, (state, action) => {
        state.loading.getInstructors = false;
        state.instructors = [];
        state.error.getInstructors = action.payload;
      })
      .addCase(addInstructor.pending, (state) => {
        state.loading.addInstructor = true;
        state.error.addInstructor = '';
      })
      .addCase(addInstructor.fulfilled, (state) => {
        state.loading.addInstructor = false;
      })
      .addCase(addInstructor.rejected, (state, action) => {
        state.loading.addInstructor = false;
        state.error.addInstructor = action.payload;
      })
      .addCase(getInstructorCourses.pending, (state) => {
        state.loading.getInstructorDetails = true;
        state.error.getInstructorDetails = '';
      })
      .addCase(getInstructorCourses.fulfilled, (state, action) => {
        state.loading.getInstructorDetails = false;
        state.selectedInstructor = action.payload;
      })
      .addCase(getInstructorCourses.rejected, (state, action) => {
        state.loading.getInstructorDetails = false;
        state.error.getInstructorDetails = action.payload;
      })
      .addCase(deleteInstructor.pending, (state) => {
        state.loading.deleteInstructor = true;
        state.error.deleteInstructor = '';
      })
      .addCase(deleteInstructor.fulfilled, (state) => {
        state.loading.deleteInstructor = false;
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.loading.deleteInstructor = false;
        state.error.deleteInstructor = action.payload;
      });
  },
});

// export const {} = usersSlice.actions;
export let usersReducer = usersSlice.reducer;
