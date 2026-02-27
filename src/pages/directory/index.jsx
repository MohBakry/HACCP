import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { getCoursesWithCompletedStudents } from '../../Redux/courses/courses.service';
import Img from '../../assets/images/directory-page.png';
import styles from './styles.module.css';

export default function Directory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coursesWithCompletedStudents, loading, error } = useSelector(
    (state) => state.courses
  );
  const [expandedCourses, setExpandedCourses] = useState({});

  const getDescriptionPreview = (htmlContent, maxChars = 300) => {
    if (!htmlContent) return '';

    const withLineBreaks = htmlContent
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h1|h2|h3|h4|h5|h6)>/gi, '\n');

    const plainText = withLineBreaks.replace(/<[^>]+>/g, '');
    const trimmedText =
      plainText.length <= maxChars
        ? plainText
        : `${plainText.slice(0, maxChars)}...`;

    return trimmedText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('<br/>');
  };

  useEffect(() => {
    dispatch(getCoursesWithCompletedStudents());
  }, [dispatch]);

  useEffect(() => {
    if (!coursesWithCompletedStudents?.length) return;

    const allExpanded = {};
    coursesWithCompletedStudents.forEach((course) => {
      allExpanded[course._id] = true;
    });
    setExpandedCourses(allExpanded);
  }, [coursesWithCompletedStudents]);

  const toggleCourseExpand = (courseId) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  const handleStudentClick = (
    studentEmail,
    courseId,
    studentData,
    courseData
  ) => {
    navigate(`/student-verification/${courseId}/${studentEmail}`, {
      state: {
        studentData,
        courseData,
      },
    });
  };

  if (loading.getCoursesWithCompletedStudents) {
    return (
      <>
        <Header img={Img} title="Directory" />
        <div className={`${styles.loadingContainer} py-5`}>
          <LoadingSpinner />
        </div>
      </>
    );
  }

  if (error.getCoursesWithCompletedStudents) {
    return (
      <>
        <Header img={Img} title="Directory" />
        <div className={`${styles.errorContainer} py-5`}>
          <p className={styles.errorMessage}>
            Error loading courses. Please try again later.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header img={Img} title="Directory" />

      <div className={`${styles.directoryContainer} container py-5`}>
        <div className={styles.headerSection}>
          <h2 className={styles.sectionTitle}>
            Explore Our Courses & Successful Students
          </h2>
          <p className={styles.sectionSubtitle}>
            Discover the professionals who have successfully completed our
            courses
          </p>
        </div>

        {coursesWithCompletedStudents &&
        coursesWithCompletedStudents.length > 0 ? (
          <div className={styles.coursesGrid}>
            {coursesWithCompletedStudents.map((course) => (
              <div key={course._id} className={styles.courseCard}>
                {/* Course Header */}
                <div className={styles.courseHeader}>
                  {course.imageUrl && (
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className={styles.courseThumbnail}
                    />
                  )}
                  <div className={styles.courseInfo}>
                    <h3 className={styles.courseTitle}>{course.title}</h3>
                    {course.description && (
                      <div
                        className={styles.courseDescription}
                        dangerouslySetInnerHTML={{
                          __html: getDescriptionPreview(
                            course.description,
                            300
                          ),
                        }}
                      />
                    )}
                  </div>
                  <button
                    className={styles.expandButton}
                    onClick={() => toggleCourseExpand(course._id)}
                  >
                    <i
                      className={`fas fa-chevron-${expandedCourses[course._id] ? 'up' : 'down'}`}
                    ></i>
                  </button>
                </div>

                {/* Students Grid - Expandable */}
                {expandedCourses[course._id] &&
                  course.completedStudents &&
                  course.completedStudents.length > 0 && (
                    <div className={styles.studentsContainer}>
                      <h4 className={styles.studentsTitle}>
                        Students Who Completed This Course
                      </h4>
                      <div className={styles.studentsGrid}>
                        {course.completedStudents.map((student, index) => (
                          <div
                            key={index}
                            className={styles.studentCard}
                            onClick={() =>
                              handleStudentClick(
                                student.email || index,
                                course._id,
                                student,
                                course
                              )
                            }
                          >
                            <div className={styles.studentProfilePic}>
                              {student?.profilePicture ? (
                                <img
                                  src={student.profilePicture}
                                  alt={student.name}
                                  className={styles.profileImage}
                                />
                              ) : (
                                <div className={styles.profilePlaceholder}>
                                  <i className="fas fa-user"></i>
                                </div>
                              )}
                              <div className={styles.verificationBadge}>
                                <i className="fas fa-check-circle"></i>
                              </div>
                            </div>
                            <div className={styles.studentDetails}>
                              <h5 className={styles.studentName}>
                                {student.name}
                              </h5>
                              {student.jobTitle && (
                                <p className={styles.jobTitle}>
                                  {student.jobTitle}
                                </p>
                              )}
                              {student.email && (
                                <p className={styles.email}>{student.email}</p>
                              )}
                              {student.bio && (
                                <p className={styles.bio}>{student.bio}</p>
                              )}
                            </div>
                            <div className={styles.cardHover}>
                              <span className={styles.viewButton}>
                                View Details
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {expandedCourses[course._id] &&
                  (!course.completedStudents ||
                    course.completedStudents.length === 0) && (
                    <div className={styles.noStudents}>
                      <p>No students have completed this course yet.</p>
                    </div>
                  )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noCoursesContainer}>
            <p className={styles.noCoursesMessage}>
              No courses available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </>
  );
}
