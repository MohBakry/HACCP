import React, { useEffect } from 'react';
import style from './styles.module.css';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/auth/user.service';
import { setRole } from '../../../Redux/auth/user.store';
import TextInput from '../../../shared/formComponents/textInput';
import PasswordInput from '../../../shared/formComponents/passwordInput';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDashboard, setIsDashboard] = React.useState(false);

  useEffect(() => {
    if (currentPath.includes('dashboard')) {
      setIsDashboard(true);
    }
  }, [currentPath]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Enter a valid email'),
    password: Yup.string().required('Password is required'),
  });

  async function submitForm(values) {
    dispatch(login(values))
      .unwrap()
      .then((res) => {
        console.log('login res', res);
        const role = res?.user?.role;
        switch (role) {
          case 'admin':
            if (currentPath.includes('dashboard')) {
              navigate('/dashboard/manage-courses');
            }
            break;
          case 'instructor':
            if (currentPath.includes('dashboard')) {
              navigate('/dashboard/manage-courses');
            }
            break;
          case 'student':
            navigate('/my-courses');
            break;
          default:
            break;
        }
        // if (currentPath.includes('dashboard')) {
        //   if (values.email.toLowerCase().includes('instructor')) {
        //     dispatch(setRole('instructor'));
        //     navigate('/dashboard/instructor-courses');
        //     return;
        //   } else {
        //     dispatch(setRole('admin'));
        //     navigate('/dashboard/manage-courses');
        //   }
        // } else {
        //   dispatch(setRole('student'));
        //   navigate('/my-courses');
        // }
      });
  }
  const initialValues = {
    email: '',
    password: '',
  };

  // const formik = useFormik({
  //   onSubmit: submitForm,
  //   validationSchema,
  // });

  return (
    <div
      className={`${style.login} login d-flex align-items-center justify-content-center vh-100`}
    >
      <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
        <h2 className="text-white text-center pb-3">Sign in</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={submitForm}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleChange,
            handleBlur,
          }) => (
            <Form>
              <TextInput
                label={'Email'}
                type="email"
                name="email"
                className="form-control mb-3"
                labelClassName="text-light"
                placeholder="Enter your email"
                value={values.email}
                required
              />
              <PasswordInput
                label="Password"
                type="password"
                name="password"
                className="form-control my-3 text-light"
                placeholder="Enter your password"
                labelClassName="text-light"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <div className="d-flex">
                <input type="checkbox" className={`${style.checkBox} m-2`} />{' '}
                <span className={`${style.textColor} m-2`}>Remember me</span>
                <Link
                  className={`${style.link} ms-auto text-decoration-none`}
                  to="/"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={!(isValid && dirty)}
                className={`${style.btns} btn w-100 my-3`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </Form>
          )}
        </Formik>
        {!isDashboard && (
          <div className="d-flex">
            <h6 className={`${style.textColor}`}>
              Don&apos;t have an account yet?
            </h6>
            <Link
              className={`${style.link} ms-auto text-decoration-none`}
              to="/register"
            >
              Sign Up Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
