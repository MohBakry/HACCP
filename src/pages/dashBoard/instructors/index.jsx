import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Badge } from "react-bootstrap";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

const fallbackImage = "https://via.placeholder.com/80";

export default function Instructors() {
  const [instructors, setInstructors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const [instructor, setInstructor] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    assignedCourses: [],
    workingHours: "",
    rate: "",
  });

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    const savedInstructors = JSON.parse(localStorage.getItem("instructors")) || [];
    setCourses(savedCourses);
    setInstructors(savedInstructors);
  }, []);

  const filteredInstructors = selectedCourse
    ? instructors.filter((i) => i.assignedCourses.includes(selectedCourse))
    : instructors;

  const openAddModal = () => {
    setInstructor({
      id: null,
      name: "",
      email: "",
      phone: "",
      profilePicture: "",
      assignedCourses: [],
      workingHours: "",
      rate: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (id) => {
    const found = instructors.find((i) => i.id === id);
    if (found) {
      setInstructor(found);
      setIsEditing(true);
      setShowModal(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstructor({ ...instructor, profilePicture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCourseAssignment = (courseId) => {
    const { assignedCourses } = instructor;
    const updated = assignedCourses.includes(courseId)
      ? assignedCourses.filter((id) => id !== courseId)
      : [...assignedCourses, courseId];
    setInstructor({ ...instructor, assignedCourses: updated });
  };

  const handleSaveInstructor = () => {
    const { name, email, phone, profilePicture, workingHours, rate } = instructor;
    if (!name || !email || !phone || !workingHours || !rate) {
      alert("All fields are required!");
      return;
    }

    let updated;
    if (isEditing) {
      updated = instructors.map((i) => (i.id === instructor.id ? instructor : i));
    } else {
      updated = [...instructors, { ...instructor, id: Date.now() }];
    }

    setInstructors(updated);
    localStorage.setItem("instructors", JSON.stringify(updated));
    setShowModal(false);
  };

  const handleDeleteInstructor = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this instructor?");
    if (!confirmDelete) return;

    const updated = instructors.filter((i) => i.id !== id);
    setInstructors(updated);
    localStorage.setItem("instructors", JSON.stringify(updated));
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Instructor Report", 10, 10);
  
    filteredInstructors.forEach((i, idx) => {
      const courseTitles = i.assignedCourses
        .map((cid) => {
          const c = courses.find((c) => c.id === cid);
          return c ? c.title : "Unknown";
        })
        .join(", ");
  
      const groupNames = i.groups?.map((g) => g.name).join(", ") || "None";
  
      doc.text(`${idx + 1}. ${i.name} (ID: ${i.id})`, 10, 20 + idx * 30);
      doc.text(`   Email: ${i.email}`, 10, 26 + idx * 30);
      doc.text(`   Courses: ${courseTitles || "None"}`, 10, 32 + idx * 30);
      doc.text(`   Groups: ${groupNames}`, 10, 38 + idx * 30);
    });
  
    doc.save("instructors_report.pdf");
  };
  

  const exportExcel = () => {
    const data = filteredInstructors.map((i) => ({
      Name: i.name,
      ID: i.id,
      Email: i.email,
      "Assigned Courses": i.assignedCourses
        .map((cid) => {
          const c = courses.find((c) => c.id === cid);
          return c ? c.title : "Unknown";
        })
        .join(", "),
      Groups: i.groups?.map((g) => g.stratDate).join(", ") || "None",
    }));
  
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Instructors");
    XLSX.writeFile(wb, "instructors_report.xlsx");
  };
  

  return (
    <div className="container py-4">
      <h2>Instructor Manager</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="primary" onClick={openAddModal}>
           Add Instructor
        </Button>
        <div className="d-flex gap-2">
          <Form.Select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
            <option value="">All Courses</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </Form.Select>
          <Button onClick={exportPDF} variant="outline-danger">📄 PDF</Button>
          <Button onClick={exportExcel} variant="outline-success">📊 Excel</Button>
        </div>
      </div>

      {filteredInstructors.map((inst) => (
        <div key={inst.id} className="border rounded p-3 mb-4">
          <div className="d-flex align-items-center gap-3">
            <img
              src={inst.profilePicture || fallbackImage}
              alt={inst.name}
              style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div>
              <h5>{inst.name} <Badge bg="secondary">ID: {inst.id}</Badge></h5>
              <p>Email: {inst.email}</p>
              <p>Phone: {inst.phone}</p>
              <p>Working Hours: {inst.workingHours} hrs</p>
              <p>Rate: ${inst.rate}/hr</p>
              <p>
                Assigned Courses:
                {inst.assignedCourses.length > 0 ? (
                  inst.assignedCourses.map((cid) => {
                    const c = courses.find((c) => c.id === cid);
                    return (
                      <Badge key={cid} bg="info" className="ms-1">
                        {c ? c.title : "Unknown"}
                      </Badge>
                    );
                  })
                ) : (
                  <span> None</span>
                )}
              </p>
              <p>📊 Estimated Earnings: ${inst.workingHours * inst.rate}</p>
            </div>
          </div>

          <div className="mt-3">
            <Button variant="warning" className="me-2" onClick={() => openEditModal(inst.id)}>
              ✏️ Edit
            </Button>
            <Button variant="danger" onClick={() => handleDeleteInstructor(inst.id)}>
              🗑️ Delete
            </Button>
          </div>
        </div>
      ))}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Instructor" : "Add New Instructor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={instructor.name}
                onChange={(e) => setInstructor({ ...instructor, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={instructor.email}
                onChange={(e) => setInstructor({ ...instructor, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                value={instructor.phone}
                onChange={(e) => setInstructor({ ...instructor, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {instructor.profilePicture && (
                <img
                  src={instructor.profilePicture}
                  alt="Preview"
                  className="mt-2"
                  style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                />
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Assign Courses</Form.Label>
              <div>
                {courses.length === 0 && <p>No courses found.</p>}
                {courses.map((c) => (
                  <Button
                    key={c.id}
                    size="sm"
                    className="m-1"
                    variant={
                      instructor.assignedCourses.includes(c.id)
                        ? "success"
                        : "outline-secondary"
                    }
                    onClick={() => toggleCourseAssignment(c.id)}
                  >
                    {instructor.assignedCourses.includes(c.id) ? "✔️" : "➕"} {c.title}
                  </Button>
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Working Hours</Form.Label>
              <Form.Control
                type="number"
                value={instructor.workingHours}
                onChange={(e) => setInstructor({ ...instructor, workingHours: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rate ($/hr)</Form.Label>
              <Form.Control
                type="number"
                value={instructor.rate}
                onChange={(e) => setInstructor({ ...instructor, rate: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveInstructor}>
            {isEditing ? "Save Changes" : "Add Instructor"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
