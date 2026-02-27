'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.css';
import LoadingSpinner from '../../../../shared/LoadingSpinner';
import EventItem from './eventCard';
import { getHighlightedEvents } from '../../../../Redux/events/events.service';

const EventsSection = () => {
  const dispatch = useDispatch();
  const { highlightedEvents, loading } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getHighlightedEvents());
  }, [dispatch]);

  return (
    <section className={` ${styles.eventsSection} py-5`}>
      <h2 className={`${styles.eventSectionTitle} text-center mb-5 p-4`}>
        Our Events
      </h2>

      {loading.getHighlightedEvents ? (
        <LoadingSpinner />
      ) : (
        <>
          {highlightedEvents.slice(0, 3).map((event, index) => (
            <EventItem key={event._id} data={event} index={index} />
          ))}
        </>
      )}
    </section>
  );
};

export default EventsSection;
