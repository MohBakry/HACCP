import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import { getPublishedCourseDetails } from '../../Redux/courses/courses.service';
import LoadingSpinner from '../../shared/LoadingSpinner';
import styles from './styles.module.css';

export default function Checkout() {
  const { courseId, groupId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseDetails, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId) {
      dispatch(getPublishedCourseDetails(courseId));
    }
  }, [courseId, dispatch]);

  if (loading.getPublishedCourseDetails) {
    return <LoadingSpinner />;
  }

  if (!courseDetails) {
    return (
      <Container className="py-5">
        <div className="text-center">Course not found.</div>
      </Container>
    );
  }

  const selectedGroup = courseDetails.groups?.find((g) => g._id === groupId);

  if (!selectedGroup) {
    return (
      <Container className="py-5">
        <div className="text-center">Group not found.</div>
      </Container>
    );
  }

  const originalPrice = courseDetails.price;
  const discountAmount = (originalPrice * selectedGroup.discount) / 100;
  const finalPrice = originalPrice - discountAmount;

  const handleProceedToPayment = () => {
    navigate(`/payment/${courseId}/${groupId}`);
  };

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Button variant="link" className="p-0" onClick={() => navigate(-1)}>
          <i className="fa fa-arrow-left me-2"></i>Back
        </Button>
      </div>

      <h2 className="mb-4">Checkout</h2>

      <Row>
        <Col lg={8}>
          {/* Course Information */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Course Information</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src={courseDetails.imageUrl || courseDetails.image}
                    alt={courseDetails.title}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col md={8}>
                  <h4>{courseDetails.title}</h4>
                  <div
                    className={styles.description}
                    dangerouslySetInnerHTML={{
                      __html: courseDetails.description,
                    }}
                  />
                  <div className="mt-3">
                    <Badge bg="info" className="me-2">
                      {courseDetails.category}
                    </Badge>
                    <Badge bg="secondary">{courseDetails.duration} hours</Badge>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Group Information */}
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Group Details</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <div className="mb-2">
                    <strong>
                      <i className="fa fa-calendar me-2"></i>Start Date:
                    </strong>
                    <p className="mb-0">
                      {new Date(selectedGroup.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mb-2">
                    <strong>
                      <i className="fa fa-calendar-check me-2"></i>End Date:
                    </strong>
                    <p className="mb-0">
                      {new Date(selectedGroup.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2">
                    <strong>
                      <i className="fa fa-user me-2"></i>Instructor:
                    </strong>
                    <p className="mb-0">
                      {selectedGroup.instructor?.name || 'TBA'}
                    </p>
                  </div>
                  {selectedGroup.name && (
                    <div className="mb-2">
                      <strong>
                        <i className="fa fa-users me-2"></i>Group Name:
                      </strong>
                      <p className="mb-0">{selectedGroup.name}</p>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {/* Order Summary */}
          <Card className={styles.summaryCard}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Course Price:</span>
                <span>${originalPrice.toFixed(2)}</span>
              </div>
              {selectedGroup.discount > 0 && (
                <>
                  <div className="d-flex justify-content-between mb-2 text-success">
                    <span>Discount ({selectedGroup.discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                  <hr />
                </>
              )}
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="text-primary">
                  ${finalPrice.toFixed(2)}
                </strong>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
