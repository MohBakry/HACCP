import React from 'react';
import { Modal, Button, Badge, Card, ListGroup } from 'react-bootstrap';

export const CourseTrackDetailsModal = ({ data, showModal, setShowModal }) => {
  if (!data) return null;

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Course Track Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card className="border-0">
          <Card.Body>
            <div className="mb-4">
              <h5 className="text-primary mb-3">{data.name}</h5>
              <p className="text-muted">{data.description}</p>
            </div>

            <div className="mb-3">
              <h6 className="mb-3">
                <i className="fa fa-book me-2"></i>
                Courses in this Track ({data.courses?.length || 0})
              </h6>
              {data.courses && data.courses.length > 0 ? (
                <ListGroup>
                  {[...data.courses]
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((courseItem, index) => {
                      const course =
                        courseItem.courseId || courseItem.course || courseItem;
                      return (
                        <ListGroup.Item
                          key={course._id || course.id || index}
                          className="d-flex justify-content-between align-items-start"
                        >
                          <div className="me-2">
                            <Badge
                              bg="primary"
                              pill
                              style={{ minWidth: '30px' }}
                            >
                              {courseItem.order || index + 1}
                            </Badge>
                          </div>
                          <div className="ms-2 me-auto">
                            <div className="fw-bold">
                              {course.title || course.name}
                            </div>
                            {course.description && (
                              <small className="text-muted">
                                {course.description
                                  .replace(/<[^>]*>/g, '')
                                  .substring(0, 100)}
                                {course.description.length > 100 ? '...' : ''}
                              </small>
                            )}
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                </ListGroup>
              ) : (
                <p className="text-muted">No courses assigned to this track.</p>
              )}
            </div>

            <div className="mt-4">
              <small className="text-muted">
                <strong>Status:</strong>{' '}
                {data.published ? (
                  <span className="badge bg-success">Published</span>
                ) : (
                  <span className="badge bg-secondary">Not Published</span>
                )}
              </small>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
