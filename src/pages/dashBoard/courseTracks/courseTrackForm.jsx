import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Modal, Button, Form as BootstrapForm } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import TextInput from '../../../shared/formComponents/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourseTrack,
  getCourseTracks,
  updateCourseTrack,
} from '../../../Redux/courseTracks/courseTracks.service';
import { getCourses } from '../../../Redux/courses/courses.service';

export const CourseTrackForm = ({ courseTrack, showModal, setShowModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseTrack._id) {
      setIsEditing(true);
    }
  }, [courseTrack]);

  useEffect(() => {
    // Fetch available courses when modal opens
    if (showModal) {
      dispatch(getCourses());
    }
  }, [showModal, dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Track name is required'),
    description: Yup.string().required('Description is required'),
    courses: Yup.array()
      .of(
        Yup.object().shape({
          course: Yup.string().required('Course is required'),
        })
      )
      .min(1, 'At least one course must be selected')
      .test(
        'has-valid-course',
        'At least one course must be selected',
        (courses) => {
          return courses?.some((c) => c.course !== '');
        }
      ),
  });

  const initialValues = {
    name: courseTrack?.name || '',
    description: courseTrack?.description || '',
    courses:
      courseTrack?.courses?.length > 0
        ? courseTrack.courses.map((c) => ({
            course: c.courseId?._id || c.courseId || c.course || c._id || c,
          }))
        : [{ course: '' }],
    published: courseTrack?.published || false,
  };

  const submitForm = (values) => {
    // Filter out empty courses and add order based on index
    const formattedValues = {
      ...values,
      courses: values.courses
        .filter((c) => c.course !== '')
        .map((c, index) => ({
          courseId: c.course,
          order: index + 1,
        })),
    };

    if (isEditing) {
      dispatch(updateCourseTrack({ _id: courseTrack._id, ...formattedValues }))
        .unwrap()
        .then(() => {
          dispatch(getCourseTracks());
          setShowModal(false);
        });
    } else {
      dispatch(addCourseTrack(formattedValues))
        .unwrap()
        .then(() => {
          dispatch(getCourseTracks());
          setShowModal(false);
        });
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Edit Course Track' : 'Add New Course Track'}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ values, isValid, dirty, setFieldValue, errors, touched }) => (
          <Form>
            <Modal.Body>
              {/* Track Name */}
              <TextInput
                label="Track Name"
                name="name"
                type="text"
                placeholder="Enter track name"
                className="form-control mb-3"
                required
              />

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="3"
                  placeholder="Enter track description"
                  value={values.description}
                  onChange={(e) => setFieldValue('description', e.target.value)}
                />
                {errors.description && touched.description && (
                  <div className="text-danger small mt-1">
                    {errors.description}
                  </div>
                )}
              </div>

              {/* Assign Courses */}
              <div className="mb-3">
                <label className="form-label">
                  Assign Courses <span className="text-danger">*</span>
                </label>

                {values.courses.map((courseItem, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center mb-2 gap-2"
                  >
                    <span
                      className="badge bg-primary"
                      style={{ minWidth: '30px' }}
                    >
                      {index + 1}
                    </span>
                    <BootstrapForm.Select
                      value={courseItem.course}
                      onChange={(e) => {
                        const newCourses = [...values.courses];
                        newCourses[index].course = e.target.value;
                        setFieldValue('courses', newCourses);
                      }}
                      className="flex-grow-1"
                    >
                      <option value="">Select a course...</option>
                      {courses?.map((course) => {
                        const courseId = course._id || course.id;
                        // Disable if already selected in another field
                        const isSelectedElsewhere = values.courses.some(
                          (c, idx) => idx !== index && c.course === courseId
                        );
                        return (
                          <option
                            key={courseId}
                            value={courseId}
                            disabled={isSelectedElsewhere}
                          >
                            {course.title || course.name}
                            {isSelectedElsewhere ? ' (Already selected)' : ''}
                          </option>
                        );
                      })}
                    </BootstrapForm.Select>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        const newCourses = values.courses.filter(
                          (_, idx) => idx !== index
                        );
                        setFieldValue(
                          'courses',
                          newCourses.length > 0 ? newCourses : [{ course: '' }]
                        );
                      }}
                      disabled={values.courses.length === 1}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    setFieldValue('courses', [
                      ...values.courses,
                      { course: '' },
                    ]);
                  }}
                >
                  <i className="fas fa-plus me-1"></i> Add Course
                </Button>

                {errors.courses && touched.courses && (
                  <div className="text-danger small mt-2">{errors.courses}</div>
                )}
                <small className="text-muted d-block mt-2">
                  The order of courses is determined by their position in the
                  list above
                </small>
              </div>

              {/* Published Status */}
              <div className="mb-3">
                <BootstrapForm.Check
                  type="checkbox"
                  id="published"
                  label="Published"
                  checked={values.published}
                  onChange={(e) => setFieldValue('published', e.target.checked)}
                />
                <small className="text-muted">
                  Published tracks will be visible to users on the main website
                </small>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={!isValid || !dirty}
              >
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
