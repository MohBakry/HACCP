import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from './styles.module.css';
import img from '../../../assets/images/profile.png'
import {
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBriefcase,
  FaUserGraduate,
  FaIdBadge,
  FaInfoCircle,
} from "react-icons/fa";


export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    gender: "Male",
    job: "Frontend Developer",
    title: "Student",
    studentId: "ST123456",
    bio: "Passionate about building clean user interfaces.",
    image: "https://via.placeholder.com/150" // default image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Saved:", user);
    // Here you would save to your server
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUser({ ...user, image: imageUrl });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="  my-3  d-flex shadow"
        style={{
          width:'100%',
          borderColor: "#0d3b66",
          borderWidth: "2px"
        }}
      >
        <div className="text-center col-md-4 mb-4">
          <img
            src={img}
            alt="Profile"
            className="rounded-circle mb-3"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          {isEditing && (
            <div className="mb-3">
              <label
                htmlFor="imageUpload"
                className="form-label"
                style={{ color: "#0d3b66", fontWeight: "bold" }}
              >
                Change Photo
              </label>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
          )}
          <h2 style={{ color: "#0d3b66" }}>{user.name}</h2>
          <p style={{ color: "#83c7d0" }}>{user.title}</p>
        </div>

        {isEditing ? (
         <div className=" col-md-6 p-2">
           <form onSubmit={handleSave}>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                name="name"
                className="form-control"
                value={user.name}
                onChange={handleChange}
                required
              />
            </div>
           
            <div className="mb-2">
              <label className="form-label">Phone</label>
              <input
                name="phone"
                className="form-control"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                className="form-select"
                value={user.gender}
                onChange={handleChange}
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Job</label>
              <input
                name="job"
                className="form-control"
                value={user.job}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-control"
                value={user.title}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Student ID</label>
              <input
                name="studentId"
                className="form-control"
                value={user.studentId}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                value={user.bio}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#0d3b66", color: "#fff" }}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={handleEditToggle}
            >
              Cancel
            </button>
          </form>
          </div>
        ) : (
          <div className={`${styles.bgTitle} border-bottom p-3 col-md-6`} >
            <div className={`${styles.item} ${styles.email}`}>
            <p>
            <FaEnvelope className={styles.icon} />
              <strong>Email:</strong> {user.email}
            </p>
            </div>
           <div className={`${styles.item} ${styles.phone}`}>
           <p>
           
           <FaPhone className={styles.icon} />
              <strong>Phone:</strong> {user.phone}
            </p>
           </div>
            <div className={`${styles.item} ${styles.gender}`}>
            <p>
            <FaVenusMars className={styles.icon} />
              <strong>Gender:</strong> {user.gender}
            </p>
            </div>
            <div className={`${styles.item} ${styles.job}`}>
            <p>
            <FaBriefcase className={styles.icon} />
              <strong>Job:</strong> {user.job}
            </p>
            </div>
           <div className={`${styles.item}  ${styles.title}`}>
           <p>
           <FaUserGraduate className={styles.icon} />
              <strong>Title:</strong> {user.title}
            </p>
           </div>
            <div className={`${styles.item} ${styles.studentId}`}>
            <p>
            <FaIdBadge className={styles.icon} />
              <strong>Student ID:</strong> {user.studentId}
            </p>
            </div>
            <div>
            <p>
            <FaInfoCircle className={styles.icon} />
              <strong>Bio:</strong> {user.bio}
            </p>
            </div>
            <button
              className="btn"
              style={{ backgroundColor: "#83c7d0", color: "#0d3b66" }}
              onClick={handleEditToggle}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


