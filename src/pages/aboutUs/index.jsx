import style from "./styles.module.css";
import img from "../../assets/images/About.png";
import Header from "../../shared/header";

export default function About() {
  return (
    <>
      <div className={`mb-5`}>
        <Header img={img} title="About HACCP" />
        <div className="aboutUs">
          <div className="vision  bg-white">
            <div className="container p-4 ">
              <div className="row p-4 g-0 shadow-lg">
                <div className="col-md-6 p-3">
                  <div className={`${style.secbg}  p-4`}>
                    <h1 className={`${style.subtitle} pb-2`}>Our Vision </h1>
                    <p className="text-white">
                      We have worked for the major Retail chains, Food
                      manufacture companies and individuals .In addition to ,
                      understanding the food safety standards set by the major
                      retailers. In fact, in some cases, we help set those
                      standards. That is why we can provide a vital insight into
                      retailers’ requirements regarding system requirements,
                      site requirements, people requirements and product
                      requirements. We continue to work closely with the major
                      retailers and keep abreast of changes to their documented
                      Quality Assurance Programs. We can provide professional
                      advice on how your products can comply with these
                      requirements to ensure that you can capitalize on more
                      opportunities.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 p-3">
                  <div className={`${style.secbg} p-4`}>
                    <h1 className={`${style.subtitle} pb-2`}>Client Focus </h1>
                    <p className="text-white">
                      We have carefully structured our business to provide the
                      optimum service to our clients. We are small enough that
                      our clients can always speak to one of the directors of
                      the business, yet large enough to provide a broad range of
                      services that is well beyond the capabilities of a one-man
                      consultant. We also have the resources to undertake even
                      the largest project. We always strive to provide
                      professional, timely and cost-effective services to our
                      clients. Our staff are trained to deal with your
                      enquiries, promptly and professionally. We value the
                      relationship that we have with all our clients.
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="staff container p-4">
            <div className={`${style.stafftxt} row g-0 p-4 shadow-lg`}>
              <div className={`${style.staff}    p-5`}>
                <h1 className={`${style.abouttitle} p-2`}>
                  Our staff are our greatest asset{" "}
                </h1>
                <p className={`${style.main} ps-3 `}>
                  The specialist team at The HACCP Institute Nord in Cairo is
                  led by our director Dr Ahmed EL.Ghobashy . With experience
                  both here in Germany, Egypt and around the world, Dr Ahmed
                  EL.Ghobashy has vast experience in FMCG, food production,
                  horticulture, food technology, supply chain management and
                  foodservice. <br></br>
                  Our team ranges from food technologists, microbiologists, and
                  consumer scientists, accredited auditors, quality inspectors,
                  specification and labelling experts, customer enquiry
                  administrators, quality professionals and trainers. They are
                  highly skilled in their specific roles. We foster a culture of
                  constant improvement and provide ongoing training to ensure
                  they are abreast of new and emerging technologies. Importantly
                  we select staff who adopt a ‘can-do’ attitude and who have the
                  ability to build a strong working relationship with our
                  clients.
                </p>
              </div>
              {/* <div className={`${style.staffimg} col-md-5 bg-white p-2  align-items-center`}>
                <Image src={img1} width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  alt='staff'></Image>
              </div> */}
            </div>
          </div>
          <div className="choose  bg-white">
            <div className="container p-4 ">
              <div className="row p-4 g-0 shadow-lg">
                <h1 className={`${style.choosetitle} py-3`}>Why Choose Us? </h1>
                <div className="col-md-6 p-3">
                  <div className={`${style.secbg} p-4`}>
                    <h1 className={`${style.subtitle} pb-2`}>EXPERTISE </h1>
                    <p className="text-white">
                      The HACCP Institute Nord in Cairo (HINC) is a
                      well-established business with significant Tier 1 retail
                      and manufacturing clients. The HINC team have over 50
                      years combined experience here in Germany and around the
                      world. We have vast experience in FMCG, food production,
                      horticulture, food technology, supply chain management and
                      foodservice. In addition, we foster a culture of constant
                      development of our own resources and the services we
                      provide. We continually monitor the ever-changing food
                      codes and research new and emerging technologies and
                      developments from around the world to ensure the advice we
                      provide our clients is accurate and up to date.
                    </p>
                  </div>
                </div>
                <div className="col-md-6 p-3">
                  <div className={`${style.secbg} p-4`}>
                    <h1 className={`${style.subtitle} pb-2`}>FLEXIBLE </h1>
                    <p className="text-white">
                      The HACCP Institute Nord In Cairo (HINC) will tailor a
                      quality solution specifically for your business. We
                      provide staff who work on your site or work remotely with
                      appropriate courses and sufficient food safety
                      information. No matter what the size of your business or
                      project we can provide the level of expert resources
                      required to complete the task efficiently. We understand
                      that timeliness is crucial, particularly with product
                      recalls, that is why we have structured our business so
                      that we can react quickly to any situation that arises.
                      Our training is also available on-site or online.
                    </p>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={` ${style.aboutbg}`}>
            <div className={`ceo container p-5  ${style.aboutbg}`}>
              <div
                className={`${style.ceo} px-5 py-4 shadow-lg bg-white opacity-75 position-relative`}
              >
                <div className="position-absolute top-0 start-0 translate-middle ">
                  <i className={`${style.quotes} fa-solid fa-quote-left`}></i>
                </div>
                <div className="position-absolute top-100 start-100 translate-middle">
                  <i className={`${style.quotes} fa-solid fa-quote-right`}></i>
                </div>
                <p className={`${style.main} p-5 pb-0`}>
                  {" "}
                  I&apos;am passionate about delivering better quality and
                  sustainable services to our clients and helping manufacturers
                  protect and build their competitive advantage. <br></br>
                  EL-Ghobashy’ journey began with a BSc and PhD in Food Safety
                  and Microbiology. His initial career was spent with Faculty of
                  Natural Science /University of Hohenheim in Stuttgart,
                  Germany.
                  <br></br>
                  He has gained significant experience in retail technical and
                  quality management by working for 20 years with
                  innovation-leading retailers. He recently served as Quality
                  and Food Safety Manager.<br></br>
                  He has certified in numerous and significant food safety
                  topics from international organizations like BRCGS Standard
                  Lead Auditor, FSSC Standard Lead Auditor, Highfield level 4,
                  BRCGS Professional Grade, Food Safety Diplomate from the
                  American University He has also certified from BRCGS in the
                  upcoming topics: HACCP, Food Safety Culture, Root Cause
                  Analysis, Vulnerability Assessment of Food Fraud, Internal
                  Auditor, Environmental Monitoring, Verification and Validation
                  .{" "}
                </p>
                <div className="text-center">
                  <h3 className={style.main}>Dr. Ahmed EL-Ghobashy</h3>
                  <h5 className={style.sub}>CEO</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
