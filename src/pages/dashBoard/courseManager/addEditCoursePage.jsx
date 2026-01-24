import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import TextInput from '../../../shared/formComponents/TextInput';
import NumberInput from '../../../shared/formComponents/NumberInput';
import FileInput from '../../../shared/formComponents/FileInput';
import RichTextInput from '../../../shared/formComponents/richTextInput';
import SwitchInput from '../../../shared/formComponents/switchInput';
import SelectInput from '../../../shared/formComponents/selectInput';
import {
  addCourse,
  updateCourse,
  uploadCourseThumbnail,
  getCourses,
} from '../../../Redux/courses/courses.service';
import { useDispatch, useSelector } from 'react-redux';

const AddEditCoursePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { courses } = useSelector((state) => state.courses);
  const { courseId } = useParams(); // Get courseId from URL params

  const [isEditing, setIsEditing] = useState(false);
  const [course, setCourse] = useState(null);

  // Determine if editing based on courseId
  useEffect(() => {
    if (courseId) {
      setIsEditing(true);
      const foundCourse = courses.find((c) => c._id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        // If not in state, fetch courses
        dispatch(getCourses());
      }
    }
  }, [courseId, courses, dispatch]);

  const initialValues = course
    ? {
        image: course.image || '',
        imageFile: null,
        introVideo: course.introVideo || '',
        title: course.title || '',
        description: course.description || '',
        duration: course.duration || 0,
        price: course.price || 0,
        category: course.category || '',
        published: course.published || false,
        highlighted: course.highlighted || false,
      }
    : {
        image: '',
        imageFile: null,
        introVideo: '',
        title: '',
        description: '',
        duration: 0,
        price: 0,
        category: '',
        published: false,
        highlighted: false,
      };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    duration: Yup.number().positive().required('Duration is required'),
    price: Yup.number().min(0).required('Price is required'),
    category: Yup.string().required('Category is required'),
    // published and highlighted are optional booleans
    // imageFile and introVideo are optional
  });

  // const [progress, setProgress] = useState(0);
  // const [videoId, setVideoId] = useState(null);
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Course Payload:', values);

    try {
      setSubmitting(true);

      let courseData;
      if (isEditing) {
        // Update course
        courseData = await dispatch(
          updateCourse({
            _id: courseId,
            title: values.title,
            description: values.description,
            price: values.price,
            category: values.category,
            duration: values.duration,
            published: values.published,
            highlighted: values.highlighted,
          })
        ).unwrap();
      } else {
        // Create course
        courseData = await dispatch(
          addCourse({
            title: values.title,
            description: values.description,
            price: values.price,
            category: values.category,
            duration: values.duration,
            published: values.published,
            highlighted: values.highlighted,
            createdBy: user.id,
          })
        ).unwrap();
      }

      // Upload thumbnail if provided
      if (values.imageFile) {
        await dispatch(
          uploadCourseThumbnail({
            courseId: courseData._id,
            file: values.imageFile,
          })
        ).unwrap();
      }

      alert(`Course ${isEditing ? 'updated' : 'created'} successfully`);
      if (!isEditing) resetForm();
      navigate('/dashboard/manage-courses');
    } catch (err) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // const uploadVideo = async (file) => {
  //   console.log('Uploading video file:', file);

  //   // 1️⃣ Get upload URL from backend
  //   const res = await axiosClient.post('/courses/intro-video-upload-url');

  //   const { uploadURL, videoId } = res.data;

  //   // 2️⃣ Upload video to Cloudflare
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', uploadURL);

  //   xhr.upload.onprogress = (e) => {
  //     if (e.lengthComputable) {
  //       setProgress(Math.round((e.loaded / e.total) * 100));
  //     }
  //   };

  //   xhr.onload = () => {
  //     console.log('Upload completed');
  //     setVideoId(videoId);
  //   };

  //   xhr.onerror = () => {
  //     console.error('Video upload failed');
  //   };

  //   xhr.send(formData);
  // };

  return (
    <div className="container">
      <h2>{isEditing ? 'Edit Course' : 'Add New Course'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form>
            <div className="d-flex justify-content-between mb-3 col-4">
              <div>
                <SwitchInput label={'Published'} name="published" />
              </div>
              <div>
                <SwitchInput label={'Highlighted'} name="highlighted" />
              </div>
            </div>
            {/* Title */}
            <TextInput name="title" label="Course Title" required />

            <SelectInput
              name="category"
              label="Course Category"
              placeholder="Choose category"
              options={[
                { value: 'safety', label: 'Safety' },
                { value: 'haccp', label: 'HACCP' },
                { value: 'quality', label: 'Quality' },
              ]}
              required
            />

            {/* OR Upload Image */}
            <FileInput
              name="imageFile"
              label="Upload Image"
              accept="image/*"
              onChange={(file) => {
                console.log(file, 'file');
                setFieldValue('imageFile', file);
              }}
            />
            {console.log(values.imageFile, 'values.imageFile')}
            {values.imageFile && (
              <img
                src={URL.createObjectURL(values.imageFile)}
                alt="preview"
                style={{ width: 200, marginBottom: 10 }}
              />
            )}

            {/* Intro Video */}
            <TextInput
              name="introVideo"
              label="Intro Video URL"
              placeholder="https://..."
            />

            {/* Rich Description */}
            <RichTextInput
              name="description"
              label="Course Description"
              required
            />

            {/* Duration */}
            <NumberInput name="duration" label="Duration (hours)" />

            {/* Price */}
            <NumberInput name="price" label="Price" />

            {/* OR Upload Intro Video
            <FileInput
              name="introVideoFile"
              label="Upload Intro Video"
              accept="video/*"
              onChange={(file) => uploadVideo(file)}
            /> */}

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/courses')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isEditing ? 'Update Course' : 'Save Course'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditCoursePage;
