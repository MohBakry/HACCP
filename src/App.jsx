// import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import RootLayout from './shared/layout';
import About from './pages/aboutUs';
import Courses from './pages/courses';
import Consultation from './pages/consaltation';
import CourseDetails from './pages/courses/coursesDetails';
import CourseTracks from './pages/courseTracks/page';
import CourseTrackDetails from './pages/courseTracks/courseTrackDetails';
import Directory from './pages/directory';
import Events from './pages/events';
import EventDetails from './pages/events/eventDetails';
import Podcast from './pages/podcast';
import News from './pages/news';
import NewsDetails from './pages/news/newsDetails';
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
import CourseManager from './pages/dashboard/courseManager';
// import AdminCurrentCourses from './pages/dashBoard/currentCourses';
// import AdminCompletedCourses from './pages/dashBoard/compeletedCourses';
import Instructors from './pages/dashboard/instructors';
import CourseGroups from './pages/dashBoard/courseGroups';
import GroupModulesManager from './pages/dashBoard/groupModules';
import MyCourses from './pages/profile/myCourses';
import RecommendedCourses from './pages/profile/recommendedCourses';
import EnrolledCourses from './pages/profile/enrolledCourses';
import ListInstructorCourses from './pages/instructorDashboard/ListCourses';
import ResetPassword from './pages/authentication/resetPassword';
import AddEditCoursePage from './pages/dashBoard/courseManager/addEditCoursePage';
import LoadingOverlay from './shared/overlay/loadingOverlay';
import CourseContentPage from './pages/dashBoard/courseManager/courseContent/courseContentPage';
import EventManager from './pages/dashBoard/eventManager';
import AddEditEventPage from './pages/dashBoard/eventManager/addEditEventPage';
import NewsManager from './pages/dashBoard/newsManager';
import AddEditNewsPage from './pages/dashBoard/newsManager/addEditNewsPage';
import CreateExamPage from './pages/dashBoard/courseManager/createExam';
import ManageExamPage from './pages/dashBoard/courseManager/manageExam';
import CourseTracksPage from './pages/courseTracks/page';
import Checkout from './pages/checkout';
import Payment from './pages/payment';
import StudentCourseContent from './pages/student/courseContent';
import AssessmentSubmissionsManagement from './pages/dashBoard/courseManager/assessmentSubmissions';
import ExamPage from './pages/exam/ExamPage';
import Certificate from './pages/certificate';
import StudentVerification from './pages/studentVerification';
import MyDiplomas from './pages/profile/myDiplomas';
import DiplomaProgressDetails from './pages/profile/myDiplomas/details';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/myprofile" element={<EditProfile />} />
            <Route
              path="/recommended-courses"
              element={<RecommendedCourses />}
            />
            <Route path="/courseContent" element={<CourseContent />} />
            {/* <Route path="/exam" element={<Exam />} /> */}
            {/* <Route path="/createExam" element={<CreateExam />} /> */}
            {/* <Route path="/examsPage" element={<ExamsPage />} /> */}
            <Route
              path="/dashboard/manage-courses/:courseId/course-groups"
              element={<CourseGroups />}
            />
            <Route
              path="/dashboard/manage-courses/:courseId/group-modules/:groupId"
              element={<GroupModulesManager />}
            />
            <Route
              path="/courses/:courseId/groups/:groupId/students/:studentId/assessments"
              element={<AssessmentSubmissionsManagement />}
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
              path="/dashboard/manage-courses/:courseId/create-exam"
              element={<CreateExamPage />}
            />
            <Route
              path="/dashboard/manage-courses/:courseId/manage-exam"
              element={<ManageExamPage />}
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
            <Route path="/dashboard/course-tracks" element={<CourseTracks />} />
            <Route path="/dashboard/manage-events" element={<EventManager />} />
            <Route
              path="/dashboard/manage-events/add"
              element={<AddEditEventPage />}
            />
            <Route
              path="/dashboard/manage-events/edit/:eventId"
              element={<AddEditEventPage />}
            />
            <Route path="/dashboard/manage-news" element={<NewsManager />} />
            <Route
              path="/dashboard/manage-news/add"
              element={<AddEditNewsPage />}
            />
            <Route
              path="/dashboard/manage-news/edit/:newsId"
              element={<AddEditNewsPage />}
            />
          </Route>
        </Route>

        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/courses/details/:id" element={<CourseDetails />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/checkout/:courseId/:groupId" element={<Checkout />} />
          <Route path="/payment/:courseId/:groupId" element={<Payment />} />
          <Route path="/diplomas/:id" element={<CourseTrackDetails />} />
          <Route path="/diplomas" element={<CourseTracksPage />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/directory" element={<Directory />} />
          <Route
            path="/student-verification/:courseId/:studentEmail"
            element={<StudentVerification />}
          />
          <Route path="/events/details/:id" element={<EventDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/news/details/:id" element={<NewsDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/set-password" element={<ResetPassword />} />
          <Route path="/profile/my-courses" element={<EnrolledCourses />} />
          <Route path="/profile/diplomas" element={<MyDiplomas />} />
          <Route
            path="/profile/diplomas/:trackId"
            element={<DiplomaProgressDetails />}
          />
          <Route
            path="/course-content/:courseId/:groupId"
            element={<StudentCourseContent />}
          />
          <Route path="/exam/:courseId/:groupId" element={<ExamPage />} />
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/certificate" element={<Certificate />} />
        </Route>

        {/* <Route path="/contact" element={<Contact />} />  */}
      </Routes>
      <LoadingOverlay />
    </>
  );
}

export default App;
