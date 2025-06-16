import React from "react";
import CourseCard from "../../../../shared/CourseCard";
import styles from "./styles.module.css";
import event1 from "../../../../assets/images/event1.jpg";
import event2 from "../../../../assets/images/event2.jpg";
import event3 from "../../../../assets/images/event3.jpg";
import LinkWithEndIcon from "../../../../shared/linkEndIcon";

const courses = [
  {
    image: event1, // Replace with actual image paths
    duration: "23h",
    title: "Education Software and PHP and JS System Script",
    rating: 4.5,
    price: 199,
  },
  {
    image: event2,
    duration: "54h",
    title: "Advanced Android 12 & Kotlin Development Course",
    rating: 4.5,
    price: 299,
  },
  {
    image: event3,
    duration: "23h",
    title: "Learn Figma – UI/UX Design Essential Training",
    rating: 2.5,
    price: 199,
  },
  {
    image: event1,
    duration: "23h",
    title: "The complete business plan course",
    rating: 3.5,
    price: 199,
  },
];

const PopularCourses = () => {
  return (
    <section className="py-5">
      <div className="container-fluid px-5 ">
        <h2 className="text-center mb-5">Our Popular Courses</h2>
        <div className="row">
          {courses.map((course, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
              <CourseCard
                image={course.image}
                duration={course.duration}
                title={course.title}
                rating={course.rating}
                price={course.price}
              />
            </div>
          ))}
        </div>
        <div className="text-start mt-4">
          <LinkWithEndIcon
            text="Explore More"
            customClass={`btn btn-primary ${styles.exploreButton}`}
          />
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
