import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
} from 'react-bootstrap';
import { getMyTrackEnrollments } from '../../../Redux/courseTracks/courseTracks.service';
import styles from './styles.module.css';

export default function MyDiplomas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { myTrackEnrollments, loading, error } = useSelector(
    (state) => state.courseTracks
  );

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    dispatch(getMyTrackEnrollments());
  }, [dispatch, token, navigate]);

  if (loading.getMyTrackEnrollments) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your enrolled diplomas...</p>
      </Container>
    );
  }

  if (error.getMyTrackEnrollments) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="fa fa-exclamation-circle me-2"></i>
          {error.getMyTrackEnrollments}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <h2 className="mb-0">
          <i className="fa fa-certificate me-2"></i>
          My Enrolled Diplomas
        </h2>
        <Button variant="outline-primary" onClick={() => navigate('/diplomas')}>
          <i className="fa fa-search me-2"></i>
          Browse Diplomas
        </Button>
      </div>

      {!myTrackEnrollments || myTrackEnrollments.length === 0 ? (
        <Alert variant="info">
          <i className="fa fa-info-circle me-2"></i>
          You are not enrolled in any diplomas yet.
        </Alert>
      ) : (
        <Row>
          {myTrackEnrollments.map((enrollment) => {
            const track = enrollment?.trackId || {};
            const progress = enrollment?.overallProgress || 0;
            const completed = !!enrollment?.trackCompleted;
            const completedCount = enrollment?.completedCoursesCount || 0;
            const totalCourses = enrollment?.courseProgress?.length || 0;

            return (
              <Col md={6} lg={4} key={enrollment._id} className="mb-4">
                <Card className={styles.trackCard}>
                  {track?.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={track.imageUrl}
                      alt={track.name}
                      className={styles.trackImage}
                    />
                  )}
                  <Card.Body>
                    <Card.Title className={styles.trackTitle}>
                      {track?.name || 'Diploma Track'}
                    </Card.Title>

                    <div className="mb-2 d-flex gap-2 flex-wrap">
                      <Badge bg={completed ? 'success' : 'warning'}>
                        {completed ? 'Completed' : 'In Progress'}
                      </Badge>
                      <Badge bg="primary">{progress}% Progress</Badge>
                    </div>

                    <p className="text-muted small mb-2">
                      {track?.description || 'No description available.'}
                    </p>

                    <div className="mb-3 small">
                      <strong>Courses Completed:</strong> {completedCount}/
                      {totalCourses}
                    </div>

                    <div
                      className="progress mb-3"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className={`progress-bar ${completed ? 'bg-success' : 'bg-info'}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <Button
                      className="w-100"
                      variant="primary"
                      onClick={() =>
                        navigate(`/profile/diplomas/${track?._id}`)
                      }
                    >
                      <i className="fa fa-chart-line me-2"></i>
                      View Progress
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}
