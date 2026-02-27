import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { getPublishedCourseDetails } from '../../../Redux/courses/courses.service';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseDetails, loading } = useSelector((state) => state.courses);
  // const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getPublishedCourseDetails(id));
    }
  }, [id, dispatch]);

  // const handlePlayVideo = () => setIsVideoPlaying(true);

  const handleEnrollClick = () => {
    setShowEnrollModal(true);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleProceedToEnroll = () => {
    navigate(`/checkout/${courseDetails._id}/${selectedGroup._id}`);
  };

  if (loading.getPublishedCourseDetails) {
    return <LoadingSpinner />;
  }

  if (!courseDetails) {
    return <div className="container py-5">Course not found.</div>;
  }

  return (
    <div>
      {/* Header with course image and title */}
      <Header
        img={courseDetails.imageUrl || courseDetails.image}
        title={courseDetails.title}
      />

      <div className="container py-5">
        {/* Intro Video Section */}
        <div className="mb-5">
          <h3 className="mb-4">Course Introduction</h3>
          <div className={`${styles.videoContainer}`}>
            {
              // isVideoPlaying ? (
              <iframe
                className={`${styles.courseVideo} w-100`}
                src={courseDetails.introVideoUrl}
                title="Course Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              // ) : (
              //   <div
              //     className={`${styles.placeholder}`}
              //     onClick={handlePlayVideo}
              //   >
              //     <img
              //       src={courseDetails.imageUrl || courseDetails.image}
              //       alt="Video Thumbnail"
              //       className={`${styles.thumbnailImage} w-100`}
              //     />
              //     <div className={styles.playButton}>
              //       <i className="fas fa-play-circle"></i>
              //     </div>
              //   </div>
              // )
            }
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {/* Course Details Section */}
            <div className="mb-5">
              <h3 className="mb-4">About This Course</h3>
              <div
                dangerouslySetInnerHTML={{ __html: courseDetails.description }}
              />

              <div className="d-flex gap-4 my-4">
                <div>
                  <i
                    className="fas fa-clock me-2"
                    style={{ color: '#012F5A' }}
                  ></i>
                  <strong>Duration:</strong> {courseDetails.duration} hours
                </div>
                <div>
                  <i className="fas fa-star me-2 text-warning"></i>
                  <strong>Rating:</strong> {courseDetails.rating || 'N/A'}
                </div>
                <div>
                  <i className="fas fa-signal me-2 text-success"></i>
                  <strong>Level:</strong> {courseDetails.level || 'All Levels'}
                </div>
              </div>
            </div>

            {/* Course Modules Accordion */}
            {courseDetails.modules && courseDetails.modules.length > 0 && (
              <div className="mb-5">
                <h3 className="mb-4">Course Curriculum</h3>
                <Accordion defaultActiveKey="0">
                  {courseDetails.modules.map((module, index) => (
                    <Accordion.Item
                      eventKey={index.toString()}
                      key={module._id || index}
                    >
                      <Accordion.Header>
                        <div className="d-flex justify-content-between w-100 pe-3">
                          <span>
                            <strong>Module {index + 1}:</strong> {module.title}
                          </span>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        {module.content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: module.content,
                            }}
                          />
                        ) : (
                          <p className="text-muted">
                            No content available yet.
                          </p>
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          <div className="col-lg-4">
            {/* Enroll Button and Price */}
            <div className="card mb-4 sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h4 className="text-primary mb-3">${courseDetails.price}</h4>
                <Button
                  variant="primary"
                  className="w-100 mb-3"
                  size="lg"
                  onClick={handleEnrollClick}
                >
                  <i className="fas fa-graduation-cap me-2"></i>
                  Enroll Now
                </Button>

                <h6 className="mt-4 mb-3">This course includes:</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i
                      className="fas fa-video me-2"
                      style={{ color: '#012F5A' }}
                    ></i>
                    {courseDetails.duration} hours on-demand video
                  </li>
                  <li className="mb-2">
                    <i
                      className="fas fa-file-alt me-2"
                      style={{ color: '#012F5A' }}
                    ></i>
                    Downloadable resources
                  </li>
                  <li className="mb-2">
                    <i
                      className="fas fa-infinity me-2"
                      style={{ color: '#012F5A' }}
                    ></i>
                    Full lifetime access
                  </li>
                  <li className="mb-2">
                    <i
                      className="fas fa-mobile-alt me-2"
                      style={{ color: '#012F5A' }}
                    ></i>
                    Access on mobile and desktop
                  </li>
                  <li className="mb-2">
                    <i
                      className="fas fa-certificate me-2"
                      style={{ color: '#012F5A' }}
                    ></i>
                    Certificate of completion
                  </li>
                </ul>
              </div>
            </div>

            {/* Available Groups Section */}
            {courseDetails.groups && courseDetails.groups.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-3">Available Groups</h5>
                  {courseDetails.groups.map((group) => (
                    <div key={group._id} className="border rounded p-3 mb-3">
                      <h6>
                        {group.name || `Group ${group.groupNumber || ''}`}
                      </h6>
                      <div className="small text-muted">
                        <div className="mb-1">
                          <i className="fas fa-calendar me-2"></i>
                          Start:{' '}
                          {group.startDate
                            ? new Date(group.startDate).toLocaleDateString()
                            : 'TBA'}
                        </div>
                        <div className="mb-1">
                          <i className="fas fa-calendar-check me-2"></i>
                          End:{' '}
                          {group.endDate
                            ? new Date(group.endDate).toLocaleDateString()
                            : 'TBA'}
                        </div>
                        {group.instructor && (
                          <div className="mb-1">
                            <i className="fas fa-user me-2"></i>
                            Instructor: {group.instructor.name || 'TBA'}
                          </div>
                        )}
                        {group.capacity && (
                          <div className="mb-1">
                            <i className="fas fa-users me-2"></i>
                            Capacity: {group.enrolledCount || 0}/
                            {group.capacity}
                          </div>
                        )}
                        {group.discount > 0 && (
                          <div className="mb-1 text-success">
                            <i className="fas fa-tag me-2"></i>
                            {group.discount}% OFF
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enroll Modal */}
      <Modal
        show={showEnrollModal}
        onHide={() => setShowEnrollModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Select a Group to Enroll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {courseDetails.groups && courseDetails.groups.length > 0 ? (
            <div>
              {courseDetails.groups.map((group) => (
                <div
                  key={group._id}
                  className={`border rounded p-3 mb-3 ${selectedGroup?._id === group._id ? 'border-primary bg-light' : ''}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSelectGroup(group)}
                >
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5>
                        {group.name || `Group ${group.groupNumber || ''}`}
                      </h5>
                      <div className="text-muted">
                        <div className="mb-1">
                          <i className="fas fa-calendar me-2"></i>
                          Start:{' '}
                          {group.startDate
                            ? new Date(group.startDate).toLocaleDateString()
                            : 'TBA'}
                        </div>
                        <div className="mb-1">
                          <i className="fas fa-calendar-check me-2"></i>
                          End:{' '}
                          {group.endDate
                            ? new Date(group.endDate).toLocaleDateString()
                            : 'TBA'}
                        </div>
                        {group.instructor && (
                          <div className="mb-1">
                            <i className="fas fa-user me-2"></i>
                            Instructor: {group.instructor.name || 'TBA'}
                          </div>
                        )}
                        {group.capacity && (
                          <div className="mb-1">
                            <i className="fas fa-users me-2"></i>
                            Available:{' '}
                            {group.capacity - (group.enrolledCount || 0)} spots
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-end">
                      {group.discount > 0 && (
                        <div className="text-success mb-2">
                          <strong>{group.discount}% OFF</strong>
                        </div>
                      )}
                      <h4 className="text-primary">
                        $
                        {group.discount > 0
                          ? (
                              courseDetails.price *
                              (1 - group.discount / 100)
                            ).toFixed(2)
                          : courseDetails.price}
                      </h4>
                      {group.discount > 0 && (
                        <small className="text-muted text-decoration-line-through">
                          ${courseDetails.price}
                        </small>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">
              No groups available at the moment.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEnrollModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleProceedToEnroll}
            disabled={!selectedGroup}
          >
            Proceed to Enrollment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CourseDetails;
