import cons from "../../../../assets/images/consultation.jpg";
import style from "./styles.module.css";

export default function Consultation() {
  return (
    <>
      <div className={style.conssec}>
        <div className="row g-0">
          <div className={`${style.consimg} col-md-6`}>
            <img
              src={cons}
              style={{ width: "100%", height: "auto" }}
              alt="cosultation"
            />
          </div>
          <div className="col-md-6  ">
            <div className={`${style.constxt} p-4`}>
              <h1 className={`${style.consh1} py-2`}>Consultation</h1>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                BRC implementation and documentation   for Food Safety
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                FSSC implementation and documentation
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                NAFSA Requirements implementation and documentation
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                ISO 22000 implementation and documentation
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                Food safety for Catering implementation and documentation
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                HACCP (Codex) implementation and documentation
              </h3>
              <div>
                <div className="ms-auto">
                  <button className={`${style.consbtn}  mt-3 btn `}>
                    READ MORE <i className="mx-2 fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
