import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { useToast } from '../../../shared/toast/useToast';
import {
  checkTrackCompletion,
  enrollInCourseTrack,
  getMyTrackEnrollments,
  getPublishedCourseTrackDetails,
  getTrackProgress,
} from '../../../Redux/courseTracks/courseTracks.service';
import styles from './styles.module.css';

export default function CourseTrackDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useToast();
  const { trackDetails, loading, currentTrackProgress, trackCompletionStatus } =
    useSelector((state) => state.courseTracks);
  const { token } = useSelector((state) => state.auth);
  const { myTrackEnrollments } = useSelector((state) => state.courseTracks);
  const [expandedCourse, setExpandedCourse] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getPublishedCourseTrackDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(getMyTrackEnrollments());
    }
  }, [dispatch, token]);

  const isEnrolled = useMemo(() => {
    if (!id || !Array.isArray(myTrackEnrollments)) return false;
    return myTrackEnrollments.some((enrollment) => {
      const trackId = enrollment?.trackId?._id || enrollment?.trackId;
      return trackId === id;
    });
  }, [id, myTrackEnrollments]);

  useEffect(() => {
    if (id && token && isEnrolled) {
      dispatch(getTrackProgress(id));
      dispatch(checkTrackCompletion(id));
    }
  }, [dispatch, id, token, isEnrolled]);

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

  const getCourseProgress = (courseId) => {
    const progressItems = currentTrackProgress?.courseProgress || [];
    const progress = progressItems.find((item) => {
      const idFromProgress = item?.courseId?._id || item?.courseId;
      return idFromProgress === courseId;
    });
    return progress || null;
  };

  const handleEnroll = async () => {
    if (!token) {
      showError('Please login first to enroll in this diploma.');
      return;
    }

    try {
      await dispatch(enrollInCourseTrack({ trackId: id })).unwrap();
      showSuccess('Successfully enrolled in this diploma.');
      await dispatch(getMyTrackEnrollments());
      await dispatch(getTrackProgress(id));
      await dispatch(checkTrackCompletion(id));
    } catch (errorMessage) {
      showError(errorMessage || 'Failed to enroll in this diploma.');
    }
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
                {isEnrolled && (
                  <span className={`badge p-2 ${styles.enrolledBadge}`}>
                    <i className="fas fa-check-circle me-2"></i>
                    Enrolled
                  </span>
                )}
              </div>

              {isEnrolled && (
                <div className={styles.progressSummary}>
                  <div className={styles.progressHeader}>
                    <span>Track Progress</span>
                    <strong>
                      {trackCompletionStatus?.overallProgress ??
                        currentTrackProgress?.overallProgress ??
                        0}
                      %
                    </strong>
                  </div>
                  <div className={styles.progressBarWrap}>
                    <div
                      className={styles.progressBar}
                      style={{
                        width: `${
                          trackCompletionStatus?.overallProgress ??
                          currentTrackProgress?.overallProgress ??
                          0
                        }%`,
                      }}
                    ></div>
                  </div>
                  <small className="text-muted">
                    Completed courses:{' '}
                    {trackCompletionStatus?.completedCoursesCount ??
                      currentTrackProgress?.completedCoursesCount ??
                      0}
                    /
                    {trackCompletionStatus?.totalCoursesRequired ??
                      sortedCourses.length}
                  </small>
                </div>
              )}
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
                const courseProgress = getCourseProgress(course._id);
                const isCourseCompleted = courseProgress?.completed;

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
                              {isEnrolled && (
                                <span
                                  className={`${styles.courseStatus} ${
                                    isCourseCompleted
                                      ? styles.completedStatus
                                      : styles.pendingStatus
                                  }`}
                                >
                                  <i
                                    className={`fas ${
                                      isCourseCompleted
                                        ? 'fa-check-circle'
                                        : 'fa-hourglass-half'
                                    } me-1`}
                                  ></i>
                                  {isCourseCompleted ? 'Completed' : 'Pending'}
                                </span>
                              )}
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
            {isEnrolled ? (
              <button className={`btn btn-lg ${styles.enrollButton}`} disabled>
                <i className="fas fa-check-circle me-2"></i>
                Already Enrolled
              </button>
            ) : (
              <button
                className={`btn btn-lg ${styles.enrollButton}`}
                onClick={handleEnroll}
                disabled={loading.enrollInCourseTrack}
              >
                <i className="fas fa-graduation-cap me-2"></i>
                {loading.enrollInCourseTrack
                  ? 'Enrolling...'
                  : 'Enroll in This Diploma'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
