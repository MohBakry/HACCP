import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./auth/user.store";
export let store = configureStore({
  reducer: {
    user: userReducer,
  },
});
