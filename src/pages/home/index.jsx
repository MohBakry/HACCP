
import HeroSec from "./components/heroSec";
import AboutSec from "./components/aboutSec";
import NewsSec from "./components/newsSec";
import Consultation from "./components/consultation";
import EventsSection from "./components/events";
import PodcastSection from "./components/podcastSec";
// import Courses from "./courses/page";
import PopularCourses from "./components/courses";

export default function Home() {
  return (
    <>
      <HeroSec></HeroSec>
      <AboutSec></AboutSec>
      <NewsSec></NewsSec>
      <Consultation></Consultation>
      <PopularCourses />
      <EventsSection />
      <PodcastSection />
    </>
  );
}
