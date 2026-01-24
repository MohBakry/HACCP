import React from 'react';
import style from './styles.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PasswordInput from '../../../shared/formComponents/passwordInput';
import { resetPassword } from '../../../Redux/auth/user.service';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const validationSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        'Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  function submitForm(values) {
    if (!token) return;

    dispatch(
      resetPassword({
        email,
        token,
        password: values.password,
      })
    )
      .unwrap()
      .then(() => {
        navigate('/login');
      });
  }

  if (!token) {
    return (
      <div className="text-center text-danger mt-5">
        Invalid or expired reset link
      </div>
    );
  }

  return (
    <div
      className={`${style.login} d-flex align-items-center justify-content-center vh-100`}
    >
      <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
        <h2 className="text-white text-center pb-3">Set New Password</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
          {({ values, handleChange, handleBlur, isValid, dirty }) => (
            <Form>
              <PasswordInput
                label="New Password"
                name="password"
                type="password"
                placeholder="Enter new password"
                className="form-control my-3"
                labelClassName="text-light"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              <PasswordInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="form-control my-3"
                labelClassName="text-light"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              {error && (
                <div className="text-danger text-center mb-2">{error}</div>
              )}

              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={`${style.btns} btn w-100 my-3`}
              >
                {loading ? 'Saving...' : 'Set Password'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
