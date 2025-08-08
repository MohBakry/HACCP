import React from "react";
import style from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../Redux/auth/user.service";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);

  const users = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("name required")
      .min(3, "min 3")
      .max(20, "max 20"),
    email: Yup.string().required("email required").email("enter valid email"),
    phone: Yup.string()
      .required("phone required")
      .matches(/^01[0125][0-9]{8}$/),
    password: Yup.string()
      .required("password required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character, and be at least 8 characters long"
      ),
    rePassword: Yup.string()
      .required("password matching required")
      .oneOf([Yup.ref("password")]),
  });

  async function submitForm(values) {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        navigate("/my-courses");
      });
  }

  const formik = useFormik({
    initialValues: users,
    onSubmit: submitForm,
    validationSchema,
  });
  return (
    <>
      <div
        className={`${style.login} login d-flex align-items-center justify-content-center  vh-100 `}
      >
        <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
          <h2 className="text-white text-center pb-3">Register Now</h2>
          <form onSubmit={formik.handleSubmit}>
            {error && <div className="alert alert-info">{error}</div>}

            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              className="form-control my-3"
              name="name"
              id="userName"
              placeholder="Full Name"
            />
            {formik.errors.name && formik.touched.name && (
              <div className="alert text-white">{formik.errors.name}</div>
            )}
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              className="form-control my-3"
              name="email"
              id="email"
              placeholder=" Email"
            />

            {formik.errors.name && formik.touched.email && (
              <div className="alert text-white">{formik.errors.email}</div>
            )}

            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="tel"
              className="form-control my-3"
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />

            {formik.errors.name && formik.touched.phone && (
              <div className="alert text-white">{formik.errors.phone}</div>
            )}

            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              className="form-control my-3"
              name="password"
              id="password"
              placeholder="Password"
            />

            {formik.errors.name && formik.touched.password && (
              <div className="alert text-white">{formik.errors.password}</div>
            )}

            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              className="form-control my-3"
              name="rePassword"
              id="rePassword"
              placeholder="re-Password"
            />

            {formik.errors.name && formik.touched.rePassword && (
              <div className="alert text-white">{formik.errors.rePassword}</div>
            )}

            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty) || loading}
              className={`${style.btn} btn w-100  my-3`}
            >
              Register{" "}
            </button>
          </form>
          <div className="d-flex ">
            <h6>Already have an account?</h6>
            <Link
              className={`${style.link} ms-auto text-decoration-none `}
              href="/login"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
    // <>
    //   <div className={`${style.login} login d-flex align-items-center justify-content-center  vh-100 `}>
    //     <div className={`${style.signin} col-lg-4 rounded-1 p-5`}>
    //       <h2 className="text-white text-center pb-3">Register Now</h2>
    //      <form onSubmit={formik.handleSubmit}>
    //     {error && <div className="alert alert-danger">{error}</div>}

    //     <label htmlFor="userName"> Name:</label>
    //     <input
    //       onBlur={formik.handleBlur}
    //       onChange={formik.handleChange}
    //       type="text"
    //       className="form-control my-2"
    //       name="name"
    //       id="userName"
    //     />
    //     {formik.errors.name && formik.touched.name && (
    //       <div className="alert alert-danger">{formik.errors.name}</div>
    //     )}

    //     <label htmlFor="email"> Email:</label>
    //     <input
    //       onBlur={formik.handleBlur}
    //       onChange={formik.handleChange}
    //       type="email"
    //       className="form-control my-2"
    //       name="email"
    //       id="email"
    //     />
    //     {formik.errors.email && formik.touched.email && (
    //       <div className="alert alert-danger">{formik.errors.email}</div>
    //     )}

    //     <label htmlFor="password"> Password:</label>
    //     <input
    //       onBlur={formik.handleBlur}
    //       onChange={formik.handleChange}
    //       type="password"
    //       className="form-control my-2"
    //       name="password"
    //       id="password"
    //     />
    //     {formik.errors.password && formik.touched.password && (
    //       <div className="alert alert-danger">{formik.errors.password}</div>
    //     )}

    //     <label htmlFor="rePassword"> rePassword:</label>
    //     <input
    //       onBlur={formik.handleBlur}
    //       onChange={formik.handleChange}
    //       type="password"
    //       className="form-control my-2"
    //       name="rePassword"
    //       id="rePassword"
    //     />
    //     {formik.errors.rePassword && formik.touched.rePassword && (
    //       <div className="alert alert-danger">{formik.errors.rePassword}</div>
    //     )}

    //     <label htmlFor="phone"> Phone:</label>
    //     <input
    //       onBlur={formik.handleBlur}
    //       onChange={formik.handleChange}
    //       type="tel"
    //       className="form-control my-2"
    //       name="phone"
    //       id="phone"
    //     />
    //     {formik.errors.phone && formik.touched.phone && (
    //       <div className="alert alert-danger">{formik.errors.phone}</div>
    //     )}

    //     {loading ? (
    //       <button className="btn">
    //         <Bars height="50" width="80" color="#ffc107" ariaLabel="bars-loading" visible />
    //       </button>
    //     ) : (
    //       <button
    //         disabled={!(formik.isValid && formik.dirty)}
    //         type="submit"
    //         className="btn btn-warning"
    //       >
    //         Submit
    //       </button>
    //     )}
    //   </form>
    //       <div className="d-flex ">
    //       <h6>Already have an account?</h6>
    //          <Link className={`${style.link} ms-auto text-decoration-none `} href='/login'>Sign In</Link>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}
