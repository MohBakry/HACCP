// import Image from "next/image";
import h1 from "../../../../assets/images/1.png";
import h2 from "../../../../assets/images/2.png";
import h3 from "../../../../assets/images/3.png";
import styles from "./styles.module.css";

export default function HeroSec() {
  return (
    <>
      <div className={`${styles.heroImg} position-relative container-fluid `}>
        <div className="row ">
          <div
            className={`${styles.heroTxt} col-lg-5  d-flex align-items-center vh-100 container `}
          >
            <div>
              <h3 className={`${styles.titleh3} px-3`}>
                Make Sustainable Futures,
              </h3>
              <h1 className={`${styles.titleh1} p-3`}>
                Best Digital Online <br /> Education !
              </h1>
              <p className="p-3 text-white text-large">
                Through our initiatives, we aim to bridge educational gap
                improve learning outcome, and foster a love for lifelong
                learning.
              </p>

              <div className="col-xl-9 d-flex rounded-2 border px-2 mx-3 border-2">
                <i className="fa-solid fa-magnifying-glass text-white d-flex align-items-center"></i>
                <input
                  className="opacity-50  form-control m-3  "
                  placeholder="What do you need to learn today?"
                ></input>
              </div>
            </div>
          </div>
          <div className="col-md-7 p-0 order-0"></div>
        </div>
        <div className="position-absolute top-100 start-50 translate-middle container justify-content-around row d-flex">
          <div className={`${styles.boxes} rounded-3 col-md-3 p-2 `}>
            <div className="d-flex align-items-center">
              <img src={h1} style={{ width: "80px" }} alt="1" />
            </div>
            <div className="p-2">
              <h3 className={`${styles.boxh3}`}>Class Rooms</h3>
              <p className="text-white">
                Online education provides flexibility and accessibility to
                learners.
              </p>
            </div>
          </div>
          <div className={`${styles.boxes} rounded-3 col-md-3  p-2 `}>
            <div className="d-flex align-items-center">
              <img src={h2} style={{ width: "80px" }} alt="1" />
            </div>
            <div className="p-2">
              <h3 className={`${styles.boxh3}`}>Online Courses</h3>
              <p className="text-white">
                Online education provides flexibility and accessibility to
                learners.
              </p>
            </div>
          </div>
          <div className={`${styles.boxes} rounded-3 col-md-3  p-2 `}>
            <div className="d-flex align-items-center">
              <img src={h3} style={{ width: "80px" }} alt="1" />
            </div>
            <div className="p-2">
              <h3 className={`${styles.boxh3}`}>Certified Courses</h3>
              <p className="text-white">
                Online education provides flexibility and accessibility to
                learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
