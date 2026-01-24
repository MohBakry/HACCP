import React from 'react';
import styles from './styles.module.css';
import useResponsiveSizes from '../../hooks/useResponsiveSizes';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
const CourseCard = ({
  _id,
  imageUrl,
  duration,
  title,
  rating,
  price,
  discount = 0,
  viewMode = 'grid',
  adminMode = false,
  onEdit,
  onDelete,
  onAddGroup,
  redirectTo,
}) => {
  const navigate = useNavigate();
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
    viewMode === 'grid' ? gridSizes : listSizes
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
      className={`${styles.card} ${viewMode === 'list' ? styles.listView : ''}`}
    >
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={title}
          className={styles.cardImage}
          style={{ width: width, height: height }}
        />

        {/* Duration Badge — top right corner */}
        <div className={styles.durationBadge}>
          <i className="fas fa-clock-rotate-left"></i> {duration}
        </div>

        {/* Discount Badge — left corner */}
        {discount > 0 && (
          <div
            className={styles.durationBadge}
            style={{
              left: '0.5rem',
              right: 'auto',
              background: '#dc3545',
            }}
          >
            -{discount}%
          </div>
        )}
      </div>

      <div className={`${styles.cardBody}`}>
        <div className="row">
          <Link
            to={redirectTo ? redirectTo : `/courses/${_id}`}
            className="text-decoration-none"
          >
            <div className="col">
              <h5 className={styles.cardTitle}>{title}</h5>
              <div className={styles.divider} />
            </div>
          </Link>
          {adminMode && (
            <div className="col-1">
              <div className={styles.optionsDropdown}>
                <Dropdown>
                  <Dropdown.Toggle
                    as="span"
                    className={`${styles.dropdownToggle} ${styles.cursorPointer}`}
                    // onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddGroup?.(_id);
                        navigate(
                          `/dashboard/manage-courses/${_id}/course-groups`
                        );
                      }}
                    >
                      Course Groups
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/dashboard/manage-courses/course-content/${_id}`
                        );
                      }}
                    >
                      Course Content
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(_id);
                        navigate(`/dashboard/manage-courses/edit/${_id}`);
                      }}
                    >
                      Edit Course
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="text-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete?.(_id);
                      }}
                    >
                      Remove
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
        </div>

        <div className={`${styles.cardFooter} d-flex flex-wrap w-100`}>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars(rating)}</div>
            <span className={styles.rating}>({rating})</span>
          </div>

          <div
            className={`${viewMode === 'list' ? 'w-100 w-md-auto py-2' : ''} ${
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
      </div>
    </div>
  );

  return <>{cardContent}</>;
};

export default CourseCard;
