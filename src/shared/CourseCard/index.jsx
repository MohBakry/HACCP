import React from "react";
import styles from "./styles.module.css";
import useResponsiveSizes from "../../hooks/useResponsiveSizes";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  image,
  duration,
  title,
  rating,
  price,
  discount = 0,
  viewMode = "grid",
  adminMode = true,
  onEdit,
  onDelete,
  redirectTo,
}) => {
  const gridSizes = [
    { minWidth: 0, maxWidth: 450, width: 400, height: 280 },
    { minWidth: 450, maxWidth: 1000, width: 900, height: 200 },
    { minWidth: 1000, maxWidth: 1600, width: 650, height: 200 },
    { minWidth: 1600, maxWidth: Infinity, width: 800, height: 250 },
  ];
  const listSizes = [
    { minWidth: 0, maxWidth: 450, width: 130, height: 180 },
    { minWidth: 450, maxWidth: 1000, width: 250, height: 200 },
    { minWidth: 1000, maxWidth: 1600, width: 350, height: 200 },
    { minWidth: 1600, maxWidth: Infinity, width: 400, height: 250 },
  ];
  const { width, height } = useResponsiveSizes(
    viewMode === "grid" ? gridSizes : listSizes
  );

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

  const finalPrice =
    discount > 0 ? (price * (1 - discount / 100)).toFixed(2) : price;

  const cardContent = (
    <div
      className={`${styles.card} ${viewMode === "list" ? styles.listView : ""}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={title}
          className={styles.cardImage}
          style={{ width: width, height: height }}
        />

        {/* Duration Badge — right corner */}
        <div className={styles.durationBadge}>
          <i className="fas fa-clock-rotate-left"></i> {duration}
        </div>

        {/* Discount Badge — left corner */}
        {discount > 0 && (
          <div
            className={styles.durationBadge}
            style={{
              left: "0.5rem",
              right: "auto",
              background: "#dc3545",
            }}
          >
            -{discount}%
          </div>
        )}
      </div>

      <div className={`${styles.cardBody}`}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <div className={styles.divider} />

        <div className={`${styles.cardFooter} d-flex flex-wrap w-100`}>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(rating)}</div>
            <span className={styles.rating}>({rating})</span>
          </div>

          <div
            className={`${viewMode === "list" ? "w-100 w-md-auto py-2" : ""} ${
              styles.price
            }`}
          >
            {discount > 0 ? (
              <>
                <span className="text-muted text-decoration-line-through me-2">
                  ${price}
                </span>
                <span>${finalPrice}</span>
              </>
            ) : (
              <>${price}</>
            )}
          </div>
        </div>

        {adminMode && (
          <div className="mt-2">
            <button
              className="btn btn-sm btn-outline-warning me-2"
              onClick={() => onEdit?.(id)}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete?.(id)}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Link
      to={redirectTo ? redirectTo : `/courses/${id}`}
      className="text-decoration-none"
    >
      {console.log(redirectTo, "redirectTo")}
      {cardContent}
    </Link>
  );
};

export default CourseCard;
