import React, { useEffect } from "react";
import style from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/auth/user.service";
import { setRole } from "../../Redux/auth/user.store";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const location = useLocation();
  const currentPath = location.pathname;
  const [isDashboard, setIsDashboard] = React.useState(false);

  useEffect(() => {
    if (currentPath.includes("dashboard")) {
      setIsDashboard(true);
    }
  }, [currentPath]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Invalid password"
      ),
  });

  async function submitForm(values) {
    dispatch(login(values))
      .unwrap()
      .then(() => {
        if (currentPath.includes("dashboard")) {
          if (values.email.toLowerCase().includes("instructor")) {
            dispatch(setRole("instructor"));
            navigate("/dashboard/instructor-courses");
            return;
          } else {
            dispatch(setRole("admin"));
            navigate("/dashboard/manage-courses");
          }
        } else {
          dispatch(setRole("student"));
          navigate("/my-courses");
        }
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submitForm,
    validationSchema,
  });

  return (
    <div
      className={`${style.login} login d-flex align-items-center justify-content-center vh-100`}
    >
      <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
        <h2 className="text-white text-center pb-3">Sign in</h2>

        <form onSubmit={formik.handleSubmit}>
          {error && <div className="alert alert-info">{error}</div>}

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="alert text-white">{formik.errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            className="form-control my-3"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="alert text-white">{formik.errors.password}</div>
          )}

          <div className="d-flex">
            <input type="checkbox" className={`${style.checkBox} m-2`} />{" "}
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
            disabled={!(formik.isValid && formik.dirty)}
            className={`${style.btns} btn w-100 my-3`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
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
