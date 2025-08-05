import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './styles.module.css'

// ✅ Example lectures
const lecturesData = [
  {
    topic:"Topic 1 (Course Introduction)",
    title: "Lecture 1",
    image: "https://via.placeholder.com/400x200?text=Lecture+1",
    resources: [
      {
        name: "Lecture Recording",
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        name: "Lecture PDF",
        type: "pdf",
        src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        name: "Assignment",
        type: "assignment",
      },
    ],
  },
  {
    topic:"Topic 2 (Chapter 1 Part-1)",
    title: "Lecture 2",
    image: "https://via.placeholder.com/400x200?text=Lecture+2",
    resources: [
      {
        name: "Lecture Recording",
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        name: "Lecture PDF",
        type: "pdf",
        src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        name: "Assignment",
        type: "assignment",
      },
    ],
  },
  {
    topic:"Topic 2 (Chapter 1 Part-2)",
    title: "Lecture 3",
    image: "https://via.placeholder.com/400x200?text=Lecture+2",
    resources: [
      {
        name: "Lecture Recording",
        type: "video",
        src: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        name: "Lecture PDF",
        type: "pdf",
        src: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      },
      {
        name: "Assignment",
        type: "assignment",
      },
    ],
  },
];

export default function CourseContent() {
  const [completed, setCompleted] = useState(
    lecturesData.map(() => [false, false, false])
  );
  const [unlockedLectures, setUnlockedLectures] = useState([
    true,
    ...lecturesData.slice(1).map(() => false),
  ]);
  const [startedLectures, setStartedLectures] = useState([
    false,
    ...lecturesData.slice(1).map(() => false),
  ]);
  const [collapseStates, setCollapseStates] = useState(
    lecturesData.map(() => false)
  );

  const [modalData, setModalData] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("completed");
    const savedUnlocked = localStorage.getItem("unlockedLectures");
    const savedStarted = localStorage.getItem("startedLectures");
    const savedCollapse = localStorage.getItem("collapseStates");
    const savedUploads = localStorage.getItem("uploadedFiles");

    if (savedCompleted) setCompleted(JSON.parse(savedCompleted));
    if (savedUnlocked) setUnlockedLectures(JSON.parse(savedUnlocked));
    if (savedStarted) setStartedLectures(JSON.parse(savedStarted));
    if (savedCollapse) setCollapseStates(JSON.parse(savedCollapse));
    if (savedUploads) setUploadedFiles(JSON.parse(savedUploads));
  }, []);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
    localStorage.setItem("unlockedLectures", JSON.stringify(unlockedLectures));
    localStorage.setItem("startedLectures", JSON.stringify(startedLectures));
    localStorage.setItem("collapseStates", JSON.stringify(collapseStates));
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [completed, unlockedLectures, startedLectures, collapseStates, uploadedFiles]);

  const isLectureDone = (lectureIndex) =>
    completed[lectureIndex].every((item) => item);

  const handleCheckboxChange = (lectureIndex, resourceIndex) => {
    const updated = [...completed];
    updated[lectureIndex][resourceIndex] = !updated[lectureIndex][resourceIndex];
    setCompleted(updated);

    if (
      updated[lectureIndex].every((item) => item) &&
      lectureIndex < lecturesData.length - 1
    ) {
      const next = [...unlockedLectures];
      next[lectureIndex + 1] = true;
      setUnlockedLectures(next);
    }
  };

  const toggleCollapse = (lectureIndex) => {
    const updated = [...collapseStates];
    updated[lectureIndex] = !updated[lectureIndex];
    setCollapseStates(updated);
  };

  const handleStartLecture = (lectureIndex) => {
    const updated = [...startedLectures];
    updated[lectureIndex] = true;
    setStartedLectures(updated);
  };

  const handleResourceClick = (resource) => {
    setModalData(resource);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const handleAssignmentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newUpload = {
        name: file.name,
        date: new Date().toLocaleString(),
        // Fake download URL for demo:
        url: URL.createObjectURL(file),
      };
      setUploadedFiles([...uploadedFiles, newUpload]);
      alert(`File "${file.name}" uploaded!`);
    }
  };

  const doneCount = completed.filter((c) => c.every((i) => i)).length;
  const totalCount = lecturesData.length;
  const allDone = doneCount === totalCount;
  const totalProgress = Math.round((doneCount / totalCount) * 100);

  return (
    <div className="container my-5">
      {/* ✅ Course Details */}
      <div className="mb-4 p-4 bg-light rounded shadow-sm">
        <h3 className={styles.titleText}> Course: Modern React E-Learning</h3>
        <p> Instructor: Dr. Yassin Mohamed</p>
        <p> Start Date: 1st August 2025</p>
        <p> Group ID: G-12345</p>
      </div>

      <div className="mb-4">
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            style={{ width: `${totalProgress}%` }}
          >
            {totalProgress}%
          </div>
        </div>
      </div>

      {lecturesData.map((lecture, lectureIndex) => {
        const unlocked = unlockedLectures[lectureIndex];
        const started = startedLectures[lectureIndex];
        const done = isLectureDone(lectureIndex);
        const lectureProgress = Math.round(
          (completed[lectureIndex].filter(Boolean).length /
            lecture.resources.length) *
            100
        );

        return (
          <div
            key={lectureIndex}
            className={`mb-4  p-2 border ${
              done ? "border-success" : unlocked ? "border-secondary" : "border-secondary"
            } rounded`}
          >
            <div className="row p-4 d-flex  justify-content-between">
              <div className={`${styles.lTitle} p-5 col-md-3 d-flex justify-content-center align-items-center `}>
                {/* <img
                  src={lecture.image}
                  alt={lecture.title}
                  className="img-fluid rounded"
                  style={{ objectFit: "cover", width: "100%" }}
                /> */}
                <div >
                  <h3>{lecture.title}</h3>
                </div>
              </div>
              <div className="col-md-8  py-2">
                <h5 className="d-flex  justify-content-between align-items-center">
                  <span className={styles.titleText}>{lecture.topic}</span>
                  {done && <span className="badge bg-success">Done</span>}
                </h5>

                {unlocked && (
                  <button
                    className="btn btn-light p-1 "
                    onClick={() => toggleCollapse(lectureIndex)}
                  >
                    {collapseStates[lectureIndex] ? "Hide Details -" : "Show Details +"}
                  </button>
                )}

                <div
                  className={`collapse ${collapseStates[lectureIndex] ? "show" : ""}`}
                >
                  <div className="mt-3">
                    {!started ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleStartLecture(lectureIndex)}
                      >
                        Start Lecture
                      </button>
                    ) : (
                      <>
                        <div className="mb-2">
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: `${lectureProgress}%` }}
                            >
                              {lectureProgress}%
                            </div>
                          </div>
                        </div>
                        <ul className="list-group">
                          {lecture.resources.map((resource, resourceIndex) => (
                            <li
                              key={resourceIndex}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleResourceClick(resource)}
                              >
                                 {resource.name}
                              </button>
                              <input
                                type="checkbox"
                                checked={completed[lectureIndex][resourceIndex]}
                                onChange={() =>
                                  handleCheckboxChange(lectureIndex, resourceIndex)
                                }
                              />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* ✅ Exam tab when all done */}
      {allDone && (
  <div className="p-4 border border-warning rounded bg-light text-center">
    <h4>🎓 Congratulations! All lectures complete.</h4>
    <a href="/exam" className="btn btn-success">
      Take Exam
    </a>
  </div>
)}


      {/* ✅ Custom Modal */}
      {modalData && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalData.name}</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {modalData.type === "video" && (
                  <video
                    src={modalData.src}
                    controls
                    style={{ width: "100%" }}
                  />
                )}

                {modalData.type === "pdf" && (
                  <>
                    <iframe
                      src={modalData.src}
                      title="PDF Viewer"
                      style={{ width: "100%", height: "500px" }}
                    ></iframe>
                    <a
                      href={modalData.src}
                      download
                      className="btn btn-primary mt-3"
                    >
                      Download PDF
                    </a>
                  </>
                )}

                {modalData.type === "assignment" && (
                  <>
                    <p>Upload your assignment:</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleAssignmentUpload}
                    />
                    {uploadedFiles.length > 0 && (
                      <div className="mt-3">
                        <h6>📄 My Uploaded Files:</h6>
                        <ul>
                          {uploadedFiles.map((file, index) => (
                            <li key={index} className="mb-2">
                              {file.name} — {file.date}
                              <br />
                              <a
                                href={file.url}
                                download={file.name}
                                className="btn btn-sm btn-outline-secondary mt-1"
                              >
                                Download
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
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
