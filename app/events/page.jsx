import style from './events.module.css';
import Image from 'next/image';
import Img from '../../src/Assets/images/events copy.jpg'
import EventsSection from '@/components/pages/home/events';

export default function Events() {
  return (
    <>
    <div className={`${style.events}`}>
    <div className="header position-relative ">
          <Image width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            alt="About-Header" src={Img} ></Image>
          <div className={` position-absolute bottom-0 start-0 `}>
            <h1 className={`${style.headertxt} p-4  mb-0`} >HACCP   Events</h1>
          </div>
        </div>

    </div>
    <EventsSection/>
    </>
  )
}