import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import SelectInput from '../../../shared/formComponents/selectInput';
import TextInput from '../../../shared/formComponents/TextInput';
import NumberInput from '../../../shared/formComponents/NumberInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  addGroup,
  getCourses,
  getGroups,
  updateGroup,
} from '../../../Redux/courses/courses.service';

export const GroupForm = ({ group, showModal, setShowModal, courseId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.courses);
  const { instructors } = useSelector((state) => state.users);

  useEffect(() => {
    if (group._id) {
      setIsEditing(true);
    }
  }, [group]);

  useEffect(() => {
    if (!courses.length) {
      dispatch(getCourses());
    }
  }, [courses, dispatch]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Group name is required'),
    courseId: Yup.string().required('Course is required'),
    instructorId: Yup.string().required('Instructor is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date()
      .required('End date is required')
      .min(Yup.ref('startDate'), 'End date must be after start date'),
    discount: Yup.number().min(0).max(100).required('Discount is required'),
  });

  const initialValues = {
    courseId: group?.courseId || '',
    instructorId: group?.instructorId || '',
    startDate: group?.startDate || '',
    endDate: group?.endDate || '',
    discount: group?.discount || 0,
    name: group?.name || '',
  };

  const submitForm = (values) => {
    if (isEditing) {
      dispatch(updateGroup({ _id: group._id, ...values }))
        .unwrap()
        .then(() => {
          dispatch(getGroups(courseId));
          setShowModal(false);
        });
    } else {
      dispatch(addGroup(values))
        .unwrap()
        .then(() => {
          dispatch(getGroups(courseId));
          setShowModal(false);
        });
    }
  };

  const courseOptions = courses.map((c) => ({
    value: c._id,
    label: c.title,
  }));

  const instructorOptions = instructors.map((i) => ({
    value: i._id,
    label: `${i.name} (${i.email})`,
  }));

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Group' : 'Add New Group'}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ isValid, dirty }) => (
          <Form>
            <Modal.Body>
              <TextInput
                label="Group Name"
                placeholder="Enter group name"
                name="name"
                required
              />
              <SelectInput
                label="Course"
                name="courseId"
                options={courseOptions}
                placeholder="Select a course"
                required
                disabled
              />

              <SelectInput
                label="Instructor"
                name="instructorId"
                options={instructorOptions}
                placeholder="Select an instructor"
                required
              />

              <TextInput
                label="Start Date"
                name="startDate"
                type="date"
                required
              />

              <TextInput label="End Date" name="endDate" type="date" required />

              <NumberInput
                label="Discount (%)"
                name="discount"
                min={0}
                max={100}
                placeholder="Enter discount percentage"
                required
              />
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>

              <Button
                variant="success"
                type="submit"
                disabled={!(isValid && dirty)}
              >
                {isEditing ? 'Save Changes' : 'Add Group'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
