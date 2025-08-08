//
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Courses from "../courses";
import CourseCard from "../../shared/CourseCard";
import CompletedCourses from "../courses/copmletedCourses";

export default function RecommendedCourses() {
  return (
    <div className="d-flex">
      <div>
        <h2>Recommended Courses</h2>
        <CompletedCourses />
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">JavaScript Mastery</h5>
            <p className="card-text text-success">Completed</p>
          </div>
        </div>
        {/* Add more completed courses */}
      </div>
    </div>
  );
}
