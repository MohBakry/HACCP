import Image from "next/image";
import cons from "../../../../src/Assets/images/consultation.jpg";
import style from "./styles.module.css";

export default function Consultation() {
  return (
    <>
      <div className={style.conssec}>
        <div className="row g-0">
          <div className={`${style.consimg} col-md-6`}>
            <Image
              src={cons}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
              alt="cosultation"
            ></Image>
          </div>
          <div className="col-md-6  ">
            <div className={`${style.constxt} p-4`}>
              <h1 className={`${style.consh1} py-2`}>Consultation</h1>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                Agents and Brokers training
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                Network, learn and grow
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                Tools to achieve certification
              </h3>
              <h3 className={`${style.consh3}`}>
                <i
                  className={`${style.consi} m-2 fa-solid fa-circle-arrow-right`}
                ></i>
                Agents and Brokers training
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
