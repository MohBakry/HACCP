import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../assets/images/events copy.jpg';
import Header from '../../shared/header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import { getPublishedEvents } from '../../Redux/events/events.service';
import EventItem from '../home/components/events/eventCard';
import styles from '../home/components/events/styles.module.css';

export default function Events() {
  const dispatch = useDispatch();
  const { publishedEvents, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getPublishedEvents());
  }, [dispatch]);

  return (
    <>
      <Header img={Img} title={'HACCP Events'} />

      <section className={` py-5`}>
        {loading.getPublishedEvents ? (
          <LoadingSpinner />
        ) : (
          <>
            {publishedEvents.map((event, index) => (
              <EventItem key={event._id} data={event} index={index} />
            ))}
          </>
        )}
      </section>
    </>
  );
}
