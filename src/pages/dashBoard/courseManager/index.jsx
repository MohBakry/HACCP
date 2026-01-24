import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../../shared/CourseCard';
import Filters from '../../../shared/filters/Filters';
import RichTextInput from '../../../shared/formComponents/richTextInput';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { getCourses } from '../../../Redux/courses/courses.service';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

export default function CourseManager() {
  // const [courses, setCourses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [course, setCourse] = useState({});
  const [isEditingCourse, setIsEditingCourse] = useState(false);

  const [showGroupModal, setShowGroupModal] = useState(false);
  const [group, setGroup] = useState({});
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
  });
  const { user } = useSelector((state) => state.user);
  const { courses, loading, error } = useSelector((state) => state.courses);

  const isAdmin = user?.role === 'admin';
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const selectsConfig = [
    {
      key: 'status',
      placeholder: 'All Status',
      options: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
  ];

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
    });
  };

  useEffect(() => {
    console.log('Filters changed:', filters);
  }, [filters]);

  useEffect(() => {
    dispatch(getCourses());
    // setCourses(JSON.parse(localStorage.getItem('courses')) || []);
    // setGroups(JSON.parse(localStorage.getItem('groups')) || []);
    // setInstructors(JSON.parse(localStorage.getItem('instructors')) || []);
  }, [dispatch]);

  useEffect(() => {
    if (loading.getCourses) {
      dispatch(showLoading());
    } else if (!loading.getCourses) {
      dispatch(hideLoading());
    }
  }, [loading.getCourses, dispatch]);

  // ------------------ Course actions ----------------------

  const openAddCourseModal = () => {
    setCourse({
      id: null,
      image: '',
      introVideo: '',
      title: '',
      description: '',
      duration: '',
      price: '',
      rating: 0,
    });
    setIsEditingCourse(false);
    setShowCourseModal(true);
  };

  const openEditCourseModal = (id) => {
    const found = courses.find((c) => c.id === id);
    if (found) {
      setCourse(found);
      setIsEditingCourse(true);
      setShowCourseModal(true);
    }
  };

  // const handleSaveCourse = () => {
  //   const { image, introVideo, title, description, duration, price } = course;
  //   if (
  //     !image ||
  //     !introVideo ||
  //     !title ||
  //     !description ||
  //     !duration ||
  //     !price
  //   ) {
  //     alert('Please fill in all fields.');
  //     return;
  //   }

  // let updatedCourses;
  // if (isEditingCourse) {
  //   updatedCourses = courses.map((c) => (c.id === course.id ? course : c));
  // } else {
  //   updatedCourses = [...courses, { ...course, id: Date.now() }];
  // }

  //   setCourses(updatedCourses);
  //   localStorage.setItem('courses', JSON.stringify(updatedCourses));
  //   setShowCourseModal(false);
  // };

  const handleDeleteCourse = (id) => {
    if (!window.confirm('Delete this course?')) return;
    const updated = courses.filter((c) => c.id !== id);
    // setCourses(updated);
    localStorage.setItem('courses', JSON.stringify(updated));
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setCourse({ ...course, image: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // ------------------ Group actions ----------------------

  // const openAddGroupModal = (courseId) => {
  //   setGroup({
  //     id: null,
  //     courseId,
  //     instructorId: '',
  //     startDate: '',
  //     endDate: '',
  //     discount: '',
  //   });
  //   setIsEditingGroup(false);
  //   setShowGroupModal(true);
  // };

  const openEditGroupModal = (groupToEdit) => {
    setGroup({ ...groupToEdit });
    setIsEditingGroup(true);
    setShowGroupModal(true);
  };

  // const handleSaveGroup = () => {
  //   if (!group.courseId || !group.instructorId || !group.startDate) return;

  //   const updatedGroups = [...groups];
  //   if (isEditingGroup) {
  //     const index = updatedGroups.findIndex((g) => g.id === group.id);
  //     updatedGroups[index] = group;
  //   } else {
  //     updatedGroups.push({ ...group, id: Date.now() });
  //   }

  //   // ⬇️ Update instructor with assigned course
  //   const updatedInstructors = instructors.map((ins) => {
  //     if (ins.id === group.instructorId) {
  //       const updatedCourses = new Set(ins.assignedCourses || []);
  //       updatedCourses.add(group.courseId); // use Set to avoid duplicates
  //       return {
  //         ...ins,
  //         assignedCourses: [...updatedCourses],
  //       };
  //     }
  //     return ins;
  //   });

  //   localStorage.setItem('groups', JSON.stringify(updatedGroups));
  //   localStorage.setItem('instructors', JSON.stringify(updatedInstructors));
  //   setGroups(updatedGroups);
  //   setInstructors(updatedInstructors); // Make sure this state exists
  //   setShowGroupModal(false);
  // };

  const handleDeleteGroup = (id) => {
    if (!window.confirm('Delete this group?')) return;
    const updated = groups.filter((g) => g.id !== id);
    setGroups(updated);
    localStorage.setItem('groups', JSON.stringify(updated));
  };

  const exportPDF = () => {};
  const exportExcel = () => {};

  // ------------------ RENDER ----------------------
  console.log(user, 'user');
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-end align-items-center mb-4 flex-wrap">
        {/* Action Buttons */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <Button
            className={`${styles.addButton}`}
            onClick={() => navigate('/dashboard/manage-courses/add')}
          >
            <i className="fa fa-plus me-1"></i> Add Course
          </Button>
          <Button
            className="btn btn-outline-danger bg-light"
            onClick={exportPDF}
          >
            <i className="fa fa-file-pdf me-1"></i> Export PDF
          </Button>
          <Button
            className="btn btn-outline-success bg-light"
            onClick={exportExcel}
          >
            <i className="fa fa-file-excel me-1"></i> Export Excel
          </Button>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Filters
          filters={filters}
          onChange={setFilters}
          selects={selectsConfig}
          onReset={resetFilters}
        />
      </div>
      {/* <Button
        variant="primary"
        onClick={openAddCourseModal}
        className={`${styles.addCourseBtn} my-2`}
      >
        Add New Course
      </Button> */}

      {courses.map((c) => {
        const courseGroups = groups.filter((g) => g.courseId === c.id);
        return (
          <div key={c.id} className="my-4">
            <CourseCard
              {...c}
              viewMode="list"
              adminMode={isAdmin}
              onEdit={() => navigate(`/dashboard/manage-courses/edit/${c._id}`)}
              onDelete={() => handleDeleteCourse(c.id)}
            />

            {/* <Button
              className={`${styles.addGroupBtn} mt-2`}
              onClick={() => openAddGroupModal(c.id)}
            >
              Add Group
            </Button> */}

            {courseGroups.length > 0 && (
              <div className="mt-3">
                <h6>Groups for this Course:</h6>
                {courseGroups.map((g) => {
                  const instructor = instructors.find(
                    (i) => i.id === g.instructorId
                  );
                  return (
                    <div
                      key={g.id}
                      className="border p-2 my-2 d-flex justify-content-between"
                    >
                      <div>
                        <strong>Instructor:</strong> {instructor?.name || 'N/A'}{' '}
                        | <strong>Start:</strong> {g.startDate} |{' '}
                        <strong>End:</strong> {g.endDate} |{' '}
                        <strong>Discount:</strong> {g.discount}%
                      </div>
                      <div>
                        <Button
                          size="sm"
                          variant="warning"
                          onClick={() => openEditGroupModal(g)}
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDeleteGroup(g.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Course Modal */}
      {/* <Modal show={showCourseModal} onHide={() => setShowCourseModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditingCourse ? 'Edit' : 'Add'} Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                value={course.image}
                onChange={(e) =>
                  setCourse({ ...course, image: e.target.value })
                }
              />
              <Form.Label>Or Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Intro Video URL</Form.Label>
              <Form.Control
                type="text"
                value={course.introVideo}
                onChange={(e) =>
                  setCourse({ ...course, introVideo: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={course.title}
                onChange={(e) =>
                  setCourse({ ...course, title: e.target.value })
                }
              />
            </Form.Group>

            <RichTextInput
              name="description"
              label="Course Description"
              required
            />
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="number"
                value={course.duration}
                onChange={(e) =>
                  setCourse({ ...course, duration: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={course.price}
                onChange={(e) =>
                  setCourse({ ...course, price: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCourseModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveCourse}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> */}

      {/* Group Modal */}
      {/* <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditingGroup ? 'Edit Group' : 'Add New Group'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Course</Form.Label>
              <Form.Select
                value={group.courseId || ''}
                onChange={(e) =>
                  setGroup({ ...group, courseId: Number(e.target.value) })
                }
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Instructor</Form.Label>
              <Form.Select
                value={group.instructorId || ''}
                onChange={(e) =>
                  setGroup({ ...group, instructorId: Number(e.target.value) })
                }
              >
                <option value="">Select Instructor</option>
                {instructors.map((ins) => (
                  <option key={ins.id} value={ins.id}>
                    {ins.name} ({ins.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={group.startDate || ''}
                onChange={(e) =>
                  setGroup({ ...group, startDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={group.endDate || ''}
                onChange={(e) =>
                  setGroup({ ...group, endDate: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter discount percentage"
                value={group.discount || 0}
                min={0}
                max={100}
                onChange={(e) =>
                  setGroup({ ...group, discount: Number(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowGroupModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveGroup}>
            {isEditingGroup ? 'Save Changes' : 'Add Group'}
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
