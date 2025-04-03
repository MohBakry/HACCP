"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import CourseCard from "@/components/shared/CourseCard";

export default function CoursesView({ data }) {
  const [viewMode, setViewMode] = useState("grid");
  return (
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
        {data.map((course, index) => (
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
  );
}
