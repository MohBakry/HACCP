import React,{useState} from "react";
import styles from "./styles.module.css"
import Header from "../../shared/header";
import img from "../../assets/images/About.png";

import event1 from "../../assets/images/event1.jpg";
import event2 from "../../assets/images/event2.jpg";
import event3 from "../../assets/images/event3.jpg";
import CourseCard from "../../shared/CourseCard";

export default function Courses() {
  const courses = [
    {
      id: 1,
      image: event1, // Replace with actual image paths
      duration: "23h",
      title: "Education Software and PHP and JS System Script",
      rating: 4.5,
      price: 199,
    },
    {
      id: 2,
      image: event2,
      duration: "54h",
      title: "Advanced Android 12 & Kotlin Development Course",
      rating: 4.5,
      price: 299,
    },
    {
      id: 3,
      image: event3,
      duration: "23h",
      title: "Learn Figma – UI/UX Design Essential Training",
      rating: 2.5,
      price: 199,
    },
    {
      id: 4,
      image: event1,
      duration: "23h",
      title: "The complete business plan course",
      rating: 3.5,
      price: 199,
    },
    {
      id: 3,
      image: event3,
      duration: "23h",
      title: "Learn Figma – UI/UX Design Essential Training",
      rating: 2.5,
      price: 199,
    },
    {
      id: 4,
      image: event1,
      duration: "23h",
      title: "The complete business plan course",
      rating: 3.5,
      price: 199,
    },

    {
      id: 7,
      image: event2,
      duration: "54h",
      title: "Advanced Android 12 & Kotlin Development Course",
      rating: 4.5,
      price: 299,
    },
    {
      id: 8,
      image: event1, // Replace with actual image paths
      duration: "23h",
      title: "Education Software and PHP and JS System Script",
      rating: 4.5,
      price: 199,
    },
  ];
  const [viewMode, setViewMode] = useState("grid");
  return (
    <div>
      <Header img={img} title="Courses" />
      
    <div className="py-3 py-md-5">
      <div className={`${styles.container} py-3`}>
        <div className="d-flex gap-3 flex-wrap flex-col-reverse ">
          <span className={`${styles.courseCount} w-100 col-md`}>
            <strong>10</strong> Courses
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
              duration={course.duration}
              title={course.title}
              rating={course.rating}
              price={course.price}
              viewMode={viewMode}
            />
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
    </div>
  );
}
