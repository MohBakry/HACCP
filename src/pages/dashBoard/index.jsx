import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseManager from "./courseManager";
import CrntCourses from "./crntCourses";
import CmpltCourses from "./cmpltCourses";
import Instructors from "./instructors";
import styles from './styles.module.css'

export default function AdminDashboard() {
  const [selectedMenu, setSelectedMenu] = useState("manageCourses");

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`${styles.bg} col-md-2 border-end text-white p-2 border-bottom`}
        
      >
        <h4 className="m-1">Admin Dashboard</h4>
       <div className={`${styles.bgTitle} p-1 border-bottom nav border-end vh-100`}>

       <ul className="flex-column w-100 nav p-2">
          <li className="nav-item my-2 w-100">
            <button
              className={`${styles.btnSide} btn btn-link text-white  ${
                selectedMenu === "manageCourses" ? "fw-bold" : ""
              }`}
              onClick={() => setSelectedMenu("manageCourses")}
            >
            <h6>Manage Courses</h6>  
            </button>
          </li>
          <li className="nav-item my-2 w-100">
            <button
              className={`${styles.btnSide} btn btn-link text-white ${
                selectedMenu === "crntCourses" ? "fw-bold" : ""
              }`}
              onClick={() => setSelectedMenu("crntCourses")}
            >
            <h6>Current Courses</h6>  
            </button>
          </li>
          <li className="nav-item my-2 w-100">
            <button
              className={`${styles.btnSide} btn btn-link text-white ${
                selectedMenu === "cmpltCourses" ? "fw-bold" : ""
              }`}
              onClick={() => setSelectedMenu("cmpltCourses")}
            >
            <h6>Completed Courses</h6>  
            </button>
          </li>
          <li className="nav-item my-2 w-100">
            <button
              className={`${styles.btnSide} btn btn-link text-white ${
                selectedMenu === "instructors" ? "fw-bold" : ""
              }`}
              onClick={() => setSelectedMenu("instructors")}
            >
            <h6>Instructors</h6>  
            </button>
          </li>
        </ul>
       </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {selectedMenu === "manageCourses" && <CourseManager />}
        {selectedMenu === "crntCourses" && <CrntCourses />}
        {selectedMenu === "cmpltCourses" && <CmpltCourses />}
        {selectedMenu === "instructors" && <Instructors />}
      </div>
    </div>
  );
}
