import { Modal, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const GroupDetailsModal = ({
  showModal,
  setShowModal,
  data,
  course,
}) => {
  const { instructors } = useSelector((state) => state.users);

  //   const course = courses.find((c) => c._id === course.id);
  const instructor = instructors.find((i) => i._id === data.instructorId?._id);

  const isActive = new Date(data.endDate) > new Date();

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Group Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <p>
            <span className="fw-bold">Group Name: </span>
            {data.name || 'Unknown'}
          </p>
          <p>
            <span className="fw-bold">Course: </span>
            {course?.title || 'Unknown'}
          </p>
          <p>
            <span className="fw-bold">Instructor: </span>
            {instructor?.name || 'N/A'} ({instructor?.email || ''})
          </p>
          <p>
            <span className="fw-bold">Start Date: </span>
            {new Date(data.startDate).toLocaleDateString()}
          </p>
          <p>
            <span className="fw-bold">End Date: </span>
            {new Date(data.endDate).toLocaleDateString()}
          </p>
          <p>
            <span className="fw-bold">Discount: </span>
            {data.discount}%
          </p>
          <p>
            <span className="fw-bold">Status: </span>
            <Badge bg={isActive ? 'success' : 'secondary'}>
              {isActive ? 'Active' : 'Inactive'}
            </Badge>
          </p>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
