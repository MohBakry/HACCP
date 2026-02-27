// materials/MaterialUploadModal.jsx
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import DragAndDrop from '../../../../../../shared/formComponents/dragAndDropFileInput';
import LoadingOverlay from '../../../../../../shared/overlay/loadingOverlay';
import { uploadMaterial } from '../../../../../../Redux/courses/courses.service';
import { getCourseContent } from '../../../../../../Redux/courseContent/courseContent.service';
import TextInput from '../../../../../../shared/formComponents/textInput';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const materialSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  file: Yup.mixed().required('File is required'),
});

const MaterialFormModal = ({ show, onClose, moduleId, material }) => {
  const dispatch = useDispatch();
  // const uploading = useSelector(
  //   (state) => state.courses.loading.uploadMaterial
  // );
  const { courseId } = useParams();
  const [uploading, setUploading] = useState(false);

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
          console.log('submitted values:', values);
          setUploading(true);
          await dispatch(
            uploadMaterial({
              courseId,
              moduleId,
              title: values.title,
              file: values.file,
            })
          ).unwrap();

          // Refresh course content after upload
          dispatch(getCourseContent(courseId));

          resetForm();
          onClose();
          setUploading(false);
        }}
      >
        {({ errors, touched, isValid }) => (
          <FormikForm>
            <Modal.Body>
              <TextInput
                label={'Title'}
                name="title"
                placeholder="Material title"
              />
              <DragAndDrop name="file" accept=".pdf,.ppt,.pptx" />
              {touched.file && errors.file && (
                <small className="text-danger">{errors.file}</small>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button type="submit" disabled={uploading || !isValid}>
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
