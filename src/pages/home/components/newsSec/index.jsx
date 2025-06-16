import style from "./styles.module.css";
// import Image from "next/image";
import n1 from "../../../../assets/images/news-1.jpg";
import n2 from "../../../../assets/images/news-2.jpg";
import n3 from "../../../../assets/images/news-3.jpg";
import n4 from "../../../../assets/images/news-4.jpg";
import { Link } from "react-router-dom";

export default function NewsSec() {
  return (
    <>
      <div className={`${style.newssec} container-fluid p-5`}>
        <div className="row">
          <h1 className={`${style.newsh1}`}>Leatest News</h1>
          <div className="col-lg-3 col-md-6 p-3">
            <div className={`div bg-white rounded-2 ${style.newsCard}`}>
              <img
                className="rounded-top-2"
                src={n1}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="news-1"
              />
              <h5 className={`${style.newsh5} p-2`}>
                Packaging Materials Issue 7 - Launch webinar and training
                updates.....
              </h5>
              <div className="link text-center py-3">
                <a className={`${style.newsa}`} href="/">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div className={`div bg-white rounded-2 ${style.newsCard}`}>
              <img
                className="rounded-top-2"
                src={n2}
                style={{ width: "100%", height: "auto" }}
                alt="news-1"
              />
              <h5 className={`${style.newsh5} p-2`}>
                Attracting new auditors to the BRCGS START!
                
              </h5>
              <div className="link text-center py-3">
                <a className={`${style.newsa}`} href="/">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div className={`div bg-white rounded-2 ${style.newsCard}`}>
              <img
                className="rounded-top-2"
                src={n3}
                style={{ width: "100%", height: "auto" }}
                alt="news-1"
              />
              <h5 className={`${style.newsh5} p-2`}>
                August Industry Update Food Safety recalls, developments and
                incidents
              </h5>
              <div className="link text-center py-3">
                <Link className={`${style.newsa}`} to="/">
                  Read More
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 p-3">
            <div className={`div bg-white rounded-2 ${style.newsCard}`}>
              <img
                className="rounded-top-2"
                src={n4}
                style={{ width: "100%", height: "auto" }}
                alt="news-1"
              />
              <h5 className={`${style.newsh5} p-2`}>
                New Consultation Opens for GFSI Benchmarking Requirements v2024
              </h5>
              <div className="link text-center py-3">
                <Link className={`${style.newsa}`} to="/">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="p-1 my-3">
          <button className={`${style.newsbtn} btn`}>
            MORE NEWS <i className="mx-1 fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}
