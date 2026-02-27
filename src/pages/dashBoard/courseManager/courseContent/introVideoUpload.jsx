import DragAndDrop from '../../../../shared/formComponents/dragAndDropFileInput';
import { Accordion, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.css';
import axiosClient from '../../../../config/axiosClient';
import { useState } from 'react';
import ProgressOverlay from '../../../../shared/overlay/progressOverlay';
import { useDispatch } from 'react-redux';
import { getCourseContent } from '../../../../Redux/courseContent/courseContent.service';

const moduleVideoSchema = Yup.object({
  video: Yup.mixed()
    .required('Video is required')
    .test(
      'fileType',
      'Only video files are allowed',
      (file) => file && file.type.startsWith('video/')
    ),
});

const IntroVideoUpload = ({ course }) => {
  const [progress, setProgress] = useState(0);
  // const [videoId, setVideoId] = useState(null);
  const [uploading, setUploading] = useState(false);
  // const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const uploadVideo = async (file) => {
    console.log('Uploading video file:', file);

    // 1️⃣ Get upload URL from backend
    const res = await axiosClient.post('/courses/intro-video-upload-url');

    const { uploadURL, videoId } = res.data;
    setUploading(true);
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
      // setVideoId(videoId);
      axiosClient
        .post(`/courses/${course._id}/intro-video`, { videoId })
        .then(() => {
          setUploading(false);
          dispatch(getCourseContent(course._id));
        })
        .catch(() => {
          // setError('Failed to save video info');
          setUploading(false);
        });
    };

    xhr.onerror = () => {
      console.error('Video upload failed');
    };

    xhr.send(formData);
  };

  // 1️⃣ Video already exists → show preview
  if (course?.introVideoUrl) {
    return (
      <Accordion.Item eventKey={0}>
        <Accordion.Header>Course Introduction Video</Accordion.Header>

        <Accordion.Body>
          <div>
            <iframe
              src={course.introVideoUrl}
              width="100%"
              height="400"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />

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
                      Replace Video
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <ProgressOverlay isLoading={uploading} progress={progress} />
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
        <ProgressOverlay isLoading={uploading} progress={progress} />
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default IntroVideoUpload;
