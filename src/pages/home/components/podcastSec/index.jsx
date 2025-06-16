"use client";
import React from "react";
// import Image from "next/image";
import styles from "./styles.module.css";
import pod from "../../../../assets/images/pod.jpg";
import useResponsiveSizes from "../../../../hooks/useResponsiveSizes";

const PodcastSection = () => {
  const { width, height } = useResponsiveSizes([
    { minWidth: 0, maxWidth: 450, width: 450, height: 300 }, // Medium devices (landscape tablets)
    { minWidth: 450, maxWidth: 922, width: 930, height: 300 }, // Large devices (desktops)
    { minWidth: 922, maxWidth: 1600, width: 650, height: 350 }, // Large devices (desktops)
    { minWidth: 1600, maxWidth: Infinity, width: 950, height: 350 }, // Extra large devices (large desktops)
  ]);
  return (
    <section className={`${styles.podcastSection} position-relative`}>
      <div className="d-flex justify-content-center align-items-center">
        {/* Text Section */}
        <div className="d-none d-lg-flex w-0 col-lg d-flex justify-content-center text-center text-md-start">
          <div className="d-flex flex-wrap px-5 ">
            <p className={`${styles.followText} w-100`}>Follow</p>
            <div
              className={`${styles.podcastTitle} w-100 flex-wrap justify-content-center`}
            >
              <div className="d-flex w-100 justify-content-center">
                <i className={`fa-solid fa-headphones ${styles.icon}`}></i>
              </div>
              <h3>HACCP Podcast</h3>
            </div>
            <p
              className={`${styles.description} d-flex w-100 justify-content-end`}
            >
              To Know More....
            </p>
          </div>
        </div>
        {/* Image Section */}
        <div className="w-100 col-lg d-flex justify-content-end">
          <img
            src={pod} // replace with actual path
            alt="Podcast Image"
            style={{width:width,height:height}}
            className={`${styles.podcastImage}`}
          />
          {/* Overlay Text for Small Devices */}
          <div
            className={`d-lg-none ${styles.overlayText} d-flex flex-wrap justify-content-center align-items-center`}
          >
            <p className={`${styles.followText} w-100`}>Follow</p>
            <div
              className={`${styles.podcastTitle} w-100 flex-wrap justify-content-center`}
            >
              <div className="d-flex w-100 justify-content-center">
                <i className={`fa-solid fa-headphones ${styles.icon}`}></i>
              </div>
              <h3>HACCP Podcast</h3>
            </div>

            <p className={styles.description}>To Know More....</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
