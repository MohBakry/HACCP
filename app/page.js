import Image from "next/image";
import styles from "./page.module.css";

import HeroSec from "./(Home)/HeroSec/HeroSec";
import AboutSec from "./(Home)/AboutSec/AboutSec";
import NewsSec from "./(Home)/NewsSec/NewsSec";
import Consultation from "./(Home)/Consultation/Consultation";

export default function Home() {
  return (
    <>
   <HeroSec></HeroSec>
   <AboutSec></AboutSec>
   <NewsSec></NewsSec>
   <Consultation></Consultation>
    </>
  );
}
