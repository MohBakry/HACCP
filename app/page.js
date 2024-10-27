import Image from "next/image";
import styles from "./page.module.css";
import logoW from "../src/Assets/images/logo-w.PNG";

import HeroSec from "../components/pages/home/heroSec";
import AboutSec from "../components/pages/home/aboutSec";
import NewsSec from "../components/pages/home/newsSec";
import Consultation from "../components/pages/home/consultation";
import EventsSection from "../components/pages/home/events";

export default function Home() {
  return (
    <>
      <HeroSec></HeroSec>
      <AboutSec></AboutSec>
      <NewsSec></NewsSec>
      <Consultation></Consultation>
      <EventsSection />
    </>
  );
}
