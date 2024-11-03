
import Link from "next/link";
import style from './signUp.module.css'
export default function page() {
  return (
    <>
      <div className={`${style.login} login d-flex align-items-center justify-content-center  vh-100 `}>
        <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
          <h2 className="text-white text-center pb-3">Register Now</h2>
          <form >
            <input className="form-control my-4" name="name" type='text' placeholder="Full Name" />
            <input className="form-control my-4" name="email" type='email' placeholder=" Email" />
            <input className="form-control my-4" name="mobile" type='tel' placeholder="Mobile Number" />
            <input className="form-control my-4" name="password" type='password' placeholder="Password" />
            <input className="form-control my-4" name="password" type='password' placeholder="re-Password" />
           
            <button type="submit" className={`${style.btn} btn w-100  my-3`}>Register </button>
          </form>
          <div className="d-flex ">
          <h6>Already have an account?</h6>
             <Link className={`${style.link} ms-auto text-decoration-none `} href='/login'>Sign In</Link>
          </div>
        </div>
      </div>
    </>
  )
}
