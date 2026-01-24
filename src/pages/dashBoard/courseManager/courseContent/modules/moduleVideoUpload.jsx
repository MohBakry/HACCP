import DragAndDrop from '../../../../../shared/formComponents/dragAndDropFileInput';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from '../styles.module.css';

const moduleVideoSchema = Yup.object({
  video: Yup.mixed()
    .required('Video is required')
    .test(
      'fileType',
      'Only video files are allowed',
      (file) => file && file.type.startsWith('video/')
    ),
});

const ModuleVideoUpload = ({ module, onUpload, uploading }) => {
  // 1️⃣ Video already exists → show preview
  if (module.video) {
    return (
      <div>
        <video
          controls
          width="100%"
          src={module.video.playbackUrl}
          className="mb-2"
        />

        <Formik
          initialValues={{ video: null }}
          validationSchema={moduleVideoSchema}
          onSubmit={(values, { resetForm }) => {
            onUpload(values.video);
            resetForm();
          }}
        >
          {({ isValid }) => (
            <Form>
              <DragAndDrop name="video" accept="video/*" disabled={uploading} />

              <Button
                type="submit"
                className="mt-2"
                disabled={!isValid || uploading}
              >
                Replace Video
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  // 2️⃣ No video → upload new one
  return (
    <Formik
      initialValues={{ video: null }}
      validationSchema={moduleVideoSchema}
      onSubmit={(values, { resetForm }) => {
        onUpload(values.video);
        resetForm();
      }}
    >
      {({ isValid }) => (
        <Form>
          <DragAndDrop
            label="Module Video"
            name="video"
            accept="video/*"
            disabled={uploading}
          />
          <div className="w-100 d-flex justify-content-end">
            <Button
              type="submit"
              className={`${styles.button} mt-3`}
              disabled={!isValid || uploading}
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ModuleVideoUpload;
