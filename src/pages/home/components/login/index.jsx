import Link from "next/link";
import style from "./login.module.css";
export default function page() {
  return (
    <>
      <div
        className={`${style.login} login d-flex align-items-center justify-content-center  vh-100 `}
      >
        <div className={`${style.signin} col-lg-4 rounded-2 p-5`}>
          <h2 className="text-white text-center pb-3">Sign in</h2>
          <form>
            <input
              className="form-control my-4"
              name="name"
              type="text"
              placeholder="Email or Mobile Number"
            />
            <input
              className="form-control my-4"
              name="password"
              type="password"
              placeholder="Password"
            />
            <div className="d-flex">
              <input type="checkbox" className="m-2" /> Remember me
              <Link
                className={`${style.link} ms-auto text-decoration-none `}
                to="\"
              >
                Forget Password?
              </Link>
            </div>
            <button type="submit" className={`${style.btn} btn w-100  my-3`}>
              Sign in{" "}
            </button>
          </form>
          <div className="d-flex ">
            <h6>Don&apos;t have an account yet?</h6>
            <Link
              className={`${style.link} ms-auto text-decoration-none `}
              to="/signUp"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
