import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
    setExams(savedExams);
  }, []);

  return (
    <div className="container my-5">
      <h2>📋 All Exam Templates</h2>

      {exams.length === 0 ? (
        <p>No exams found. Go create one!</p>
      ) : (
        <div className="list-group">
          {exams.map((exam) => (
            <div
              key={exam.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{exam.course.name}</h5>
                <p>
                  Questions: {exam.questions.length} | Pass:{" "}
                  {exam.passPercentage}%
                </p>
              </div>
              <Link
                to={`/create-exam/${exam.id}`}
                className="btn btn-outline-secondary"
              >
                ✏️ Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
