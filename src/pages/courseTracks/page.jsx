import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import img from '../../assets/images/About.png';
import { getPublishedCourseTracks } from '../../Redux/courseTracks/courseTracks.service';
import styles from './styles.module.css';

export default function CourseTracksPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publishedCourseTracks, loading } = useSelector(
    (state) => state.courseTracks
  );

  useEffect(() => {
    dispatch(getPublishedCourseTracks());
  }, [dispatch]);

  return (
    <div>
      <Header img={img} title="Our Diplomas" />

      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="mb-3">Professional Diploma Programs</h2>
          <p className="text-muted">
            Comprehensive learning paths designed to master your skills
          </p>
        </div>

        {loading.getPublishedCourseTracks ? (
          <LoadingSpinner />
        ) : (
          <div className="row g-4">
            {publishedCourseTracks.map((track) => (
              <div key={track._id} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`card ${styles.trackCard}`}
                  onClick={() => navigate(`/diplomas/${track._id}`)}
                >
                  <div className="card-body">
                    <div className={styles.trackIcon}>
                      <i className="fas fa-graduation-cap"></i>
                    </div>
                    <h5 className="card-title mt-3">{track.name}</h5>
                    <p className="card-text text-muted">{track.description}</p>
                    <div className={styles.trackMeta}>
                      <span className="badge bg-primary">
                        <i className="fas fa-book me-1"></i>
                        {track.courses?.length || 0} Courses
                      </span>
                    </div>
                    <div className={`${styles.viewDetails} mt-3`}>
                      <span>View Details</span>
                      <i className="fas fa-arrow-right ms-2"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading.getPublishedCourseTracks &&
          publishedCourseTracks.length === 0 && (
            <div className="text-center py-5">
              <i className="fas fa-graduation-cap fa-3x text-muted mb-3"></i>
              <p className="text-muted">No diplomas available at the moment.</p>
            </div>
          )}
      </div>
    </div>
  );
}
