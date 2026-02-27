'use client';
import React from 'react';
// import Image from "next/image";
import styles from './styles.module.css'; // Custom styles
import event1 from '../../../../assets/images/event1.jpg';
import event2 from '../../../../assets/images/event2.jpg';
import event3 from '../../../../assets/images/event3.jpg';
import useResponsiveSizes from '../../../../hooks/useResponsiveSizes';
import LinkWithEndIcon from '../../../../shared/linkEndIcon';
const eventsData = [
  {
    title: 'What Soul Can Tech Us About Web Design',
    date: '19th Jun 2024',
    time: '8 am - 10 am',
    location: '84, 115 st, Maadi, Cairo',
    imageUrl: event1, // Replace with actual image paths
  },
  {
    title: 'What Soul Can Tech Us About Web Design',
    date: '19th Jun 2024',
    time: '8 am - 10 am',
    location: '84, 115 st, Maadi, Cairo',
    imageUrl: event2,
  },
  {
    title: 'What Soul Can Tech Us About Web Design',
    date: '19th Jun 2024',
    time: '8 am - 10 am',
    location: '84, 115 st, Maadi, Cairo',
    imageUrl: event3,
  },
];

const EventItem = ({ data, index }) => {
  const { width, height } = useResponsiveSizes([
    // { minWidth: 0, maxWidth: 576, width: 300, height: 200 }, // Extra small devices (phones)
    // { minWidth: 576, maxWidth: 768, width: 400, height: 300 }, // Small devices (portrait tablets)
    { minWidth: 0, maxWidth: 450, width: 400, height: 280 }, // Medium devices (landscape tablets)
    { minWidth: 450, maxWidth: 1000, width: 900, height: 200 }, // Large devices (desktops)
    { minWidth: 1000, maxWidth: 1600, width: 650, height: 200 }, // Large devices (desktops)
    { minWidth: 1600, maxWidth: Infinity, width: 800, height: 250 }, // Extra large devices (large desktops)
  ]);
  return (
    <div className="col-md-12 mb-1 p-3" key={data._id}>
      <div
        className={`d-flex ${
          index % 2 === 0 ? 'flex-md-row-reverse ' : ''
        } ${styles.eventCard}`}
      >
        <img
          src={data.imageUrl}
          alt={data.title}
          style={{ width: width, height: height }}
          className={`${styles.eventImage}`}
        />
        <div
          className={`d-flex card-img-overlay ${styles.overlay} ${
            index % 2 === 0 ? styles.overlayRight : ''
          }`}
        >
          <div className={`d-flex w-100 flex-wrap `}>
            <div className="col-12 col-md-9">
              <h5 className={`${styles.eventTitle}`}>{data.title}</h5>
              <div className="row d-flex gap-1 gap-lg-2">
                <div className="col-xs-12 col-md d-flex align-items-center mb-2">
                  <i
                    className={`${styles.eventIcon} fa-regular fa-calendar me-2`}
                  ></i>
                  <span className={`${styles.eventData}`}>
                    {data.date
                      ? new Date(data.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                </div>
                <div className="col-xs-12 col-md d-flex align-items-center mb-2">
                  <i
                    className={`${styles.eventIcon} fa-regular fa-clock me-2 `}
                  ></i>
                  <span className={`${styles.eventData}`}>
                    {data.startTime && data.endTime
                      ? `${data.startTime} - ${data.endTime}`
                      : data.time}
                  </span>
                </div>
                <div className="col-xs-12 col-md-5 d-flex align-items-center mb-2">
                  <i
                    className={`${styles.eventIcon} fa-solid fa-location-dot me-2 `}
                  ></i>
                  <span className={`${styles.eventData}`}>{data.location}</span>
                </div>
              </div>
            </div>
            <div className=" col-12 col-md-3 d-flex align-items-center">
              <div className="d-flex align-items-center">
                <LinkWithEndIcon
                  to={`/events/details/${data._id}`}
                  customClass={`btn btn-primary ${styles.learnMoreBtn}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
