import React, { useState, useEffect } from "react";
import CourseCard from "../../../shared/CourseCard";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css"

export default function AdminCompletedCourses() {
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setGroups(JSON.parse(localStorage.getItem("completedGroups")) || []);
    setInstructors(JSON.parse(localStorage.getItem("instructors")) || []);
  }, []);

  const handleRestore = (groupId) => {
    const completedGroups = [...groups];
    const activeGroups = JSON.parse(localStorage.getItem("groups")) || [];

    const found = completedGroups.find(g => g.id === groupId);
    if (!found) return;

    const updatedCompleted = completedGroups.filter(g => g.id !== groupId);
    const updatedActive = [...activeGroups, found];

    setGroups(updatedCompleted);
    localStorage.setItem("completedGroups", JSON.stringify(updatedCompleted));
    localStorage.setItem("groups", JSON.stringify(updatedActive));
    alert("Group restored to active courses ✅");
  };

  const exportToCSV = () => {
    if (groups.length === 0) {
      alert("No completed courses to export.");
      return;
    }

    const headers = ["Course Title", "Instructor", "Start Date", "End Date", "Discount"];
    const rows = groups.map(g => {
      const course = courses.find(c => c.id === g.courseId);
      const instructor = instructors.find(i => i.id === g.instructorId);
      return [
        course?.title || "N/A",
        instructor?.name || "N/A",
        g.startDate,
        g.endDate,
        `${g.discount}%`
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "Completed_Courses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (groups.length === 0) {
    return (
      <div className="container py-4">
        <h3>No Completed Courses</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3>Completed Courses</h3>
      <Button className={`${styles.exportBtn}  my-2`} onClick={exportToCSV}>
         Export Report
      </Button>

      {groups.map(g => {
        const course = courses.find(c => c.id === g.courseId);
        const instructor = instructors.find(i => i.id === g.instructorId);

        return (
          <div key={g.id} className="border p-3 my-3 rounded">
            <CourseCard {...course} viewMode="list" adminMode={false} />
            <div className="mt-2">
              <span className="badge bg-success">✅ Completed</span>
              <p><strong>Instructor:</strong> {instructor?.name || "N/A"}</p>
              <p><strong>Start:</strong> {g.startDate}</p>
              <p><strong>End:</strong> {g.endDate}</p>
              <p><strong>Discount:</strong> {g.discount}%</p>

              <Button
                className={`${styles.restoreBtnnpm}`}
                onClick={() => handleRestore(g.id)}
              >
                Restore to Active
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
