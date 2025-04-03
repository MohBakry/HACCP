"use client";
import styles from "./styles.module.css";
import Image from "next/image";
// import event3 from "../../../src/Assets/images/event3.jpg";
import event3 from "../../../../src/Assets/images/event3.jpg";

import { useState } from "react";
const CourseVideo = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
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
          <Image
            src={event3}
            alt="Video Thumbnail"
            className={`${styles.thumbnailImage} w-100`}
            width={"100%"}
            height={100}
          />
          <div className={styles.playButton}>
            <i className="fas fa-play-circle"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideo;
