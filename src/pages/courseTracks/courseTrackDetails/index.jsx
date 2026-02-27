import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { getPublishedCourseTrackDetails } from '../../../Redux/courseTracks/courseTracks.service';
import styles from './styles.module.css';

export default function CourseTrackDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { trackDetails, loading } = useSelector((state) => state.courseTracks);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getPublishedCourseTrackDetails(id));
    }
  }, [id, dispatch]);

  if (loading.getPublishedCourseTrackDetails) {
    return <LoadingSpinner />;
  }

  if (!trackDetails) {
    return (
      <div className="container py-5 text-center">
        <p>Diploma program not found.</p>
      </div>
    );
  }

  const sortedCourses = [...(trackDetails.courses || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const toggleCourse = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  return (
    <div>
      <Header
        img={
          trackDetails.imageUrl || trackDetails.courses?.[0]?.courseId?.imageUrl
        }
        title={trackDetails.name}
      />

      <div className="container py-5">
        {/* Track Description */}
        <div className="row mb-5">
          <div className="col-12">
            <div className={styles.trackHeader}>
              <h3 className="mb-3" style={{ color: '#012F5A' }}>
                <i className="fas fa-graduation-cap me-3"></i>
                About This Diploma
              </h3>
              <p
                className="text-muted"
                style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
              >
                {trackDetails.description}
              </p>
              <div className="d-flex gap-3 mt-4">
                <span
                  className="badge p-2"
                  style={{ backgroundColor: '#012F5A', fontSize: '1rem' }}
                >
                  <i className="fas fa-book me-2"></i>
                  {sortedCourses.length} Courses
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Path */}
        <div className="row">
          <div className="col-12">
            <h4 className="mb-4">Learning Path</h4>
            <div className={styles.coursePath}>
              {sortedCourses.map((courseItem, index) => {
                const course =
                  courseItem.courseId || courseItem.course || courseItem;
                const isExpanded = expandedCourse === course._id;
                const isLast = index === sortedCourses.length - 1;

                return (
                  <div key={course._id} className={styles.coursePathItem}>
                    {/* Course Row */}
                    <div className={styles.courseRow}>
                      {/* Order Circle */}
                      <div className={styles.orderCircle}>
                        <span>{courseItem.order || index + 1}</span>
                      </div>

                      {/* Course Card */}
                      <div
                        className={`${styles.courseCard} ${isExpanded ? styles.expanded : ''}`}
                      >
                        <div
                          className={styles.courseCardHeader}
                          onClick={() => toggleCourse(course._id)}
                        >
                          <img
                            src={course.imageUrl}
                            alt={course.title}
                            className={styles.courseImage}
                          />
                          <div className={styles.courseInfo}>
                            <h5>{course.title}</h5>
                            <div className={styles.courseMeta}>
                              <span>
                                <i className="fas fa-clock me-1"></i>
                                {course.duration} hours
                              </span>
                              <span>
                                <i className="fas fa-dollar-sign me-1"></i>
                                {course.price}
                              </span>
                            </div>
                          </div>
                          <div className={styles.expandIcon}>
                            <i
                              className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}
                            ></i>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className={styles.courseDetails}>
                            <div
                              className={styles.courseDescription}
                              dangerouslySetInnerHTML={{
                                __html: course.description,
                              }}
                            />
                            <div className={styles.courseActions}>
                              <a
                                href={`/courses/details/${course._id}`}
                                className="btn btn-sm"
                                style={{
                                  backgroundColor: '#012F5A',
                                  color: 'white',
                                }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                Go to Course{' '}
                                <i className="fas fa-arrow-right ms-2"></i>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && <div className={styles.connectingLine}></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enroll Button */}
        <div className="row mt-5">
          <div className="col-12 text-center">
            <button className={`btn btn-lg ${styles.enrollButton}`}>
              <i className="fas fa-graduation-cap me-2"></i>
              Enroll in This Diploma
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
