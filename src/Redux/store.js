import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/auth.store';
import { instructorsReducer } from './instructors/instructors.store';
import { coursesReducer } from './courses/courses.store';
import { rootReducer } from './root/root.store';
import { courseGroupsReducer } from './courseGroups/courseGroups.store';
import { courseContentReducer } from './courseContent/courseContent.store';
import { courseTracksReducer } from './courseTracks/courseTracks.store';
import eventsReducer from './events/events.store';
import newsReducer from './news/news.store';
import { examsReducer } from './exams/exams.store';
import { groupModulesReducer } from './groupModules/groupModules.store';
import { examAttemptsReducer } from './examAttempts/examAttempts.store';
import profileReducer from './profile/profile.store';
import { reviewsReducer } from './reviews/reviews.store';

export let store = configureStore({
  reducer: {
    root: rootReducer,
    auth: authReducer,
    courses: coursesReducer,
    instructors: instructorsReducer,
    courseGroups: courseGroupsReducer,
    courseContent: courseContentReducer,
    courseTracks: courseTracksReducer,
    events: eventsReducer,
    news: newsReducer,
    exams: examsReducer,
    groupModules: groupModulesReducer,
    examAttempts: examAttemptsReducer,
    profile: profileReducer,
    reviews: reviewsReducer,
  },
});
