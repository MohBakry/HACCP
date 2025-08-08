import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CurrentCourses from "../courses/currentCourses";
import styles from "./styles.module.css";

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <div className="d-flex ">
      <div className="flex-grow-1 col-9 p-4">
        <h2 className="mb-4">My Courses</h2>

        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`${styles.btnCnt} nav-link ${
                activeTab === "current" ? "active" : ""
              }`}
              onClick={() => setActiveTab("current")}
            >
              <h6 className="p-2">Current Courses</h6>
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`${styles.btnCnt} nav-link ${
                activeTab === "completed" ? "active" : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              <h6 className="p-2">Completed Courses</h6>
            </button>
          </li>
        </ul>

        {activeTab === "current" ? (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <CurrentCourses />
                </div>
              </div>
            </div>
            {/* Add more current courses */}
          </div>
        ) : (
          <div className="row">
            <div className="col-md-12 mb-4">
              <div className="card shadow-sm bg-light">
                <div className="card-body">
                  {/* <h5 className="card-title">JavaScript Mastery</h5> */}

                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">JavaScript Mastery</h5>
                      <p className="card-text text-success">Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more completed courses */}
          </div>
        )}
      </div>
    </div>
  );
}
