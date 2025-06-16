import style from './styles.module.css';
import Img from '../../assets/images/const-page.png'
import Header from '../../shared/header';

export default function Consultation() {
  return (
    <>
      <div className={`${style.const}`}>
        <Header img={Img} title={"HACCP Consultation"} />

        <div>
          <div className="container p-4 ">
            <div className="row p-4 g-0 shadow-lg">
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg}  p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>BRC implementation and documentation
                    for Food Safety </h1>
                  <p className='text-white'>


                    Implementing BRC (British Retail Consortium) standards is crucial for businesses
                    in the retail, food, packaging, and related industries to ensure quality, safety,
                    and regulatory compliance. Proper implementation and thorough documentation not
                    only help in achieving certification but also enhance operational efficiency and
                    customer trust.

                  </p>
                </div>
              </div>
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg} p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>FSSC implementation and documentation  </h1>
                  <p className='text-white'>
                    The Food Safety System Certification (FSSC) 22000 is a robust framework for managing
                    food safety risks across the supply chain. This standard is based on ISO 22000, ISO/TS
                    22002-1, and other sector-specific requirements, making it applicable to food manufacturers
                    , packaging suppliers, and storage and distribution providers.

                  </p>
                  <br />
                </div>
              </div>
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg} p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>NAFSA Requirements implementation and documentation </h1>
                  <p className='text-white'>
                    Implementing requirements from a National Food Safety Authority (NFSA) ensures compliance
                    with food safety laws and regulations, helping organizations maintain product safety,
                    prevent contamination, and reduce foodborne illnesses. Proper documentation and
                    systematic adherence to NFSA requirements allow businesses to achieve and maintain
                    certification while building consumer trust.

                  </p>
                  <br />
                </div>
              </div>
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg} p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>
                    ISO 22000 implementation and documentation </h1>
                  <p className='text-white'>
                    Implementing ISO 22000, the international standard for food safety management systems
                    (FSMS), enables organizations to identify, manage, and mitigate food safety hazards
                    throughout the food chain. This standard integrates Hazard Analysis and Critical Control
                    Points (HACCP) principles with key elements of food safety management, including robust
                    communication and continual improvement.


                  </p>
                  <br />
                </div>
              </div>
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg} p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>Food safety for Catering implementation and documentation </h1>
                  <p className='text-white'>
                    Implementing food safety in catering requires establishing protocols that address the
                    unique risks associated with food preparation, storage, and transportation. Catering
                    involves handling large volumes of food, often in diverse environments, so a structured
                    Food Safety Management System (FSMS) is essential.


                  </p>
                  <br />
                </div>
              </div>
              <div className='col-md-6 p-3'>
                <div className={`${style.secbg} p-4`}>
                  <h1 className={`${style.subtitle} pb-2`}>HACCP (Codex) implementation and documentation </h1>
                  <p className='text-white'>

                    Implementing and documenting a Hazard Analysis and Critical Control Points
                    (HACCP) system according to Codex Alimentarius principles helps organizations
                    in the food industry manage food safety risks effectively. The Codex HACCP
                    standard is a systematic approach that identifies and controls biological,
                    chemical, and physical hazards in the food production process.

                  </p>
                  <br />
                </div>
              </div>

            </div>
          </div>















        </div>

      </div>
    </>
  )
}
