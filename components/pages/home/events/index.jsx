import React from "react";
import Image from "next/image";
import styles from "./styles.module.css"; // Custom styles
import event1 from "../../../../src/Assets/images/event1.jpg";
import event2 from "../../../../src/Assets/images/event2.jpg";
import event3 from "../../../../src/Assets/images/event3.jpg";
const eventsData = [
  {
    title: "What Soul Can Tech Us About Web Design",
    date: "19th Jun 2024",
    time: "8 am - 10 am",
    location: "84, 115 st, Maadi, Cairo",
    imageUrl: event1, // Replace with actual image paths
  },
  {
    title: "What Soul Can Tech Us About Web Design",
    date: "19th Jun 2024",
    time: "8 am - 10 am",
    location: "84, 115 st, Maadi, Cairo",
    imageUrl: event2,
  },
  {
    title: "What Soul Can Tech Us About Web Design",
    date: "19th Jun 2024",
    time: "8 am - 10 am",
    location: "84, 115 st, Maadi, Cairo",
    imageUrl: event3,
  },
];

const EventsSection = () => {
  return (
    <section className={` ${styles.eventsSection} py-5`}>
      <h2 className={`${styles.eventSectionTitle} text-center mb-5`}>
        Our Events
      </h2>

      {eventsData.map((event, index) => (
        <div className="col-md-12 mb-4" key={index}>
          <div
            className={`d-flex ${
              index % 2 !== 0 ? "flex-md-row-reverse " : ""
            } card ${styles.eventCard}`}
          >
            <Image
              src={event.imageUrl}
              alt={event.title}
              width={800}
              height={250}
              className={`${styles.eventImage}`}
            />
            <div
              className={`d-flex card-img-overlay ${styles.overlay} ${
                index % 2 !== 0 ? styles.overlayRight : ""
              }`}
            >
              <div className={`d-flex w-100 `}>
                <div className="col-9">
                  <h5 className={`card-title ${styles.eventTitle}`}>
                    {event.title}
                  </h5>
                  <div className="d-flex gap-3">
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className={`${styles.eventIcon} fa-regular fa-calendar me-2`}
                      ></i>
                      <span className={`${styles.eventData}`}>
                        {event.date}
                      </span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i
                        className={`${styles.eventIcon} fa-regular fa-clock me-2 `}
                      ></i>
                      <span className={`${styles.eventData}`}>
                        {event.time}
                      </span>
                    </div>
                    <div className=" d-flex align-items-center mb-2">
                      <i
                        className={`${styles.eventIcon} fa-solid fa-location-dot me-2 `}
                      ></i>
                      <span className={`${styles.eventData}`}>
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-3 d-flex align-items-center">
                  <div className="d-flex align-items-center">
                    <a
                      href="#"
                      className={` btn btn-primary ${styles.learnMoreBtn}`}
                    >
                      Learn More{" "}
                      <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default EventsSection;
