import { configureStore } from '@reduxjs/toolkit';

import { userReducer } from './auth/user.store';
import { usersReducer } from './users/users.store';
import { coursesReducer } from './courses/courses.store';
import { rootReducer } from './root/root.store';
export let store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    courses: coursesReducer,
    root: rootReducer,
  },
});
