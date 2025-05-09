import style from './news.module.css';
import Image from 'next/image';
import Img from '../../src/Assets/images/news.jpg'
import NewsSec from '@/components/pages/home/newsSec';

export default function News() {
  return (
    <>
    <div className={`${style.news}`}>
    <div className="header position-relative">
          <Image width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="About-Header" src={Img} ></Image>
          <div className={` position-absolute bottom-0 start-0 `}>
            <h1 className={`${style.headertxt} p-4  mb-0`} >HACCP News</h1>
          </div>
        </div>

    </div>
    <NewsSec/>
    </>
  )
}