import Img from '../../assets/images/events copy.jpg'
import EventsSection from '../home/components/events';
import Header from '../../shared/header';

export default function Events() {
  return (
    <>
      <Header img={Img} title={"HACCP Events"} />
      <EventsSection />
    </>
  )
}