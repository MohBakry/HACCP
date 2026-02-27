// FeedbackGradeModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import TextInput from '../../../../../shared/formComponents/textInput';
import RichTextInput from '../../../../../shared/formComponents/richTextInput';
import * as Yup from 'yup';

const feedbackSchema = Yup.object({
  score: Yup.number()
    .required('Score is required')
    .min(0, 'Score must be at least 0')
    .max(100, 'Score cannot exceed 100'),
  feedback: Yup.string().required('Feedback is required'),
});

const FeedbackGradeModal = ({
  show,
  onHide,
  submission,
  onSubmit,
  loading,
}) => {
  if (!submission) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Add Feedback & Score - {submission.studentName}
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          score: submission.feedback?.score || '',
          feedback: submission.feedback?.comments || '',
        }}
        validationSchema={feedbackSchema}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        enableReinitialize
      >
        {({ errors, touched, isValid }) => (
          <FormikForm>
            <Modal.Body>
              <div className="mb-4 p-3 bg-light rounded">
                <h6>Assessment Details</h6>
                <p className="mb-1">
                  <strong>Student:</strong> {submission.studentName}
                </p>
                <p className="mb-1">
                  <strong>Assessment:</strong> {submission.assessmentTitle}
                </p>
                <p className="mb-0">
                  <strong>Module:</strong> {submission.moduleName}
                </p>
              </div>

              {/* Score Input */}
              <Form.Group className="mb-4">
                <Form.Label>
                  Score (0-100) <span className="text-danger">*</span>
                </Form.Label>
                <TextInput
                  name="score"
                  type="number"
                  placeholder="Enter score (0-100)"
                  required
                />
                {touched.score && errors.score && (
                  <small className="text-danger d-block mt-1">
                    {errors.score}
                  </small>
                )}
              </Form.Group>

              {/* Feedback Input */}
              <Form.Group className="mb-4">
                <Form.Label>
                  Feedback & Comments <span className="text-danger">*</span>
                </Form.Label>
                <RichTextInput
                  name="feedback"
                  placeholder="Enter detailed feedback for the student"
                />
                {touched.feedback && errors.feedback && (
                  <small className="text-danger d-block mt-1">
                    {errors.feedback}
                  </small>
                )}
              </Form.Group>

              {/* Info */}
              <div className="alert alert-info mb-0">
                <small>
                  <i className="fas fa-info-circle me-2"></i>
                  The score and feedback will be displayed to the student.
                </small>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onHide} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="success"
                disabled={!isValid || loading}
              >
                {loading ? 'Submitting...' : 'Submit Feedback & Score'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default FeedbackGradeModal;
