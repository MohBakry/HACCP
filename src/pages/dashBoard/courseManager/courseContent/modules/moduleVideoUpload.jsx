import DragAndDrop from '../../../../../shared/formComponents/dragAndDropFileInput';
import { Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useToast } from '../../../../../shared/toast/useToast';
import * as Yup from 'yup';
import styles from '../styles.module.css';
import axiosClient from '../../../../../config/axiosClient';
import { useState, useRef } from 'react';
import ProgressOverlay from '../../../../../shared/overlay/progressOverlay';
import { useDispatch } from 'react-redux';
import { getCourseContent } from '../../../../../Redux/courseContent/courseContent.service';
import { useParams } from 'react-router-dom';
import * as tus from 'tus-js-client';

const moduleVideoSchema = Yup.object({
  video: Yup.mixed()
    .required('Video is required')
    .test(
      'fileType',
      'Only video files are allowed',
      (file) => file && file.type.startsWith('video/')
    ),
});

const ModuleVideoUpload = ({ module }) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [needReplace, setNeedReplace] = useState(false);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const [uploadedBytes, setUploadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);
  const uploadRef = useRef(null);
  const startTimeRef = useRef(null);
  const fileRef = useRef(null);

  const xhrRef = useRef(null); // Store XMLHttpRequest for cancellation
  // const startTimeRef = useRef(null);

  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { error: showErrorToast, success: showSuccessToast } = useToast();

  // Calculate upload speed and estimated time with better accuracy
  const calculateMetrics = (bytesUploaded, totalBytes) => {
    const now = Date.now();
    const elapsedTime = (now - startTimeRef.current) / 1000; // seconds

    if (elapsedTime > 0) {
      // Calculate speed
      const bytesPerSecond = bytesUploaded / elapsedTime;
      const mbps = (bytesPerSecond / 1024 / 1024).toFixed(2);
      setUploadSpeed(mbps);

      // Calculate ETA
      const remainingBytes = totalBytes - bytesUploaded;
      const remainingSeconds = Math.ceil(remainingBytes / bytesPerSecond);
      setEstimatedTime(remainingSeconds);
    }
  };

  // // Direct upload with XMLHttpRequest for progress tracking
  // const uploadVideo = async (file) => {
  //   console.log('Uploading video file:', file);

  //   // Reset state for fresh upload attempt
  //   setProgress(0);
  //   setUploadSpeed(0);
  //   setEstimatedTime(null);
  //   startTimeRef.current = Date.now();

  //   try {
  //     // 1️⃣ Get upload URL from backend
  //     const res = await axiosClient.post('/courses/module-video-upload-url', {
  //       fileName: file.name,
  //       fileSize: file.size,
  //       fileType: file.type,
  //     });

  //     const { uploadURL, videoId } = res.data;
  //     console.log('Received upload URL:', { videoId });

  //     setUploading(true);

  //     // 2️⃣ Upload file using XMLHttpRequest for progress tracking
  //     await new Promise((resolve, reject) => {
  //       const formData = new FormData();
  //       formData.append('file', file);

  //       const xhr = new XMLHttpRequest();
  //       xhrRef.current = xhr;

  //       xhr.upload.onprogress = (e) => {
  //         if (e.lengthComputable) {
  //           const percentage = Math.round((e.loaded / e.total) * 100);
  //           setProgress(percentage);
  //           calculateMetrics(e.loaded, e.total);
  //         }
  //       };

  //       xhr.onload = () => {
  //         if (xhr.status >= 200 && xhr.status < 300) {
  //           console.log('Upload completed successfully');
  //           resolve();
  //         } else {
  //           reject(new Error(`Upload failed with status ${xhr.status}`));
  //         }
  //       };

  //       xhr.onerror = () => {
  //         reject(new Error('Network error during upload'));
  //       };

  //       xhr.onabort = () => {
  //         reject(new Error('Upload cancelled'));
  //       };

  //       xhr.open('POST', uploadURL);
  //       // Don't set Content-Type - let browser set it with boundary for FormData
  //       xhr.send(formData);
  //     });

  //     // 3️⃣ Finalize upload on backend
  //     await axiosClient.post(
  //       `/courses/${courseId}/modules/${module._id}/video`,
  //       { videoId }
  //     );

  //     setProgress(100);
  //     setUploading(false);
  //     setUploadSpeed(0);
  //     setEstimatedTime(null);
  //     dispatch(getCourseContent(courseId));
  //   } catch (err) {
  //     if (err.message === 'Upload cancelled') {
  //       showErrorToast('Upload cancelled');
  //     } else {
  //       const errorMessage =
  //         err.response?.data?.message || err.message || 'Video upload failed';
  //       showErrorToast(errorMessage);
  //       console.error('Video upload failed:', errorMessage, err);
  //     }
  //     setUploading(false);
  //     setProgress(0);
  //     setUploadSpeed(0);
  //     setEstimatedTime(null);
  //   }
  // };

  const uploadVideo = async (file) => {
    console.log('Starting tus upload for:', file.name);

    // Reset state
    setProgress(0);
    setUploadSpeed(0);
    setEstimatedTime(null);
    setUploadedBytes(0);
    setTotalBytes(file.size);
    fileRef.current = file;
    startTimeRef.current = Date.now();

    try {
      setUploading(true);

      const res = await axiosClient.post('/courses/module-video-upload-url', {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        courseId: courseId,
        moduleId: module._id,
      });

      const { uploadURL, videoId } = res.data;

      console.log('TUS endpoint:', uploadURL);

      // 2️⃣ Create tus upload
      const upload = new tus.Upload(file, {
        // endpoint: uploadURL, // ← important
        uploadUrl: uploadURL,
        chunkSize: 5 * 1024 * 1024, // 5MB chunks (Cloudflare recommends 5-10MB)
        retryDelays: [0, 1000, 3000, 5000], // Retry delays in ms
        // resume: false,
        // removeFingerprintOnSuccess: true,
        // storeFingerprintForResuming: false,
        metadata: {
          name: file.name,
          filetype: file.type,
          // videoid: videoId,
          // courseid: courseId,
          // moduleid: module._id,
        },

        // // Headers for Cloudflare

        // Callback for progress events
        onProgress: (bytesUploaded, bytesTotal) => {
          const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
          setProgress(percentage);
          setUploadedBytes(bytesUploaded);
          calculateMetrics(bytesUploaded, bytesTotal);
        },

        // Callback for successful upload
        onSuccess: async () => {
          console.log('Upload completed successfully');

          try {
            // 3️⃣ Finalize upload on backend
            await axiosClient.post(
              `/courses/${courseId}/modules/${module._id}/video`,
              {
                videoId,
                fileName: file.name,
                fileSize: file.size,
              }
            );

            setProgress(100);
            showSuccessToast('Video uploaded successfully');

            // Refresh course content
            dispatch(getCourseContent(courseId));
          } catch (error) {
            console.error('Failed to finalize upload:', error);
            showErrorToast('Upload completed but failed to update course');
          } finally {
            setUploading(false);
            setUploadSpeed(0);
            setEstimatedTime(null);
            uploadRef.current = null;
            fileRef.current = null;
          }
        },

        // Callback for errors
        onError: (error) => {
          console.error('Upload failed:', error);

          // Check if it's an abort error
          if (error.message && error.message.includes('abort')) {
            showErrorToast('Upload cancelled');
          } else {
            showErrorToast(error.message || 'Upload failed');
          }

          setUploading(false);
          setProgress(0);
          setUploadSpeed(0);
          setEstimatedTime(null);
          uploadRef.current = null;
          fileRef.current = null;
        },

        // Callback for chunk upload complete (useful for debugging)
        onAfterResponse: (req, res) => {
          console.log(`Chunk uploaded: ${res.getStatus()}`);
        },
      });

      // Store upload reference for cancellation
      uploadRef.current = upload;
      // upload.start();
      // Check for previous uploads to resume
      upload.findPreviousUploads().then((previousUploads) => {
        if (previousUploads.length > 0) {
          // Resume the most recent upload
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }

        // Start the upload
        upload.start();
      });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || 'Video upload failed';
      showErrorToast(errorMessage);
      console.error('Video upload failed:', errorMessage, err);
      setUploading(false);
      setProgress(0);
      setUploadSpeed(0);
      setEstimatedTime(null);
    }
  };

  // Cancel upload
  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      console.log('Upload cancelled');
    }
    setUploading(false);
    setProgress(0);
    setUploadSpeed(0);
    setEstimatedTime(null);
  };

  // Format time for display
  const formatTime = (seconds) => {
    if (!seconds || seconds < 0) return 'Calculating...';
    if (seconds < 60) return `${Math.ceil(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Format bytes for display
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 1️⃣ Video already exists → show preview
  if (module.moduleVideoUrl) {
    return (
      <div>
        <iframe
          src={module.moduleVideoUrl}
          width="100%"
          height="400"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="mb-2"
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
              {needReplace && (
                <DragAndDrop
                  name="video"
                  accept="video/*"
                  disabled={uploading}
                />
              )}

              <div className="w-100 d-flex justify-content-end gap-2 mt-3">
                {uploading ? (
                  <Button variant="danger" onClick={cancelUpload}>
                    <i className="fas fa-times me-2"></i>
                    Cancel
                  </Button>
                ) : !needReplace ? (
                  <Button
                    type="button"
                    className={`${styles.button}`}
                    onClick={() => setNeedReplace(true)}
                  >
                    Replace Video
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className={`${styles.button}`}
                    disabled={!isValid || uploading}
                  >
                    Replace Video
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
        {uploading && (
          <ProgressOverlay
            isLoading={uploading}
            progress={progress}
            uploadSpeed={uploadSpeed}
            estimatedTime={formatTime(estimatedTime)}
            uploadedBytes={formatBytes(uploadedBytes)}
            totalBytes={formatBytes(totalBytes)}
          />
        )}
      </div>
    );
  }

  // 2️⃣ No video → upload new one
  return (
    <div>
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

            <div className="w-100 d-flex justify-content-end gap-2 mt-3">
              {uploading ? (
                <Button variant="danger" onClick={cancelUpload}>
                  <i className="fas fa-times me-2"></i>
                  Cancel Upload
                </Button>
              ) : (
                <Button
                  type="submit"
                  className={`${styles.button}`}
                  disabled={!isValid || uploading}
                >
                  Submit
                </Button>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {uploading && (
        <ProgressOverlay
          isLoading={uploading}
          progress={progress}
          uploadSpeed={uploadSpeed}
          estimatedTime={formatTime(estimatedTime)}
        />
      )}
    </div>
  );
};

export default ModuleVideoUpload;
