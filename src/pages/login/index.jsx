import React, { useState } from 'react'
import style from "./styles.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserToken } from '../../redux/userSlice'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
    password: Yup.string()
      .required('Password is required')
      .matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password must start with uppercase and be 6-11 characters'),
  })

  async function submitForm(values) {
    setLoading(true)
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        values
      )

      if (data.message === 'success') {
        localStorage.setItem('token', data.token)

        // Optional: mock user info, or get from data if available
        const mockUser = {
          id: '123',
          name: 'Student Name',
          email: values.email,
        }
        localStorage.setItem('user', JSON.stringify(mockUser))

        dispatch(setUserToken(data.token))
        navigate('/profile')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitForm,
    validationSchema,
  })

  return (
    <div className={`${style.login} login d-flex align-items-center justify-content-center vh-100`}>
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
            <input type="checkbox" className="m-2" /> Remember me
            <Link className={`${style.link} ms-auto text-decoration-none`} to="/">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className={`${style.btns} btn w-100 my-3`}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="d-flex">
          <h6>Don&apos;t have an account yet?</h6>
          <Link className={`${style.link} ms-auto text-decoration-none`} to="/register">
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  )
}
