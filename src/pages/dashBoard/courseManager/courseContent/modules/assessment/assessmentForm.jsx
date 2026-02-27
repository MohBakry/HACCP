// assessments/AssessmentFormModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field } from 'formik';
import RichTextInput from '../../../../../../shared/formComponents/richTextInput';
import TextInput from '../../../../../../shared/formComponents/textInput';
import DragAndDrop from '../../../../../../shared/formComponents/dragAndDropFileInput';
import * as Yup from 'yup';

const assessmentSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  file: Yup.mixed().nullable(),
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
          file: null,
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
              <TextInput
                name="title"
                label="Assessment Title"
                placeholder="Enter assessment title"
                required
              />

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Description <span className="text-danger">*</span>
                </Form.Label>
                <RichTextInput name="description" />
                {touched.description && errors.description && (
                  <small className="text-danger">{errors.description}</small>
                )}
              </Form.Group>

              {/* File Upload (Optional) */}
              <Form.Group>
                <Form.Label>Assessment File (Optional)</Form.Label>
                <DragAndDrop
                  name="file"
                  accept=".pdf,.doc,.docx"
                  label="Drop assessment file here or click to browse"
                />
                {touched.file && errors.file && (
                  <small className="text-danger">{errors.file}</small>
                )}
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={onClose} disabled={loading}>
                Cancel
              </Button>

              <Button type="submit" disabled={!isValid || loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default AssessmentFormModal;
