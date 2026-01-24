import DragAndDrop from '../../../../shared/formComponents/dragAndDropFileInput';
import { Accordion, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.css';
import axiosClient from '../../../../config/axiosClient';
import { useState } from 'react';

const moduleVideoSchema = Yup.object({
  video: Yup.mixed()
    .required('Video is required')
    .test(
      'fileType',
      'Only video files are allowed',
      (file) => file && file.type.startsWith('video/')
    ),
});

const IntroVideoUpload = () => {
  const [progress, setProgress] = useState(0);
  const [videoId, setVideoId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadVideo = async (file) => {
    console.log('Uploading video file:', file);

    // 1️⃣ Get upload URL from backend
    const res = await axiosClient.post('/courses/intro-video-upload-url');

    const { uploadURL, videoId } = res.data;

    // 2️⃣ Upload video to Cloudflare
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', uploadURL);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      console.log('Upload completed');
      setVideoId(videoId);
    };

    xhr.onerror = () => {
      console.error('Video upload failed');
    };

    xhr.send(formData);
  };

  // 1️⃣ Video already exists → show preview
  if (false) {
    return (
      <Accordion.Item eventKey={0}>
        <Accordion.Header>Course Introduction Video</Accordion.Header>

        <Accordion.Body>
          <div>
            <video controls width="100%" src={''} className="mb-2" />

            <Formik
              initialValues={{ video: null }}
              validationSchema={moduleVideoSchema}
              onSubmit={(values, { resetForm }) => {
                //     onUpload(values.video);
                resetForm();
              }}
            >
              {({ isValid }) => (
                <Form>
                  <DragAndDrop
                    name="video"
                    accept="video/*"
                    disabled={uploading}
                  />

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
        </Accordion.Body>
      </Accordion.Item>
    );
  }

  // 2️⃣ No video → upload new one
  return (
    <Accordion.Item eventKey={0}>
      <Accordion.Header>Course Introduction Video</Accordion.Header>

      <Accordion.Body>
        <Formik
          initialValues={{ video: null }}
          validationSchema={moduleVideoSchema}
          onSubmit={async (values, { resetForm }) => {
            await uploadVideo(values.video);
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
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default IntroVideoUpload;
