import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../shared/header';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import { getPublishedEventDetails } from '../../../Redux/events/events.service';

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventDetails, loading } = useSelector((state) => state.events);

  useEffect(() => {
    if (id) {
      dispatch(getPublishedEventDetails(id));
    }
  }, [id, dispatch]);

  if (loading.getPublishedEventDetails) {
    return <LoadingSpinner />;
  }

  if (!eventDetails) {
    return <div className="container py-5">Event not found.</div>;
  }

  return (
    <div>
      {/* Header with event image and title */}
      <Header img={eventDetails.imageUrl} title={eventDetails.title} />

      <div className="container py-5">
        <div className="row">
          {/* Main Content - Left Side */}
          <div className="col-lg-8 mb-4">
            <h2 className="mb-4">{eventDetails.title}</h2>
            {eventDetails.description && (
              <div
                className="event-description"
                dangerouslySetInnerHTML={{ __html: eventDetails.description }}
              />
            )}
          </div>

          {/* Sidebar - Right Side */}
          <div className="col-lg-4">
            <div className="card sticky-top" style={{ top: '20px' }}>
              <div className="card-body">
                <h5 className="card-title mb-4">Event Details</h5>

                {eventDetails.date && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-calendar me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Date</small>
                        <strong>
                          {new Date(eventDetails.date).toLocaleDateString(
                            'en-US',
                            {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {(eventDetails.startTime ||
                  eventDetails.endTime ||
                  eventDetails.time) && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-clock me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Time</small>
                        <strong>
                          {eventDetails.startTime && eventDetails.endTime
                            ? `${eventDetails.startTime} - ${eventDetails.endTime}`
                            : eventDetails.time}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

                {eventDetails.location && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-map-marker-alt me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Location</small>
                        <strong>{eventDetails.location}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {eventDetails.organizer && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-user me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Organizer</small>
                        <strong>{eventDetails.organizer}</strong>
                      </div>
                    </div>
                  </div>
                )}

                {eventDetails.capacity && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <i
                        className="fas fa-users me-3"
                        style={{ fontSize: '1.2rem', color: '#012F5A' }}
                      ></i>
                      <div>
                        <small className="text-muted d-block">Capacity</small>
                        <strong>{eventDetails.capacity} attendees</strong>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
