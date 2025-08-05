import React,{useState} from "react";
import styles from "./styles.module.css"
// import img from "../../assets/images/About.png";

import event1 from "../../../assets/images/event1.jpg";
import event2 from "../../../assets/images/event2.jpg";
import event3 from "../../../assets/images/event3.jpg";
import CourseCard from "../../../shared/CourseCard";

export default function CurrentCourses() {
  const courses = [
 
    {
      id: 2,
      image: event2,
      duration: "54h",
      title: "Advanced Android 12 & Kotlin Development Course",
      rating: 4.5,
      price: 299,
    },
  
    
  ];
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div>
      
    <div className="py-3 py-md-5">
      <div className={`${styles.container} py-3`}>
        <div className="d-flex gap-3 flex-wrap flex-col-reverse ">
          <span className={`${styles.courseCount} w-100 col-md`}>
             Current Courses
          </span>

          <div className={`${styles.viewToggle} w-100 col-md`}>
            <button
              className={`${styles.viewButton} ${
                viewMode === "grid" ? styles.active : ""
              } px-0`}
              onClick={() => setViewMode("grid")}
            >
              <i className="fa fa-th-large" aria-hidden="true"></i> Grid
            </button>

            <button
              className={`${styles.viewButton} ${
                viewMode === "list" ? styles.active : ""
              } px-3`}
              onClick={() => setViewMode("list")}
            >
              <i className="fa fa-list" aria-hidden="true"></i> List
            </button>
          </div>
        </div>
        <div className={`${styles.filterDropdown} align-items-start`}>
          <select>
            <option>All</option>
            <option>Popular</option>
            <option>Newest</option>
          </select>
        </div>
      </div>
      <div
        className={`${
          viewMode === "list" ? "" : ""
        } p-2 p-lg-5 container row mx-auto`}
      >
        {/* <div className={` `}> */}
        {courses.map((course, index) => (
          <div
            key={index}
            className={` ${
              viewMode === "grid" ? "col-12 col-md-6 col-lg-4" : "col-12"
            } my-3`}
          >
            <CourseCard
              id={course.id}
              image={course.image}
              duration='In Progress'
              title={course.title}
              rating={course.rating}
              
              viewMode={viewMode}
            />
 
          <div className="progress">
           
                    <div className="progress-bar" style={{ width: '60%' }}>60%</div>
                  </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
    </div>
  );
}
