import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";

const CourseDetails = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [course, setCourse] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const groups = JSON.parse(localStorage.getItem("groups")) || [];
    const courses = JSON.parse(localStorage.getItem("courses")) || [];
    const instructors = JSON.parse(localStorage.getItem("instructors")) || [];

    const foundGroup = groups.find((g) => String(g.id) === id);
    if (foundGroup) {
      setGroup(foundGroup);
      const foundCourse = courses.find((c) => c.id === foundGroup.courseId);
      setCourse(foundCourse);
      const foundInstructor = instructors.find((i) => i.id === foundGroup.instructorId);
      setInstructor(foundInstructor);
    }
  }, [id]);

  const handlePlayVideo = () => setIsVideoPlaying(true);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }
    return stars;
  };

  if (!group || !course) return <div className="container py-5">Loading...</div>;

  return (
    <div className="container">
      <h2 className={`${styles.courseTitle} text-center m-4`}>
        {course.title}
      </h2>

      <div className="d-flex justify-content-center">
        <div className={`${styles.videoContainer} mb-4 w-75`}>
          {isVideoPlaying ? (
            <iframe
              className={`${styles.courseVideo} w-100`}
              src={course.introVideo}
              title="Course Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div
              className={`${styles.placeholder} p-4`}
              onClick={handlePlayVideo}
            >
              <img
                src={course.image}
                alt="Video Thumbnail"
                className={`${styles.thumbnailImage} w-100`}
                style={{ width: "100%", height: "500px" }}
              />
              <div className={styles.playButton}>
                <i className="fas fa-play-circle"></i>
              </div>
            </div>
          )}
        </div>
      </div>

      <h5 className="text-center font-weight-bold mt-3">{course.title}</h5>
      <div className="d-flex justify-content-between text-center p-3 border-bottom">
        <div>
          <i className="fas m-2 fa-user mr-2"></i>
          <span>Instructor</span>
          <br />
          <strong>{instructor ? instructor.name : "N/A"}</strong>
        </div>
        <div>
          <i className="fas m-2 fa-calendar-alt mr-2"></i>
          <span>Start Date</span>
          <br />
          <strong>{group.startDate || "N/A"}</strong>
        </div>
        <div>
          <i className="fas m-2 fa-star mr-2"></i>
          <span>Reviews</span>
          <br />
          <strong>{renderStars(course.rating)}</strong>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-8">
          <h4>About The Course</h4>
          <p>{course.description}</p>
        </div>

        <div className="col-md-4">
          <div className="card bg-light mb-3 p-3">
            <h5 className="font-weight-bold">${course.price}</h5>
            <button className="btn btn-primary w-100">Add To Cart</button>
            <hr />
            <h6>Course Information</h6>
            <ul className="list-unstyled">
              <li>
                <i className="fas m-2 fa-user mr-2"></i>Instructor:{" "}
                {instructor ? instructor.name : "N/A"}
              </li>
              <li>
                <i className="fas m-2 fa-clock mr-2"></i>Duration:{" "}
                {course.duration} h
              </li>
              <li>
                <i className="fas m-2 fa-calendar-alt mr-2"></i>Start Date:{" "}
                {group.startDate || "N/A"}
              </li>
              <li>
                <i className="fas m-2 fa-list-alt mr-2"></i>Quizzes: 2
              </li>
              <li>
                <i className="fas m-2 fa-map-marker-alt mr-2"></i>Location: Class Room
              </li>
            </ul>
            <hr />
            <h6>Material Includes</h6>
            <ul className="list-unstyled">
              <li>4 hours on-demand video</li>
              <li>7 articles</li>
              <li>4 downloadable resources</li>
              <li>Full lifetime access on mobile and TV</li>
              <li>Certificate of Completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
