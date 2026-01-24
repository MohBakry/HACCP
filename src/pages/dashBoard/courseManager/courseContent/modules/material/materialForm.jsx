// materials/MaterialUploadModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import DragAndDrop from '../../../../../../shared/formComponents/dragAndDropFileInput';
import LoadingOverlay from '../../../../../../shared/loadingOverlay';
import { uploadMaterial } from '../../../../../../Redux/courses/courses.service';

const materialSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  file: Yup.mixed().required('File is required'),
});

const MaterialFormModal = ({ show, onClose, courseId, moduleId, material }) => {
  const dispatch = useDispatch();
  const uploading = useSelector(
    (state) => state.courses.loading.uploadMaterial
  );

  const isEditing = !!material;

  return (
    <Modal show={show} onHide={onClose} centered>
      <LoadingOverlay show={uploading} text="Uploading material..." />

      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? 'Replace Material' : 'Add Material'}
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={{
          title: material?.fileName || '',
          file: null,
        }}
        validationSchema={materialSchema}
        onSubmit={async (values, { resetForm }) => {
          await dispatch(
            uploadMaterial({
              courseId,
              moduleId,
              title: values.title,
              file: values.file,
            })
          ).unwrap();

          resetForm();
          onClose();
        }}
      >
        {({ errors, touched, isValid }) => (
          <FormikForm>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Control name="title" placeholder="Material title" />
                {touched.title && errors.title && (
                  <small className="text-danger">{errors.title}</small>
                )}
              </Form.Group>

              <DragAndDrop name="file" accept=".pdf,.ppt,.pptx" />
              {touched.file && errors.file && (
                <small className="text-danger">{errors.file}</small>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" disabled={!isValid || uploading}>
                {isEditing ? 'Replace' : 'Upload'}
              </Button>
            </Modal.Footer>
          </FormikForm>
        )}
      </Formik>
    </Modal>
  );
};

export default MaterialFormModal;
