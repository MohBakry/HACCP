import styles from "./styles.module.css";
export default function AboutSec() {
  return (
    <>
      <div className={`${styles.abtsec} container-fluid  pt-5 `}>
        <h1 className={`${styles.titleh1} text-center `}>About Us</h1>
        <div className="row my-5">
          <div className={`${styles.aboutImg} col-sm-6`}></div>
          <div className="col-sm-6 bg-white  px-5 ">
            <div>
              <h3 className={`${styles.abouth3}`}>
                Our staff are <br></br>Our greatest asset{" "}
              </h3>
              <p className={`${styles.abouth5} my-3`}>
                The specialist team at The HACCP Institute Nord in Cairo is led
                by our director Dr Ahmed EL.Ghobashy . With experience both here
                in Germany, Egypt and around the world, Dr Ahmed EL.Ghobashy has
                vast experience in FMCG, food production, horticulture, food
                technology, supply chain management and foodservice. <br></br>
                Our team ranges from food technologists, microbiologists, and
                consumer scientists, accredited auditors, quality inspectors,
                specification and labelling experts, customer enquiry
                administrators, quality professionals and trainers. <br></br>
                They are highly skilled in their specific roles. We foster a
                culture of constant improvement and provide ongoing training to
                ensure they are abreast of new and emerging technologies.
                Importantly we select staff who adopt a ‘can-do’ attitude and
                who have the ability to build a strong working relationship with
                our clients.
              </p>

              <div>
                <button
                  className={`${styles.aboutbtn} my-4 btn btn-outline-primary`}
                >
                  READ MORE<i className="mx-2 fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
