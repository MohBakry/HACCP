import React, { useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Form as BootstrapForm } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NumberInput from '../../../../shared/formComponents/numberInput';
import TextAreaInput from '../../../../shared/formComponents/textAreaInput';
import { useToast } from '../../../../shared/toast/useToast';
import { createExam } from '../../../../Redux/exams/exams.service';
import { showLoading, hideLoading } from '../../../../Redux/root/root.store';
import styles from './styles.module.css';

const validationSchema = Yup.object().shape({
  passingScore: Yup.number()
    .required('Passing score is required')
    .min(0, 'Must be at least 0')
    .max(100, 'Must be at most 100'),
  duration: Yup.number()
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

const CreateExam = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { showError } = useToast();
  const { loading } = useSelector((state) => state.exams);

  useEffect(() => {
    if (loading.createExam) {
      dispatch(showLoading());
    } else {
      dispatch(hideLoading());
    }
  }, [loading.createExam, dispatch]);

  const initialValues = {
    passingScore: 70,
    duration: 60,
    questions: [
      {
        questionText: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
        ],
      },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(
        createExam({
          courseId,
          examData: values,
        })
      ).unwrap();

      navigate(`/dashboard/manage-courses/${courseId}/manage-exam`);
    } catch (err) {
      console.error('Failed to create exam:', err);
      showError(err || 'Failed to create exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Create Exam</h3>
        <Button
          variant="outline-secondary"
          onClick={() => navigate('/dashboard/manage-courses')}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Back to Courses
        </Button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, setFieldValue }) => (
          <Form>
            <Card className="mb-4">
              <Card.Body>
                <h5 className="mb-3">Exam Settings</h5>
                <div className="row">
                  <div className="col-md-6">
                    <NumberInput
                      name="passingScore"
                      label="Passing Score (%)"
                      placeholder="Enter passing score"
                      min={0}
                      max={100}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <NumberInput
                      name="durationInMinutes"
                      label="Duration (minutes)"
                      placeholder="Enter duration in minutes"
                      min={1}
                      required
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Questions</h5>
              <FieldArray name="questions">
                {({ push }) => (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      push({
                        questionText: '',
                        options: [
                          { text: '', isCorrect: false },
                          { text: '', isCorrect: false },
                        ],
                      })
                    }
                  >
                    <i className="fas fa-plus me-2"></i>
                    Add Question
                  </Button>
                )}
              </FieldArray>
            </div>

            <FieldArray name="questions">
              {({ remove }) => (
                <>
                  {values.questions.map((question, qIndex) => (
                    <Card key={qIndex} className="mb-3">
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h6>Question {qIndex + 1}</h6>
                          {values.questions.length > 1 && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => remove(qIndex)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          )}
                        </div>

                        <TextAreaInput
                          name={`questions.${qIndex}.questionText`}
                          label="Question Text"
                          placeholder="Enter question text"
                          rows={2}
                          required
                        />

                        <div className="mb-2">
                          <strong>Options:</strong>
                        </div>

                        <FieldArray name={`questions.${qIndex}.options`}>
                          {({ push: pushOption, remove: removeOption }) => (
                            <>
                              {question.options.map((option, oIndex) => (
                                <div
                                  key={oIndex}
                                  className={`${styles.optionRow} mb-2`}
                                >
                                  <div className="d-flex align-items-center gap-2">
                                    <BootstrapForm.Check
                                      type="checkbox"
                                      checked={option.isCorrect}
                                      onChange={(e) => {
                                        // Uncheck all other options
                                        const newOptions = question.options.map(
                                          (opt, idx) => ({
                                            ...opt,
                                            isCorrect:
                                              idx === oIndex
                                                ? e.target.checked
                                                : false,
                                          })
                                        );
                                        setFieldValue(
                                          `questions.${qIndex}.options`,
                                          newOptions
                                        );
                                      }}
                                      label=""
                                      className={styles.correctCheckbox}
                                    />
                                    <Field
                                      name={`questions.${qIndex}.options.${oIndex}.text`}
                                      type="text"
                                      className={`form-control ${
                                        errors.questions?.[qIndex]?.options?.[
                                          oIndex
                                        ]?.text &&
                                        touched.questions?.[qIndex]?.options?.[
                                          oIndex
                                        ]?.text
                                          ? 'is-invalid'
                                          : ''
                                      }`}
                                      placeholder={`Option ${oIndex + 1}`}
                                    />
                                    {question.options.length > 2 && (
                                      <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => removeOption(oIndex)}
                                      >
                                        <i className="fas fa-times"></i>
                                      </Button>
                                    )}
                                  </div>
                                  {errors.questions?.[qIndex]?.options?.[oIndex]
                                    ?.text &&
                                    touched.questions?.[qIndex]?.options?.[
                                      oIndex
                                    ]?.text && (
                                      <div className="text-danger small mt-1">
                                        {
                                          errors.questions[qIndex].options[
                                            oIndex
                                          ].text
                                        }
                                      </div>
                                    )}
                                </div>
                              ))}

                              <Button
                                variant="outline-secondary"
                                size="sm"
                                className="mt-2"
                                onClick={() =>
                                  pushOption({ text: '', isCorrect: false })
                                }
                              >
                                <i className="fas fa-plus me-2"></i>
                                Add Option
                              </Button>

                              {typeof errors.questions?.[qIndex]?.options ===
                                'string' && (
                                <div className="text-danger small mt-2">
                                  {errors.questions[qIndex].options}
                                </div>
                              )}
                            </>
                          )}
                        </FieldArray>
                      </Card.Body>
                    </Card>
                  ))}
                </>
              )}
            </FieldArray>

            {typeof errors.questions === 'string' && (
              <div className="alert alert-danger">{errors.questions}</div>
            )}

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/dashboard/manage-courses')}
              >
                Cancel
              </Button>
              <Button variant="success" type="submit">
                <i className="fas fa-save me-2"></i>
                Create Exam
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateExam;
