import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Badge,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from 'react-bootstrap';
import { getEnrolledCourses } from '../../../Redux/courses/courses.service';
import styles from './styles.module.css';

export default function EnrolledCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('current');

  const { enrolledCourses, loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(getEnrolledCourses());
  }, [dispatch]);

  if (loading.getEnrolledCourses) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your courses...</p>
      </Container>
    );
  }

  if (error.getEnrolledCourses) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="fa fa-exclamation-circle me-2"></i>
          {error.getEnrolledCourses}
        </Alert>
      </Container>
    );
  }

  // Filter courses based on status
  const currentCourses = enrolledCourses?.filter(
    (enrollment) =>
      enrollment.status === 'active' ||
      enrollment.status === 'in_progress' ||
      enrollment.status === 'not_started'
  );

  const completedCourses = enrolledCourses?.filter(
    (enrollment) => enrollment.status === 'completed'
  );

  const coursesToShow =
    activeTab === 'current' ? currentCourses : completedCourses;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'success';
    if (progress >= 50) return 'info';
    if (progress >= 25) return 'warning';
    return 'danger';
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">
        <i className="fa fa-graduation-cap me-2"></i>My Enrolled Courses
      </h2>

      {/* Tabs */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            <i className="fa fa-book me-2"></i>
            Current Courses ({currentCourses?.length || 0})
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            <i className="fa fa-check-circle me-2"></i>
            Completed Courses ({completedCourses?.length || 0})
          </button>
        </li>
      </ul>

      {/* Courses List */}
      {!coursesToShow || coursesToShow.length === 0 ? (
        <Alert variant="info">
          <i className="fa fa-info-circle me-2"></i>
          {activeTab === 'current'
            ? 'You are not enrolled in any courses yet. Browse our course catalog to get started!'
            : 'You have not completed any courses yet.'}
        </Alert>
      ) : (
        <Row>
          {coursesToShow.map((enrollment) => (
            <Col md={6} lg={4} key={enrollment._id} className="mb-4">
              <Card className={styles.courseCard}>
                {enrollment?.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={enrollment.imageUrl}
                    alt={enrollment.title}
                    className={styles.courseImage}
                  />
                )}
                <Card.Body>
                  <Card.Title className={styles.courseTitle}>
                    {enrollment.title || 'Course Title'}
                  </Card.Title>

                  <div className="mb-3">
                    <Badge bg="primary" className="me-2">
                      {enrollment.category || 'General'}
                    </Badge>
                    {enrollment.status === 'completed' && (
                      <Badge bg="success">
                        <i className="fa fa-check-circle me-1"></i>Completed
                      </Badge>
                    )}
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fa fa-users me-2"></i>
                      <strong>Group:</strong>{' '}
                      {enrollment.enrolledGroups[0]?.name || 'Default Group'}
                    </small>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fa fa-chalkboard-teacher me-2"></i>
                      <strong>Instructor:</strong>{' '}
                      {enrollment.enrolledGroups[0]?.instructor?.name || 'N/A'}
                    </small>
                  </div>

                  <div className="mb-2">
                    <small className="text-muted">
                      <i className="fa fa-calendar me-2"></i>
                      <strong>Start Date:</strong>{' '}
                      {formatDate(enrollment.enrolledGroups[0]?.startDate)}
                    </small>
                  </div>

                  <div className="mb-3">
                    <small className="text-muted">
                      <i className="fa fa-calendar-check me-2"></i>
                      <strong>End Date:</strong>{' '}
                      {formatDate(enrollment.enrolledGroups[0]?.endDate)}
                    </small>
                  </div>

                  {/* Progress Bar */}
                  {enrollment.progress !== undefined && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <small>Progress</small>
                        <small>{enrollment.progress}%</small>
                      </div>
                      <div className="progress">
                        <div
                          className={`progress-bar bg-${getProgressColor(enrollment.progress)}`}
                          role="progressbar"
                          style={{ width: `${enrollment.progress}%` }}
                          aria-valuenow={enrollment.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    {activeTab === 'current' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-100"
                        onClick={() =>
                          navigate(
                            `/course-content/${enrollment._id}/${enrollment.enrolledGroups[0]?._id}`
                          )
                        }
                      >
                        <i className="fa fa-play me-2"></i>Continue Learning
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="w-50"
                          onClick={() =>
                            navigate(
                              `/course-content/${enrollment._id}/${enrollment.enrolledGroups[0]?._id}`
                            )
                          }
                        >
                          <i className="fa fa-eye me-2"></i>Review
                        </Button>
                        <Button
                          variant="success"
                          size="sm"
                          className="w-50"
                          onClick={
                            () =>
                              navigate('/certificate', {
                                state: {
                                  courseName: enrollment.title,
                                  completedDate: new Date().toISOString(),
                                  certificateId: `CERT-${enrollment._id}-${Date.now()}`,
                                },
                              })
                            // navigate(`/certificate/${enrollment._id}`)
                          }
                        >
                          <i className="fa fa-certificate me-2"></i>Certificate
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Browse Courses CTA */}
      {activeTab === 'current' && coursesToShow?.length === 0 && (
        <div className="text-center mt-4">
          <Button variant="primary" onClick={() => navigate('/courses')}>
            <i className="fa fa-search me-2"></i>Browse Courses
          </Button>
        </div>
      )}
    </Container>
  );
}
