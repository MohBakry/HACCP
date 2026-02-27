import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import TextInput from '../../../shared/formComponents/TextInput';
import FileInput from '../../../shared/formComponents/FileInput';
import RichTextInput from '../../../shared/formComponents/richTextInput';
import SwitchInput from '../../../shared/formComponents/switchInput';
import {
  addNews,
  updateNews,
  uploadNewsImage,
  getNews,
} from '../../../Redux/news/news.service';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

const AddEditNewsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { news } = useSelector((state) => state.news);
  const { newsId } = useParams();

  const [isEditing, setIsEditing] = useState(false);
  const [newsItem, setNewsItem] = useState(null);

  // Determine if editing based on newsId
  useEffect(() => {
    if (newsId) {
      setIsEditing(true);
      const foundNews = news.find((n) => n._id === newsId);
      if (foundNews) {
        setNewsItem(foundNews);
      } else {
        // If not in state, fetch news
        dispatch(getNews());
      }
    }
  }, [newsId, news, dispatch]);

  const initialValues = newsItem
    ? {
        imageUrl: newsItem.imageUrl || '',
        imageFile: null,
        title: newsItem.title || '',
        content: newsItem.content || '',
        published: newsItem.published || false,
        highlighted: newsItem.highlighted || false,
      }
    : {
        imageUrl: '',
        imageFile: null,
        title: '',
        content: '',
        published: false,
        highlighted: false,
      };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('News Payload:', values);
    dispatch(showLoading());
    try {
      setSubmitting(true);

      let newsData;
      if (isEditing) {
        // Update news
        newsData = await dispatch(
          updateNews({
            _id: newsId,
            title: values.title,
            content: values.content,
            published: values.published,
            highlighted: values.highlighted,
          })
        ).unwrap();
      } else {
        // Create news
        newsData = await dispatch(
          addNews({
            title: values.title,
            content: values.content,
            published: values.published,
            highlighted: values.highlighted,
            createdBy: user.id,
          })
        ).unwrap();
      }

      // Upload image if provided
      if (values.imageFile) {
        await dispatch(
          uploadNewsImage({
            newsId: newsData._id,
            file: values.imageFile,
          })
        ).unwrap();
      }

      if (!isEditing) resetForm();
      navigate('/dashboard/manage-news');
    } catch (err) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
      dispatch(hideLoading());
    }
  };

  return (
    <div className="container">
      <h2>{isEditing ? 'Edit News' : 'Add New News'}</h2>
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
            <TextInput name="title" label="News Title" required />

            {/* Upload Image */}
            <FileInput
              name="imageFile"
              label="Upload Image"
              accept="image/*"
              onChange={(file) => {
                console.log(file, 'file');
                setFieldValue('imageFile', file);
              }}
            />
            {isEditing && !values.imageFile ? (
              <img
                src={values.imageUrl}
                alt="preview"
                style={{ width: 200, marginBottom: 10 }}
              />
            ) : (
              values.imageFile && (
                <img
                  src={URL.createObjectURL(values.imageFile)}
                  alt="preview"
                  style={{ width: 200, marginBottom: 10 }}
                />
              )
            )}

            {/* Rich Description */}
            <RichTextInput name="content" label="News Content" required />

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard/manage-news')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isEditing ? 'Update News' : 'Save News'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditNewsPage;
