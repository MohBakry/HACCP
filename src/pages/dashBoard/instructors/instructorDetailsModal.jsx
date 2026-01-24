import { Modal, Accordion, Badge, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const InstructorCoursesModal = ({ showModal, setShowModal, data }) => {
  const { loading } = useSelector((state) => state.users);
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      size="lg"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title>Instructor</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {loading.getInstructorDetails ? (
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            <div>
              <div className=" row mb-3">
                {data?.instructor?.profilePicture &&
                  typeof data?.instructor?.profilePicture === 'string' && (
                    <div className="col-2 flex ">
                      <div className=" align-items-center justify-content-center">
                        <img
                          src={data?.instructor?.profilePicture}
                          alt="Preview"
                          className="mt-2"
                          style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    </div>
                  )}
                <div className="col">
                  <h5>{data?.instructor?.name}</h5>
                </div>
              </div>

              <p>
                {' '}
                <span className="fw-bold">Email: </span>
                {data?.instructor?.email}
              </p>
              <p>
                {' '}
                <span className="fw-bold">Phone: </span>
                {data?.instructor?.phoneNumber}
              </p>
            </div>
            <span className="fw-bold">Assigned Courses </span>
            {data?.courses?.length === 0 ? (
              <p className="text-center text-muted">No courses assigned</p>
            ) : (
              <Accordion alwaysOpen>
                {data?.courses?.map((course, index) => (
                  <Accordion.Item eventKey={String(index)} key={course._id}>
                    <Accordion.Header>
                      <div className="d-flex w-100 align-items-center">
                        <span>{course.title}</span>
                        <Badge bg="primary" className="ms-auto">
                          {course.groups.length} Groups
                        </Badge>
                      </div>
                    </Accordion.Header>

                    <Accordion.Body>
                      {course.groups.map((group, idx) => {
                        const isActive = new Date(group.endDate) > new Date();

                        return (
                          <div
                            key={group._id}
                            className="border rounded p-3 mb-2"
                          >
                            <div className="d-flex justify-content-between">
                              <strong>Group {idx + 1}</strong>

                              <Badge bg={isActive ? 'success' : 'secondary'}>
                                {isActive ? 'Active' : 'Finished'}
                              </Badge>
                            </div>

                            <div className="text-muted small mt-1">
                              📅{' '}
                              {new Date(group.startDate).toLocaleDateString()} –{' '}
                              {new Date(group.endDate).toLocaleDateString()}
                            </div>

                            <div className="mt-1">
                              👨‍🎓 Students:{' '}
                              <strong>{group.students.length}</strong>
                            </div>

                            {group.discount > 0 && (
                              <Badge bg="warning" text="dark" className="mt-2">
                                {group.discount}% Discount
                              </Badge>
                            )}
                          </div>
                        );
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
