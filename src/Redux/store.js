import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./UserSlice";
export let store =configureStore({
      reducer:{
            
            user: userReducer
      }
})