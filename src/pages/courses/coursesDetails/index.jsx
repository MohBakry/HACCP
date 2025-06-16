// import CourseVideo from "@/components/pages/courses/courseVideo";
import { useState } from "react";
import styles from "./styles.module.css";
import event3 from "../../../assets/images/event3.jpg";


const CourseDetails = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<i key={i} className="fas fa-star"></i>); // Full star
      } else if (rating >= i - 0.5) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>); // Half star
      } else {
        stars.push(<i key={i} className="far fa-star"></i>); // Empty star
      }
    }
    return stars;
  };

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);


  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <div className="container">
      <h2 className={`${styles.courseTitle} text-center mb-4`}>
        Education Software and PHP and JS System Script
      </h2>

      {/* Video or Placeholder Image */}
      <div className={`${styles.videoContainer} mb-4`}>
      {isVideoPlaying ? (
        // YouTube Video Embed
        <iframe
          className={`${styles.courseVideo} w-100`}
          src="https://www.youtube.com/watch?v=Vm7qM1wmXwE&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=9?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        // Placeholder Image with Play Button
        <div className={styles.placeholder} onClick={handlePlayVideo}>
          <img
            src={event3}
            alt="Video Thumbnail"
            className={`${styles.thumbnailImage} w-100`}
            style={{width:"100%",height:'500px'}}
          />
          <div className={styles.playButton}>
            <i className="fas fa-play-circle"></i>
          </div>
        </div>
      )}
    </div>

      {/* Course Title and Info */}
      <h5 className="text-center font-weight-bold mt-3">
        Education Software and PHP and JS System Script
      </h5>
      <div className="d-flex justify-content-between text-center p-3 border-bottom">
        <div>
          <i className="fas fa-user mr-2"></i>
          <span>Instructor</span>
          <br />
          <strong>Dr Ahmed</strong>
        </div>
        <div>
          <i className="fas fa-calendar-alt mr-2"></i>
          <span>Last Update</span>
          <br />
          <strong>1/10/2024</strong>
        </div>
        <div>
          <i className="fas fa-star mr-2"></i>
          <span>Reviews</span>
          <br />
          <strong>{renderStars(4.5)}</strong>
        </div>
      </div>

      {/* Course Details */}
      <div className="row mt-4">
        {/* Left Column */}
        <div className="col-md-8">
          <h4>About The Course</h4>
          <p>
            Repeatedly develop parallel e-markets via worldwide paradigms.
            Quickly synergize cutting-edge scenarios and professional niche.
            Assertively deliver cross-media leadership before client-centric
            results. Uniquely matrix installed base through parallel services.
          </p>
          <p>
            Professionally expedite synergistic technology through
            out-of-the-box human capital. Objectively seize client-centric
            e-services via fully researched total linkage for cross-platform
            channels.
          </p>
        </div>

        {/* Right Column */}
        <div className="col-md-4">
          <div className="card bg-light mb-3 p-3">
            <h5 className="font-weight-bold">$199</h5>
            <button className="btn btn-primary w-100">Add To Cart</button>
            <hr />
            <h6>Course Information</h6>
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-user mr-2"></i>Instructor: Dr Ahmed
              </li>
              <li>
                <i className="fas fa-clock mr-2"></i>Duration: 40 h
              </li>
              <li>
                <i className="fas fa-calendar-alt mr-2"></i>Last Update:
                1/10/2024
              </li>
              <li>
                <i className="fas fa-list-alt mr-2"></i>Quizzes: 2
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-2"></i>Location: Class
                Room
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
