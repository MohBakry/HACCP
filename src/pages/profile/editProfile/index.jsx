import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles.module.css';
import img from '../../../assets/images/profile.png';
import {
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBriefcase,
  FaUserGraduate,
  FaInfoCircle,
  FaCamera,
} from 'react-icons/fa';
import {
  getUserProfile,
  updateUserProfile,
} from '../../../Redux/profile/profile.service';
import { useToast } from '../../../shared/toast/useToast';
import LoadingSpinner from '../../../shared/LoadingSpinner';

// Validation schema
const profileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters')
    .required('Name is required'),
  phoneNumber: Yup.string()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Invalid phone number'
    )
    .nullable(),
  gender: Yup.string().oneOf(['male', 'female', 'other', ''], 'Invalid gender'),
  bio: Yup.string().max(500, 'Bio must not exceed 500 characters'),
  jobTitle: Yup.string().max(100, 'Job title must not exceed 100 characters'),
});

export default function Profile() {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (error.getUserProfile) {
      showError(error.getUserProfile);
    }
  }, [error.getUserProfile, showError]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setPreviewImage(null);
    setImageFile(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        showError('Please upload a valid image file (JPG, PNG, WEBP, or GIF)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('Image size must be less than 5MB');
        return;
      }

      setImageFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();

      // Append only changed fields
      if (values.name !== profile?.name) formData.append('name', values.name);
      if (values.phoneNumber !== profile?.phoneNumber)
        formData.append('phoneNumber', values.phoneNumber);
      if (values.gender !== profile?.gender)
        formData.append('gender', values.gender);
      if (values.bio !== profile?.bio) formData.append('bio', values.bio);
      if (values.jobTitle !== profile?.jobTitle)
        formData.append('jobTitle', values.jobTitle);
      if (imageFile) formData.append('profilePicture', imageFile);

      await dispatch(updateUserProfile(formData)).unwrap();

      showSuccess('Profile updated successfully!');
      setIsEditing(false);
      setPreviewImage(null);
      setImageFile(null);
    } catch (err) {
      showError(err || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading.getUserProfile) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="container py-5 text-center">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 text-center border-end">
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src={previewImage || profile.profilePicture || img}
                      alt="Profile"
                      className="rounded-circle shadow-sm"
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'cover',
                        border: '4px solid #fff'
                      }}
                    />
                    {isEditing && (
                      <label
                        htmlFor="imageUpload"
                        className="position-absolute bottom-0 end-0 bg-dark text-white rounded-circle d-flex align-items-center justify-content-center"
                        style={{ 
                          cursor: 'pointer', 
                          width: '40px', 
                          height: '40px',
                          border: '3px solid #fff'
                        }}
                      >
                        <FaCamera size={16} />
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="d-none"
                          onChange={handleImageChange}
                        />
                      </label>
                    )}
                  </div>
                  <h4 className="mb-1 fw-bold text-dark">{profile.name}</h4>
                  <p className="text-muted mb-0">{profile.jobTitle || 'Student'}</p>
                </div>

        {isEditing ? (
          <div className="col-md-8 ps-md-4">
            <h5 className="mb-4 fw-semibold">Edit Profile</h5>
            <Formik
              initialValues={{
                name: profile.name || '',
                phoneNumber: profile.phoneNumber || '',
                gender: profile.gender || '',
                bio: profile.bio || '',
                jobTitle: profile.jobTitle || '',
              }}
              validationSchema={profileValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="name"
                      className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-muted">Email (Read-only)</label>
                    <input
                      className="form-control bg-light"
                      value={profile.email}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phone</label>
                    <Field
                      name="phoneNumber"
                      className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                      placeholder="+1 234 567 890"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Gender</label>
                    <Field
                      as="select"
                      name="gender"
                      className={`form-select ${touched.gender && errors.gender ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Job Title</label>
                    <Field
                      name="jobTitle"
                      className={`form-control ${touched.jobTitle && errors.jobTitle ? 'is-invalid' : ''}`}
                      placeholder="e.g. Software Developer"
                    />
                    <ErrorMessage
                      name="jobTitle"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Bio</label>
                    <Field
                      as="textarea"
                      name="bio"
                      rows="3"
                      className={`form-control ${touched.bio && errors.bio ? 'is-invalid' : ''}`}
                      placeholder="Tell us about yourself..."
                    />
                    <ErrorMessage
                      name="bio"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-dark px-4"
                      disabled={isSubmitting || loading.updateUserProfile}
                    >
                      {isSubmitting || loading.updateUserProfile ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={handleEditToggle}
                      disabled={isSubmitting || loading.updateUserProfile}
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="col-md-8 ps-md-4">
            <h5 className="mb-4 fw-semibold">Profile Information</h5>
            
            <div className="mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center">
                <FaEnvelope className="text-muted me-3" size={18} />
                <div>
                  <small className="text-muted d-block">Email</small>
                  <span className="fw-medium">{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center">
                <FaPhone className="text-muted me-3" size={18} />
                <div>
                  <small className="text-muted d-block">Phone</small>
                  <span className="fw-medium">{profile.phoneNumber || 'Not provided'}</span>
                </div>
              </div>
            </div>

            <div className="mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center">
                <FaVenusMars className="text-muted me-3" size={18} />
                <div>
                  <small className="text-muted d-block">Gender</small>
                  <span className="fw-medium text-capitalize">{profile.gender || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center">
                <FaBriefcase className="text-muted me-3" size={18} />
                <div>
                  <small className="text-muted d-block">Job Title</small>
                  <span className="fw-medium">{profile.jobTitle || 'Not specified'}</span>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex align-items-start">
                <FaInfoCircle className="text-muted me-3 mt-1" size={18} />
                <div className="flex-grow-1">
                  <small className="text-muted d-block">Bio</small>
                  <p className="mb-0 text-secondary">{profile.bio || 'No bio provided'}</p>
                </div>
              </div>
            </div>

            <button
              className="btn btn-outline-dark px-4"
              onClick={handleEditToggle}
            >
              <i className="fas fa-edit me-2"></i>
              Edit Profile
            </button>
          </div>
        )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
