import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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
import CertificateCanvas from '../../../shared/certificateCanvas';
import {
  checkTrackCompletion,
  getMyTrackEnrollments,
  getTrackProgress,
} from '../../../Redux/courseTracks/courseTracks.service';
import { clearTrackProgressState } from '../../../Redux/courseTracks/courseTracks.store';
import { useToast } from '../../../shared/toast/useToast';
import styles from './styles.module.css';

export default function DiplomaProgressDetails() {
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const canvasRef = useRef(null);

  const { token, user } = useSelector((state) => state.auth);
  const {
    myTrackEnrollments,
    currentTrackProgress,
    trackCompletionStatus,
    loading,
    error,
  } = useSelector((state) => state.courseTracks);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (trackId) {
      dispatch(getMyTrackEnrollments());
      dispatch(getTrackProgress(trackId));
      dispatch(checkTrackCompletion(trackId));
    }

    return () => {
      dispatch(clearTrackProgressState());
    };
  }, [dispatch, token, trackId, navigate]);

  const enrolledTrack = useMemo(() => {
    if (!Array.isArray(myTrackEnrollments)) return null;

    return (
      myTrackEnrollments.find((item) => {
        const id = item?.trackId?._id || item?.trackId;
        return id === trackId;
      }) || null
    );
  }, [myTrackEnrollments, trackId]);

  const trackName =
    trackCompletionStatus?.trackName ||
    enrolledTrack?.trackId?.name ||
    currentTrackProgress?.trackId?.name ||
    'Diploma Track';

  const isCompleted = !!(
    trackCompletionStatus?.trackCompleted ||
    currentTrackProgress?.trackCompleted
  );

  const completedAt =
    trackCompletionStatus?.trackCompletedAt ||
    currentTrackProgress?.trackCompletedAt ||
    currentTrackProgress?.updatedAt ||
    new Date().toISOString();

  const overallProgress =
    trackCompletionStatus?.overallProgress ??
    currentTrackProgress?.overallProgress ??
    0;

  const completedCoursesCount =
    trackCompletionStatus?.completedCoursesCount ??
    currentTrackProgress?.completedCoursesCount ??
    0;

  const totalCoursesRequired =
    trackCompletionStatus?.totalCoursesRequired ??
    currentTrackProgress?.courseProgress?.length ??
    0;

  const handleGetCertificate = () => {
    if (!isCompleted) {
      showError('You need to complete all diploma courses first.');
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const safeTrackName = trackName.toLowerCase().replace(/\s+/g, '-');
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png', 1.0);
    link.download = `diploma-certificate-${safeTrackName}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showSuccess('Diploma certificate downloaded successfully.');
  };

  if (loading.getTrackProgress || loading.checkTrackCompletion) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading diploma progress...</p>
      </Container>
    );
  }

  if (error.getTrackProgress) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <i className="fa fa-exclamation-circle me-2"></i>
          {error.getTrackProgress}
        </Alert>
      </Container>
    );
  }

  if (!currentTrackProgress) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <i className="fa fa-info-circle me-2"></i>
          Track enrollment not found.
        </Alert>
      </Container>
    );
  }

  const courseProgress = currentTrackProgress?.courseProgress || [];

  return (
    <Container className="py-5">
      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
        <h2 className="mb-0">
          <i className="fa fa-chart-line me-2"></i>
          Diploma Progress
        </h2>
        <Button
          variant="outline-secondary"
          onClick={() => navigate('/profile/diplomas')}
        >
          <i className="fa fa-arrow-left me-2"></i>
          Back to My Diplomas
        </Button>
      </div>

      <Card className={styles.summaryCard}>
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <h4 className="mb-2">{trackName}</h4>
              <div className="d-flex gap-2 flex-wrap mb-2">
                <Badge bg={isCompleted ? 'success' : 'warning'}>
                  {isCompleted ? 'Completed' : 'In Progress'}
                </Badge>
                <Badge bg="primary">{overallProgress}%</Badge>
              </div>
              <small className="text-muted">
                Completed courses: {completedCoursesCount}/
                {totalCoursesRequired}
              </small>
              <div
                className="progress mt-2"
                role="progressbar"
                aria-valuenow={overallProgress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className={`progress-bar ${isCompleted ? 'bg-success' : 'bg-info'}`}
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </Col>
            <Col md={4} className="text-md-end mt-3 mt-md-0">
              <Button
                variant={isCompleted ? 'success' : 'secondary'}
                onClick={handleGetCertificate}
                disabled={!isCompleted}
              >
                <i className="fa fa-certificate me-2"></i>
                {isCompleted ? 'Get Diploma Certificate' : 'Certificate Locked'}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <h5 className="mt-4 mb-3">Course Completion Details</h5>
      <Row>
        {courseProgress.map((item, index) => {
          const course = item?.courseId || {};
          const completed = !!item?.completed;

          return (
            <Col
              md={6}
              key={item?._id || `${course?._id}-${index}`}
              className="mb-3"
            >
              <Card className={styles.courseProgressCard}>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <h6 className="mb-1">{course?.title || 'Course'}</h6>
                      {item?.completedAt && (
                        <small className="text-muted">
                          Completed at:{' '}
                          {new Date(item.completedAt).toLocaleDateString()}
                        </small>
                      )}
                    </div>
                    <Badge bg={completed ? 'success' : 'secondary'}>
                      {completed ? 'Completed' : 'Pending'}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      <CertificateCanvas
        ref={canvasRef}
        hidden
        studentName={user?.name || 'Student'}
        courseName={`${trackName} Diploma Program`}
        completedDate={completedAt}
        certificateId={
          currentTrackProgress?.certificateNumber ||
          `DIP-${(trackId || '').slice(-6).toUpperCase()}-${Date.now()}`
        }
      />
    </Container>
  );
}
