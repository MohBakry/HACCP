"use client";
import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import useResponsiveSizes from "@/hooks/useResponsiveSizes";

const CourseCard = ({ image, duration, title, rating, price }) => {
  const { width, height } = useResponsiveSizes([
    { minWidth: 0, maxWidth: 450, width: 400, height: 280 }, // Medium devices (landscape tablets)
    { minWidth: 450, maxWidth: 1000, width: 900, height: 200 }, // Large devices (desktops)
    { minWidth: 1000, maxWidth: 1600, width: 650, height: 200 }, // Large devices (desktops)
    { minWidth: 1600, maxWidth: Infinity, width: 800, height: 250 }, // Extra large devices (large desktops)
  ]);
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
  return (
    <div className={`${styles.card} card`}>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={title}
          className={styles.cardImage}
          width={width}
          height={height}
        />
        <div className={styles.durationBadge}>
          <i className="fas fa-clock-rotate-left"></i> {duration}
        </div>
      </div>
      <div className={`${styles.cardBody} card-body`}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <div className={` ${styles.divider}`} />

        <div className={`${styles.cardFooter} py-3 px-1`}>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(rating)}</div>
            <span className={styles.rating}>({rating})</span>
          </div>
          <div className={styles.price}>${price}</div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;