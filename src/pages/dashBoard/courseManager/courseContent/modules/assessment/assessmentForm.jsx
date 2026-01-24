// assessments/AssessmentFormModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import RichTextInput from '../../../../../../shared/formComponents/richTextInput';
import * as Yup from 'yup';

const assessmentSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const AssessmentFormModal = ({
  show,
  onClose,
  initialValues,
  onSubmit,
  loading,
}) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialValues ? 'Edit Assessment' : 'Add Assessment'}
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          title: initialValues?.title || '',
          description: initialValues?.description || '',
        }}
        validationSchema={assessmentSchema}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit(values);
          resetForm();
          onClose();
        }}
        enableReinitialize
      >
        {({ errors, touched, isValid }) => (
          <FormikForm>
            <Modal.Body>
              {/* Title */}
              <Form.Group className="mb-3">
                <Field
                  name="title"
                  as={Form.Control}
                  placeholder="Assessment title"
                />
                {touched.title && errors.title && (
                  <small className="text-danger">{errors.title}</small>
                )}
              </Form.Group>

              {/* Description */}
              <Form.Group>
                <RichTextInput name="description" />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>

              <Button type="submit" disabled={!isValid || loading}>
                Save
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AssessmentFormModal;
