import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NumberInput from '../../../../shared/formComponents/numberInput';
import TextAreaInput from '../../../../shared/formComponents/textAreaInput';
import EditQuestionModal from './EditQuestionModal';
import DeleteConfirmModal from '../../../../shared/deleteConfirmation/DeleteConfirmationModal';
import { useToast } from '../../../../shared/toast/useToast';
import {
  getExamByCourseId,
  updateExam,
  deleteQuestion,
} from '../../../../Redux/exams/exams.service';
import { showLoading, hideLoading } from '../../../../Redux/root/root.store';
import styles from './styles.module.css';

const validationSchema = Yup.object().shape({
  passingScore: Yup.number()
    .required('Passing score is required')
    .min(0, 'Must be at least 0')
    .max(100, 'Must be at most 100'),
  durationInMinutes: Yup.number()
    .required('Duration is required')
    .min(1, 'Duration must be at least 1 minute'),
  questions: Yup.array()
    .of(
      Yup.object().shape({
        questionText: Yup.string().required('Question text is required'),
        options: Yup.array()
          .of(
            Yup.object().shape({
              text: Yup.string().required('Option text is required'),
              isCorrect: Yup.boolean(),
            })
          )
          .min(2, 'At least 2 options are required')
          .test(
            'has-correct-answer',
            'Each question must have exactly one correct answer',
            (options) => options?.filter((opt) => opt.isCorrect).length === 1
          ),
      })
    )
    .min(1, 'At least one question is required'),
});

const ManageExam = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const { exam, loading, error } = useSelector((state) => state.exams);

  const [editMode, setEditMode] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  useEffect(() => {
    dispatch(getExamByCourseId(courseId));
  }, [courseId, dispatch]);

  useEffect(() => {
    if (loading.getExam) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [loading.getExam, dispatch]);

  useEffect(() => {
    if (error.getExam && !loading.getExam) {
      navigate(`/dashboard/manage-courses/${courseId}/create-exam`);
    }
  }, [error.getExam, loading.getExam, courseId, navigate]);

  const handleSaveExam = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        updateExam({
          id: exam._id,
          examData: {
            passingScore: values.passingScore,
            durationInMinutes: values.durationInMinutes,
          },
        })
      ).unwrap();

      setEditMode(false);
      showSuccess('Exam settings updated successfully!');
    } catch (err) {
      console.error('Failed to update exam:', err);
      showError(err || 'Failed to update exam. Please try again.');
    } finally {
      setSubmitting(false);
      dispatch(getExamByCourseId(courseId));
    }
  };

  const handleDeleteQuestion = (qIndex, setFieldValue, values) => {
    setQuestionToDelete({ qIndex, setFieldValue, values });
    setShowDeleteModal(true);
  };

  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;

    const { qIndex, setFieldValue, values } = questionToDelete;
    const question = values.questions[qIndex];

    try {
      // If question has an ID, delete from backend
      if (question._id) {
        await dispatch(
          deleteQuestion({
            examId: exam._id,
            questionId: question._id,
          })
        ).unwrap();
        showSuccess('Question deleted successfully!');
      } else {
        // If no ID, just remove from form
        const newQuestions = values.questions.filter(
          (_, idx) => idx !== qIndex
        );
        setFieldValue('questions', newQuestions);
      }
    } catch (err) {
      console.error('Failed to delete question:', err);
      showError(err || 'Failed to delete question. Please try again.');
    } finally {
      setShowDeleteModal(false);
      setQuestionToDelete(null);
    }
  };

  const openEditQuestionModal = (question) => {
    setEditingQuestion({ ...question });
    setShowEditQuestionModal(true);
  };

  const handleModalClose = () => {
    setShowEditQuestionModal(false);
    setEditingQuestion(null);
  };

  const handleQuestionSaved = () => {
    // Refresh exam data after question is saved
    dispatch(getExamByCourseId(courseId));
  };

  if (!exam) {
    return (
      <div className="container py-4">
        <div className="alert alert-info">Loading exam...</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Exam</h3>
        <div className="d-flex gap-2">
          <Button
            variant={editMode ? 'outline-secondary' : 'primary'}
            onClick={() => setEditMode(!editMode)}
          >
            <i className={`fas fa-${editMode ? 'eye' : 'edit'} me-2`}></i>
            {editMode ? 'Preview Mode' : 'Edit Mode'}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => navigate('/dashboard/manage-courses')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Courses
          </Button>
        </div>
      </div>

      <Formik
        initialValues={exam}
        validationSchema={validationSchema}
        onSubmit={handleSaveExam}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5>Exam Settings</h5>
                  {editMode && (
                    <Button variant="success" type="submit" size="sm">
                      <i className="fas fa-save me-2"></i>
                      Save Changes
                    </Button>
                  )}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <NumberInput
                      name="passingScore"
                      label="Passing Score (%)"
                      placeholder="Enter passing score"
                      min={0}
                      max={100}
                      disabled={!editMode}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <NumberInput
                      name="durationInMinutes"
                      label="Duration (minutes)"
                      placeholder="Enter duration in minutes"
                      min={1}
                      disabled={!editMode}
                      required
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Questions ({values.questions?.length || 0})</h5>
              {editMode && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    // Open modal with empty question for adding
                    setEditingQuestion({
                      questionText: '',
                      options: [
                        { text: '', isCorrect: false },
                        { text: '', isCorrect: false },
                      ],
                    });
                    setShowEditQuestionModal(true);
                  }}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add Question
                </Button>
              )}
            </div>

            <div>
              {values.questions?.map((question, qIndex) => (
                <Card
                  key={question._id}
                  className={`mb-3 ${styles.questionCard}`}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h6 className="mb-0">Question {qIndex + 1}</h6>
                      {editMode && (
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              openEditQuestionModal(question, qIndex)
                            }
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              handleDeleteQuestion(
                                qIndex,
                                setFieldValue,
                                values
                              )
                            }
                            disabled={values.questions.length === 1}
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <strong className="d-block mb-2">
                        {question.questionText}
                      </strong>
                    </div>

                    <div>
                      <strong className="d-block mb-2">Options:</strong>
                      {question.options.map((option, oIndex) => (
                        <div
                          key={oIndex}
                          className="d-flex align-items-center mb-2"
                        >
                          <div
                            className={`${styles.optionPreview} ${
                              option.isCorrect ? styles.correctOption : ''
                            }`}
                          >
                            <span className={styles.optionLabel}>
                              {String.fromCharCode(65 + oIndex)}.
                            </span>
                            <span className={styles.optionText}>
                              {option.text}
                            </span>
                            {option.isCorrect && (
                              <i className="fas fa-check-circle text-success ms-2"></i>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            {editMode && (
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button
                  variant="outline-secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                {/* <Button variant="success" type="submit">
                  <i className="fas fa-save me-2"></i>
                  Save All Changes
                </Button> */}
              </div>
            )}
          </Form>
        )}
      </Formik>

      {/* Edit/Add Question Modal */}
      <EditQuestionModal
        show={showEditQuestionModal}
        onHide={handleModalClose}
        question={editingQuestion}
        courseId={courseId}
        examId={exam?._id}
        onSuccess={handleQuestionSaved}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        title="Delete Question"
        message={`Are you sure you want to delete Question ${(questionToDelete?.qIndex || 0) + 1}? This action cannot be undone.`}
        confirmText="Delete Question"
        onConfirm={confirmDeleteQuestion}
        onCancel={() => {
          setShowDeleteModal(false);
          setQuestionToDelete(null);
        }}
      />
    </div>
  );
};

export default ManageExam;
