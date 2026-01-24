import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Modal, Button, Badge } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import TextInput from '../../../shared/formComponents/textInput';
import { useDispatch } from 'react-redux';
import {
  addInstructor,
  getInstructors,
  updateInstructor,
} from '../../../Redux/users/users.service';
import { fileToBase64 } from '../../../shared/utils';

export const InstructorForm = ({ instructor, showModal, setShowModal }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (instructor._id) {
      setIsEditing(true);
    }
  }, [instructor]);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    phoneNumber: Yup.string().required('Phone is required'),
  });

  const initialValues = {
    name: instructor?.name || '',
    email: instructor?.email || '',
    phoneNumber: instructor?.phoneNumber || '',
    profilePicture: instructor?.profilePicture || null,
    // assignedCourses: instructor?.assignedCourses || [],
  };

  const handleImageChange = async (e, setFieldValue) => {
    if (!e.target.files?.[0]) return;

    const base64Image = await fileToBase64(e.target.files[0]);

    setFieldValue('profilePicture', base64Image); // Formik
  };
  const submitForm = (values) => {
    if (isEditing) {
      dispatch(updateInstructor({ _id: instructor._id, ...values }))
        .unwrap()
        .then(() => {
          dispatch(getInstructors());
          setShowModal(false);
        });
    } else {
      dispatch(addInstructor(values))
        .unwrap()
        .then(() => {
          dispatch(getInstructors());
          setShowModal(false);
        });
    }

    // handleSaveInstructor(values);
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Edit Instructor' : 'Add New Instructor'}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
        enableReinitialize
      >
        {({ values, isValid, dirty, setFieldValue }) => (
          <Form>
            <Modal.Body>
              {/* Profile Picture */}
              <div className=" row mb-3">
                {values.profilePicture &&
                  typeof values.profilePicture === 'string' && (
                    <div className="col-2 flex ">
                      <div className=" align-items-center justify-content-center">
                        <img
                          src={values.profilePicture}
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
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={
                      (e) => handleImageChange(e, setFieldValue)
                      // setFieldValue('profilePicture', e.currentTarget.files?.[0])
                    }
                  />
                </div>
              </div>
              {/* Full Name */}
              <TextInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter full name"
                className="form-control mb-3"
                required
              />

              {/* Email */}
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                className="form-control mb-3"
                required
              />

              {/* Phone */}
              <TextInput
                label="Phone"
                name="phoneNumber"
                type="tel"
                placeholder="Enter phone number"
                className="form-control mb-3"
                required
              />

              {/* Assign Courses */}
              {/* <div className="mb-3">
                <label className="form-label">Assign Courses</label>
                <div>
                  {courses.length === 0 && <p>No courses found.</p>}
                  {courses.map((c) => {
                    const selected = values.assignedCourses.includes(c.id);

                    return (
                      <Button
                        key={c.id}
                        size="sm"
                        className="m-1"
                        variant={selected ? 'success' : 'outline-secondary'}
                        onClick={() =>
                          setFieldValue(
                            'assignedCourses',
                            selected
                              ? values.assignedCourses.filter(
                                  (id) => id !== c.id
                                )
                              : [...values.assignedCourses, c.id]
                          )
                        }
                      >
                        {selected ? '✔️' : '➕'} {c.title}
                      </Button>
                    );
                  })}
                </div>
              </div> */}
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
                {isEditing ? 'Save Changes' : 'Add Instructor'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>

    //       <Modal.Body>
    //         <Form>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Full Name</Form.Label>
    //             <Form.Control
    //               type="text"
    //               value={instructor.name}
    //               onChange={(e) =>
    //                 setInstructor({ ...instructor, name: e.target.value })
    //               }
    //             />
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Email</Form.Label>
    //             <Form.Control
    //               type="email"
    //               value={instructor.email}
    //               onChange={(e) =>
    //                 setInstructor({ ...instructor, email: e.target.value })
    //               }
    //             />
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Phone</Form.Label>
    //             <Form.Control
    //               type="tel"
    //               value={instructor.phone}
    //               onChange={(e) =>
    //                 setInstructor({ ...instructor, phone: e.target.value })
    //               }
    //             />
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Profile Picture</Form.Label>
    //             <Form.Control type="file" onChange={handleImageUpload} />
    //             {instructor.profilePicture && (
    //               <img
    //                 src={instructor.profilePicture}
    //                 alt="Preview"
    //                 className="mt-2"
    //                 style={{
    //                   width: '100px',
    //                   height: '100px',
    //                   borderRadius: '50%',
    //                 }}
    //               />
    //             )}
    //           </Form.Group>
    //           <Form.Group className="mb-3">
    //             <Form.Label>Assign Courses</Form.Label>
    //             <div>
    //               {courses.length === 0 && <p>No courses found.</p>}
    //               {courses.map((c) => (
    //                 <Button
    //                   key={c.id}
    //                   size="sm"
    //                   className="m-1"
    //                   variant={
    //                     instructor.assignedCourses.includes(c.id)
    //                       ? 'success'
    //                       : 'outline-secondary'
    //                   }
    //                   onClick={() => toggleCourseAssignment(c.id)}
    //                 >
    //                   {instructor.assignedCourses.includes(c.id) ? '✔️' : '➕'}{' '}
    //                   {c.title}
    //                 </Button>
    //               ))}
    //             </div>
    //           </Form.Group>
    //         </Form>
    //       </Modal.Body>

    //       <Modal.Footer>
    //         <Button variant="secondary" onClick={() => setShowModal(false)}>
    //           Cancel
    //         </Button>
    //         <Button variant="success" onClick={handleSaveInstructor}>
    //           {isEditing ? 'Save Changes' : 'Add Instructor'}
    //         </Button>
    //       </Modal.Footer>
    //     </Modal>
  );
};
