// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token') || null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload
    },
    clearUserToken: (state) => {
      state.token = null
    }
  },
})

export const { setUserToken, clearUserToken } = userSlice.actions
export let userReducer= userSlice.reducer
