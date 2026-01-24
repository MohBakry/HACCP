// import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import RootLayout from './shared/layout';
import About from './pages/aboutUs';
import Courses from './pages/courses';
import Consultation from './pages/consaltation';
import CourseDetails from './pages/courses/coursesDetails';
import Directory from './pages/directory';
import Events from './pages/events';
import Podcast from './pages/podcast';
import News from './pages/news';
import ContactUs from './pages/contactUs';
import Login from './pages/authentication/login';
import Register from './pages/authentication/register';
import ProfilePage from './pages/profile';
import EditProfile from './pages/profile/editProfile';
import CourseContent from './pages/courses/currentCourses/courseContent';
import Exam from './pages/exam';
import CreateExam from './pages/createExam';
import ExamsPage from './pages/examsPage';
import AdminDashboard from './pages/dashboard';
import DashboardLayout from './shared/DashboardLayout';
import ProtectedRoute from './shared/ProtectedRoute';
import CourseManager from './pages/dashBoard/courseManager';
// import AdminCurrentCourses from './pages/dashBoard/currentCourses';
// import AdminCompletedCourses from './pages/dashBoard/compeletedCourses';
import Instructors from './pages/dashBoard/instructors';
import CourseGroups from './pages/dashBoard/courseGroups';
import MyCourses from './pages/profile/myCourses';
import RecommendedCourses from './pages/profile/recommendedCourses';
import ListInstructorCourses from './pages/instructorDashboard/ListCourses';
import ResetPassword from './pages/authentication/resetPassword';
import AddEditCoursePage from './pages/dashBoard/courseManager/addEditCoursePage';
import LoadingOverlay from './shared/overlay/loadingOverlay';
import CourseContentPage from './pages/dashBoard/courseManager/courseContent/courseContentPage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/myprofile" element={<EditProfile />} />
            <Route
              path="/recommended-courses"
              element={<RecommendedCourses />}
            />
            <Route path="/courseContent" element={<CourseContent />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/createExam" element={<CreateExam />} />
            <Route path="/examsPage" element={<ExamsPage />} />
            <Route
              path="/dashboard/manage-courses/:courseId/course-groups"
              element={<CourseGroups />}
            />

            <Route
              path="/dashBoard/manage-courses"
              element={<CourseManager />}
            />
            <Route
              path="/dashBoard/manage-courses/add"
              element={<AddEditCoursePage />}
            />
            <Route
              path="/dashBoard/manage-courses/edit/:courseId"
              element={<AddEditCoursePage />}
            />
            <Route
              path="/dashboard/manage-courses/course-content/:courseId"
              element={<CourseContentPage />}
            />
            <Route
              path="/dashboard/instructor-courses"
              element={<ListInstructorCourses />}
            />
            {/* <Route
              path="/dashBoard/current-courses"
              element={<AdminCurrentCourses />}
            />
            <Route
              path="/dashboard/completed-courses"
              element={<AdminCompletedCourses />}
            /> */}
            <Route path="/dashboard/instructors" element={<Instructors />} />
          </Route>
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/news" element={<News />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<ResetPassword />} />
        </Route>

        {/* <Route path="/contact" element={<Contact />} />  */}
      </Routes>
      <LoadingOverlay />
    </>
  );
}

export default App;
