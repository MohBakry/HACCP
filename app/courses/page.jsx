import React from "react";
import styles from "./coursesPage.module.css";
import Header from "@/components/shared/header";
import CoursesView from "@/components/pages/courses/view";
import img from "../../src/Assets/images/About.png";

import event1 from "../../src/Assets/images/event1.jpg";
import event2 from "../../src/Assets/images/event2.jpg";
import event3 from "../../src/Assets/images/event3.jpg";

export default function Courses() {
  const courses = [
    {
      id: 1,
      image: event1, // Replace with actual image paths
      duration: "23h",
      title: "Education Software and PHP and JS System Script",
      rating: 4.5,
      price: 199,
    },
    {
      id: 2,
      image: event2,
      duration: "54h",
      title: "Advanced Android 12 & Kotlin Development Course",
      rating: 4.5,
      price: 299,
    },
    {
      id: 3,
      image: event3,
      duration: "23h",
      title: "Learn Figma – UI/UX Design Essential Training",
      rating: 2.5,
      price: 199,
    },
    {
      id: 4,
      image: event1,
      duration: "23h",
      title: "The complete business plan course",
      rating: 3.5,
      price: 199,
    },
    {
      id: 3,
      image: event3,
      duration: "23h",
      title: "Learn Figma – UI/UX Design Essential Training",
      rating: 2.5,
      price: 199,
    },
    {
      id: 4,
      image: event1,
      duration: "23h",
      title: "The complete business plan course",
      rating: 3.5,
      price: 199,
    },

    {
      id: 2,
      image: event2,
      duration: "54h",
      title: "Advanced Android 12 & Kotlin Development Course",
      rating: 4.5,
      price: 299,
    },
    {
      id: 1,
      image: event1, // Replace with actual image paths
      duration: "23h",
      title: "Education Software and PHP and JS System Script",
      rating: 4.5,
      price: 199,
    },
  ];
  return (
    <div>
      <Header img={img} title="Courses" />
      <CoursesView data={courses} />
    </div>
  );
}
