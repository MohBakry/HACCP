import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Header from "../../shared/header";
import img from "../../assets/images/About.png";
import CourseCard from "../../shared/CourseCard";

export default function Courses() {
  const [groups, setGroups] = useState([]);
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setGroups(savedGroups);
    setCourses(savedCourses);
  }, []);

  return (
    <div>
      <Header img={img} title="Courses" />

      <div className="py-3 py-md-5">
        <div className={`${styles.container} py-3`}>
          <div className="d-flex gap-3 flex-wrap flex-col-reverse ">
            <span className={`${styles.courseCount} w-100 col-md`}>
              <strong>{groups.length}</strong> Courses
            </span>

            <div className={`${styles.viewToggle} w-100 col-md`}>
              <button
                className={`${styles.viewButton} ${viewMode === "grid" ? styles.active : ""} px-0`}
                onClick={() => setViewMode("grid")}
              >
                <i className="fa fa-th-large" aria-hidden="true"></i> Grid
              </button>

              <button
                className={`${styles.viewButton} ${viewMode === "list" ? styles.active : ""} px-3`}
                onClick={() => setViewMode("list")}
              >
                <i className="fa fa-list" aria-hidden="true"></i> List
              </button>
            </div>
          </div>
        </div>

        <div className={`p-2 p-lg-5 container row mx-auto`}>
          {groups.map((group) => {
            const course = courses.find((c) => c.id === group.courseId);
            if (!course) return null;

            const originalPrice = parseFloat(course.price) || 0;
            const discountedPrice = originalPrice - (originalPrice * (parseFloat(group.discount) || 0) / 100);

            return (
              <div
                key={group.id}
                className={` ${viewMode === "grid" ? "col-12 col-md-6 col-lg-4" : "col-12"} my-3`}
              >
                <CourseCard
                  id={group.id}
                  image={course.image}
                  duration={course.duration}
                  title={course.title}
                  rating={course.rating}
                  price={discountedPrice.toFixed(2)}
                  viewMode={viewMode}
                  introVideo={course.introVideo}
                />

                <div className="mt-1">
                  <span className="badge bg-success">
                    💲 {discountedPrice.toFixed(2)} after {group.discount}% OFF
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
