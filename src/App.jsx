// import { useState } from 'react'
import './App.css'
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
import Login from './pages/login';
import Register from './pages/register';
import ProfilePage from './pages/profile';
import EditProfile from './pages/profile/editProfile';
import CourseContent from './pages/courses/currentCourses/courseContent';
import Exam from './pages/exam';
import CreateExam from './pages/createExam';
import ExamsPage from './pages/examsPage';
import AdminDashboard from './pages/dashBoard';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <RootLayout>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/consultation" element={<Consultation/>} />
        <Route path="/directory" element={<Directory/>} />
        <Route path="/events" element={<Events/>} />
        <Route path="/podcast" element={<Podcast/>} />
        <Route path="/news" element={<News/>} />
        <Route path="/contactUs" element={<ContactUs/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/myprofile" element={<EditProfile/>} />
        <Route path="/courseContent" element={<CourseContent/>} />
        <Route path="/exam" element={<Exam/>} />
        <Route path="/createExam" element={<CreateExam/>} />
        <Route path="/examsPage" element={<ExamsPage/>} />
        <Route path='/dashBoard' element={<AdminDashboard/>} />

        {/* <Route path="/contact" element={<Contact />} />  */}
      </Routes>
      </RootLayout>
  )
}

export default App
