import style from './NewsSec.module.css';
import Image from "next/image";
import Img from '../../../src/Assets/images/About.png';
import n1 from '../../../src/Assets/images/news-1.jpg';
import n2 from '../../../src/Assets/images/news-2.jpg';
import n3 from '../../../src/Assets/images/news-3.jpg';
import n4 from '../../../src/Assets/images/news-4.jpg';


export default function NewsSec() {
      return (
            <>
                  <div className={`${style.newssec} container-fluid p-5`}>
                        <div className="row">
                              <h1 className={`${style.newsh1}`}>Leatest News</h1>
                              <div className="col-lg-3 col-md-6 p-3">
                                    <div className="div bg-white rounded-2">
                                          <Image className='rounded-top-2' src={n1} width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} alt='news-1'></Image>
                                          <h5 className={`${style.newsh5} p-2`}>Packaging Materials Issue
                                                7 - Launch webinar and
                                                training updates.....</h5>
                                          <div className="link text-center py-3">
                                                <a className={`${style.newsa}`} href="/">Read More</a>
                                          </div>
                                    </div>

                              </div>
                              <div className="col-lg-3 col-md-6 p-3">
                                    <div className="div bg-white rounded-2">
                                          <Image className='rounded-top-2' src={n2} width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} alt='news-1'></Image>
                                          <h5 className={`${style.newsh5} p-2`}>Attracting new auditors to
                                                the BRCGS START!
                                                <br></br>Programme</h5>
                                          <div className="link text-center py-3">
                                                <a className={`${style.newsa}`} href="/">Read More</a>
                                          </div>
                                    </div>

                              </div>
                              <div className="col-lg-3 col-md-6 p-3">
                                    <div className="div bg-white rounded-2">
                                          <Image className='rounded-top-2' src={n3} width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} alt='news-1'></Image>
                                          <h5 className={`${style.newsh5} p-2`}>August Industry Update
                                                Food Safety recalls,
                                                developments and incidents</h5>
                                          <div className="link text-center py-3">
                                                <a className={`${style.newsa}`} href="/">Read More</a>
                                          </div>
                                    </div>

                              </div>
                              <div className="col-lg-3 col-md-6 p-3">
                                    <div className="div bg-white rounded-2">
                                          <Image className='rounded-top-2' src={n4} width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }} alt='news-1'></Image>
                                          <h5 className={`${style.newsh5} p-2`}>New Consultation Opens for
                                                GFSI Benchmarking
                                                Requirements v2024</h5>
                                          <div className="link text-center py-3">
                                                <a className={`${style.newsa}`} href="/">Read More</a>
                                          </div>
                                    </div>

                              </div>

                        </div>
                        <div className='p-1 my-3'>
                              <button className={`${style.newsbtn} btn` }>MORE NEWS <i className="mx-1 fa-solid fa-arrow-right"></i></button>
                        </div>
                  </div>
            </>
      )
}
