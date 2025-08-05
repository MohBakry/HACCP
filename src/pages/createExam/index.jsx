import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateExam() {
  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctIndex: 0,
  });
  const [passPercentage, setPassPercentage] = useState(50);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  const courses = [
    { id: "course1", name: "React Basics" },
    { id: "course2", name: "Advanced JavaScript" },
    { id: "course3", name: "CSS Masterclass" },
  ];

  // Load existing exam if editing
  useEffect(() => {
    if (examId) {
      const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
      const exam = savedExams.find((e) => e.id.toString() === examId);
      if (exam) {
        setQuestions(exam.questions);
        setPassPercentage(exam.passPercentage);
        setSelectedCourse(exam.course);
      }
    }
  }, [examId]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const addQuestion = () => {
    if (
      currentQuestion.question.trim() &&
      currentQuestion.options.every((opt) => opt.trim())
    ) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctIndex: 0,
      });
    } else {
      alert("Please fill in the question and all options.");
    }
  };

  const handleSaveExam = () => {
    if (!selectedCourse) {
      alert("Please select a course!");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question.");
      return;
    }

    const newExam = {
      id: examId ? parseInt(examId) : Date.now(),
      course: selectedCourse,
      questions,
      passPercentage,
    };

    const savedExams =
      JSON.parse(localStorage.getItem("exams")) || [];

    if (examId) {
      // Edit mode: replace old exam
      const updatedExams = savedExams.map((e) =>
        e.id.toString() === examId ? newExam : e
      );
      localStorage.setItem("exams", JSON.stringify(updatedExams));
    } else {
      // Create mode: add new exam
      savedExams.push(newExam);
      localStorage.setItem("exams", JSON.stringify(savedExams));
    }

    alert("✅ Exam saved!");
  };

  return (
    <div className="container my-5">
      <h2>📚 {examId ? "Edit Exam" : "Create New Exam"}</h2>

      <button
        className="btn btn-secondary mb-3"
        onClick={() => setShowCourseModal(true)}
      >
        {selectedCourse
          ? `Course: ${selectedCourse.name}`
          : "Select Course"}
      </button>

      <div className="mb-4">
        <label className="form-label">Pass Percentage (%)</label>
        <input
          type="number"
          className="form-control"
          value={passPercentage}
          onChange={(e) => setPassPercentage(e.target.value)}
          min={0}
          max={100}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Question</label>
        <input
          type="text"
          className="form-control"
          value={currentQuestion.question}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, question: e.target.value })
          }
        />
      </div>

      <div className="mb-4">
        {currentQuestion.options.map((opt, idx) => (
          <div key={idx} className="mb-2">
            <label className="form-label">Option {idx + 1}</label>
            <input
              type="text"
              className="form-control"
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="form-label">Correct Option</label>
        <select
          className="form-select"
          value={currentQuestion.correctIndex}
          onChange={(e) =>
            setCurrentQuestion({
              ...currentQuestion,
              correctIndex: parseInt(e.target.value),
            })
          }
        >
          <option value={0}>Option 1</option>
          <option value={1}>Option 2</option>
          <option value={2}>Option 3</option>
          <option value={3}>Option 4</option>
        </select>
      </div>

      <button className="btn btn-primary me-2" onClick={addQuestion}>
        ➕ Add Question
      </button>

      <button
        className="btn btn-success"
        onClick={handleSaveExam}
        disabled={!selectedCourse || questions.length === 0}
      >
        💾 Save Exam
      </button>

      {questions.length > 0 && (
        <div className="mt-5">
          <h4>✅ Questions:</h4>
          <ol>
            {questions.map((q, i) => (
              <li key={i}>
                {q.question} — Correct: Option {q.correctIndex + 1}
              </li>
            ))}
          </ol>
        </div>
      )}

      {showCourseModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Course</h5>
              </div>
              <div className="modal-body">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    className="btn btn-outline-primary w-100 mb-2"
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseModal(false);
                    }}
                  >
                    {course.name}
                  </button>
                ))}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCourseModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
