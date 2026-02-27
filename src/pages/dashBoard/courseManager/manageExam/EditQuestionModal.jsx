import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import TextAreaInput from '../../../../shared/formComponents/textAreaInput';
import TextInput from '../../../../shared/formComponents/TextInput';
import { useToast } from '../../../../shared/toast/useToast';
import {
  addQuestion,
  updateQuestion,
} from '../../../../Redux/exams/exams.service';

const validationSchema = Yup.object().shape({
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
      'Exactly one option must be marked as correct answer',
      (options) => options?.filter((opt) => opt.isCorrect).length === 1
    ),
});

const EditQuestionModal = ({
  show,
  onHide,
  question,
  courseId,
  onSuccess,
  examId,
}) => {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();

  const initialValues = question || {
    questionText: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // If question has an ID, update it on backend
      if (values._id) {
        await dispatch(
          updateQuestion({
            courseId,
            examId,
            questionId: values._id,
            questionData: values,
          })
        ).unwrap();
        showSuccess('Question updated successfully!');
      } else {
        // If no ID, add it as a new question
        await dispatch(
          addQuestion({
            courseId,
            examId,
            questionData: values,
          })
        ).unwrap();
        showSuccess('Question added successfully!');
      }

      if (onSuccess) onSuccess();
      onHide();
    } catch (err) {
      console.error('Failed to save question:', err);
      showError(err || 'Failed to save question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!question) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {question._id ? 'Edit Question' : 'Add New Question'}
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => (
          <Form>
            <Modal.Body>
              <TextAreaInput
                name="questionText"
                label="Question Text"
                placeholder="Enter your question here"
                rows={3}
                required
              />

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <strong>
                    Options <span className="text-danger">*</span>
                  </strong>
                  <FieldArray name="options">
                    {({ push }) => (
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        type="button"
                        onClick={() => push({ text: '', isCorrect: false })}
                      >
                        <i className="fas fa-plus me-2"></i>
                        Add Option
                      </Button>
                    )}
                  </FieldArray>
                </div>

                <FieldArray name="options">
                  {({ remove }) => (
                    <>
                      {values.options.map((option, index) => (
                        <div key={index} className="mb-2">
                          <div className="d-flex align-items-start gap-2">
                            <div className="pt-2">
                              <BootstrapForm.Check
                                type="checkbox"
                                checked={option.isCorrect}
                                onChange={(e) => {
                                  // Uncheck all other options
                                  const newOptions = values.options.map(
                                    (opt, idx) => ({
                                      ...opt,
                                      isCorrect:
                                        idx === index
                                          ? e.target.checked
                                          : false,
                                    })
                                  );
                                  setFieldValue('options', newOptions);
                                }}
                                label=""
                              />
                            </div>
                            <div className="flex-grow-1">
                              <Field name={`options.${index}.text`}>
                                {({ field, meta }) => (
                                  <div>
                                    <BootstrapForm.Control
                                      {...field}
                                      type="text"
                                      placeholder={`Option ${index + 1}`}
                                      isInvalid={meta.touched && meta.error}
                                    />
                                    {meta.touched && meta.error && (
                                      <BootstrapForm.Control.Feedback type="invalid">
                                        {meta.error}
                                      </BootstrapForm.Control.Feedback>
                                    )}
                                  </div>
                                )}
                              </Field>
                            </div>
                            {values.options.length > 2 && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      {typeof errors.options === 'string' &&
                        touched.options && (
                          <div className="text-danger small mt-2">
                            {errors.options}
                          </div>
                        )}
                    </>
                  )}
                </FieldArray>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide} type="button">
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                <i className="fas fa-save me-2"></i>
                {isSubmitting
                  ? 'Saving...'
                  : question._id
                    ? 'Update Question'
                    : 'Add Question'}
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default EditQuestionModal;
