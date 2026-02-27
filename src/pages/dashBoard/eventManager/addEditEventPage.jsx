import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import TextInput from '../../../shared/formComponents/TextInput';
import FileInput from '../../../shared/formComponents/FileInput';
import RichTextInput from '../../../shared/formComponents/richTextInput';
import SwitchInput from '../../../shared/formComponents/switchInput';
import {
  addEvent,
  updateEvent,
  uploadEventImage,
  getEventById,
} from '../../../Redux/events/events.service';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../../Redux/root/root.store';

const AddEditEventPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { event } = useSelector((state) => state.events);
  const { eventId } = useParams();

  const [isEditing, setIsEditing] = useState(false);

  // Determine if editing based on eventId
  useEffect(() => {
    if (eventId) {
      dispatch(showLoading());
      setIsEditing(true);

      dispatch(getEventById(eventId));

      dispatch(hideLoading());
    }
  }, [eventId, dispatch]);

  const initialValues = event
    ? {
        image: event.image || '',
        imageFile: null,
        title: event.title || '',
        description: event.description || '',
        date: event.date ? event.date.split('T')[0] : '', // Format for date input
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        location: event.location || '',
        published: event.published || false,
        highlighted: event.highlighted || false,
        imageUrl: event.imageUrl || '',
      }
    : {
        image: '',
        imageFile: null,
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        published: false,
        highlighted: false,
      };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    date: Yup.date().required('Date is required'),
    startTime: Yup.string().required('Start time is required'),
    endTime: Yup.string().required('End time is required'),
    location: Yup.string().required('Location is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log('Event Payload:', values);
    dispatch(showLoading());
    try {
      setSubmitting(true);

      let eventData;
      if (isEditing) {
        // Update event
        eventData = await dispatch(
          updateEvent({
            _id: eventId,
            title: values.title,
            description: values.description,
            date: values.date,
            startTime: values.startTime,
            endTime: values.endTime,
            location: values.location,
            published: values.published,
            highlighted: values.highlighted,
          })
        ).unwrap();
      } else {
        // Create event
        eventData = await dispatch(
          addEvent({
            title: values.title,
            description: values.description,
            date: values.date,
            startTime: values.startTime,
            endTime: values.endTime,
            location: values.location,
            published: values.published,
            highlighted: values.highlighted,
            createdBy: user.id,
          })
        ).unwrap();
      }

      // Upload image if provided
      if (values.imageFile) {
        await dispatch(
          uploadEventImage({
            eventId: eventData._id,
            file: values.imageFile,
          })
        ).unwrap();
      }

      // alert(`Event ${isEditing ? 'updated' : 'created'} successfully`);
      if (!isEditing) resetForm();
      navigate('/dashboard/manage-events');
    } catch (err) {
      alert(err?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
      dispatch(hideLoading());
    }
  };

  return (
    <div className="container">
      <h2>{isEditing ? 'Edit Event' : 'Add New Event'}</h2>
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

            {/* Title */}
            <TextInput name="title" label="Event Title" required />

            {/* Date */}
            <TextInput name="date" label="Event Date" type="date" required />

            {/* Start Time */}
            <TextInput
              name="startTime"
              label="Start Time"
              type="time"
              required
            />

            {/* End Time */}
            <TextInput name="endTime" label="End Time" type="time" required />

            {/* Location */}
            <TextInput name="location" label="Location" required />

            {/* Rich Description */}
            <RichTextInput
              name="description"
              label="Event Description"
              required
            />

            {/* Actions */}
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard/manage-events')}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-success"
                disabled={isSubmitting}
              >
                {isEditing ? 'Update Event' : 'Save Event'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddEditEventPage;
