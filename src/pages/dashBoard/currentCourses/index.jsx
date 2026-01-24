import React, { useState, useEffect } from "react";
import CourseCard from "../../../shared/CourseCard";
import { Button } from "react-bootstrap";
import styles from "./styles.module.css"

export default function AdminCurrentCourses() {
  const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem("courses")) || []);
    setGroups(JSON.parse(localStorage.getItem("groups")) || []);
    setInstructors(JSON.parse(localStorage.getItem("instructors")) || []);
  }, []);

  const handleEndCourse = (groupId) => {
    const activeGroups = [...groups];
    const completedGroups = JSON.parse(localStorage.getItem("completedGroups")) || [];

    const found = activeGroups.find(g => g.id === groupId);
    if (!found) return;

    const updatedActive = activeGroups.filter(g => g.id !== groupId);
    const updatedCompleted = [...completedGroups, found];

    setGroups(updatedActive);
    localStorage.setItem("groups", JSON.stringify(updatedActive));
    localStorage.setItem("completedGroups", JSON.stringify(updatedCompleted));
    alert("Course moved to Completed ✅");
  };

  if (groups.length === 0) {
    return (
      <div className="container py-4">
        <h3>No Active Courses</h3>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h3>Current Courses</h3>

      {groups.map(g => {
        const course = courses.find(c => c.id === g.courseId);
        const instructor = instructors.find(i => i.id === g.instructorId);

        if (!course) return null;

        const originalPrice = parseFloat(course.price) || 0;
        const discountedPrice = originalPrice - (originalPrice * (parseFloat(g.discount) || 0) / 100);

        return (
          <div key={g.id} className="border p-3 my-3 rounded">
            <CourseCard
              {...course}
              price={discountedPrice.toFixed(2)}
              viewMode="list"
              adminMode={false}
            />

            <div className="mt-2">
              <span className="badge bg-primary me-2">🟢 Active</span>
              <span className="badge bg-success">
                💲 {discountedPrice.toFixed(2)} (Discounted)
              </span>
              <p><strong>Instructor:</strong> {instructor?.name || "N/A"}</p>
              <p><strong>Start:</strong> {g.startDate}</p>
              <p><strong>End:</strong> {g.endDate}</p>
              <p><strong>Discount:</strong> {g.discount}%</p>

              <Button
                className={`${styles.endCourseBtn}`}
                onClick={() => handleEndCourse(g.id)}
              >
                End Course
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// import React, { useState, useEffect } from "react";

// export default function AdminCurrentCourses() {
//   const [groups, setGroups] = useState([]);
//   const [instructors, setInstructors] = useState([]);

//   useEffect(() => {
//     const savedGroups = JSON.parse(localStorage.getItem("groups")) || [];
//     const savedInstructors = JSON.parse(localStorage.getItem("instructors")) || [];
//     setGroups(savedGroups);
//     setInstructors(savedInstructors);
//   }, []);

//   const endCourse = (groupId) => {
//     const confirmed = window.confirm("End this course?");
//     if (!confirmed) return;

//     const updatedGroups = groups.filter((g) => g.id !== groupId);
//     setGroups(updatedGroups);
//     localStorage.setItem("groups", JSON.stringify(updatedGroups));

//     const completed = JSON.parse(localStorage.getItem("completedGroups")) || [];
//     const endedGroup = groups.find((g) => g.id === groupId);
//     localStorage.setItem(
//       "completedGroups",
//       JSON.stringify([...completed, endedGroup])
//     );
//   };

//   return (
//     <div className="container py-4">
//       <h3>📚 Current Courses</h3>
//       {groups.length === 0 && <p>No active groups.</p>}
//       {groups.map((group) => {
//         const instructor = instructors.find(
//           (ins) => ins.id === group.instructorId
//         );

//         return (
//           <div key={group.id} className="border p-3 mb-3">
//             <h4>{group.title}</h4>
//             <p>
//               Instructor: <strong>{instructor ? instructor.name : "N/A"}</strong>
//             </p>
//             <p>
//               Start: <strong>{group.startDate}</strong> | End:{" "}
//               <strong>{group.endDate}</strong>
//             </p>
//             <p>
//               Discount:{" "}
//               {group.discount > 0 ? `${group.discount}%` : "No discount"}
//             </p>
//             <p>Price after discount: ${group.price}</p>

//             <button
//               className="btn btn-danger btn-sm"
//               onClick={() => endCourse(group.id)}
//             >
//               End Course
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }
