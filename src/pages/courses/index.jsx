import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import Header from '../../shared/header';
import LoadingSpinner from '../../shared/LoadingSpinner';
import img from '../../assets/images/About.png';
import CourseCard from '../../shared/CourseCard';
import { getPublishedCourses } from '../../Redux/courses/courses.service';

export default function Courses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { publishedCourses, loading } = useSelector((state) => state.courses);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    dispatch(getPublishedCourses());
  }, [dispatch]);

  return (
    <div>
      <Header img={img} title="Courses" />

      {/* Discover Diplomas Button */}
      <div className="container py-4">
        <div className="text-end">
          <button
            className={`btn btn-lg ${styles.diplomaButton}`}
            onClick={() => navigate('/diplomas')}
          >
            <i className="fas fa-graduation-cap me-2"></i>
            Discover Our Diplomas
            <i className="fas fa-arrow-right ms-2"></i>
          </button>
        </div>
      </div>

      <div className="py-3 py-md-5">
        <div className={`${styles.container} py-3`}>
          <div className="d-flex gap-3 flex-wrap flex-col-reverse ">
            <span className={`${styles.courseCount} w-100 col-md`}>
              <strong>{publishedCourses.length}</strong> Courses
            </span>

            <div className={`${styles.viewToggle} w-100 col-md`}>
              <button
                className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''} px-0`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fa fa-th-large" aria-hidden="true"></i> Grid
              </button>

              <button
                className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''} px-3`}
                onClick={() => setViewMode('list')}
              >
                <i className="fa fa-list" aria-hidden="true"></i> List
              </button>
            </div>
          </div>
        </div>

        <div className={`p-2 p-lg-5 container row mx-auto`}>
          {loading.getPublishedCourses ? (
            <LoadingSpinner />
          ) : (
            publishedCourses.map((course) => (
              <div
                key={course._id}
                className={` ${viewMode === 'grid' ? 'col-12 col-md-6 col-lg-4' : 'col-12'} my-3`}
              >
                <CourseCard
                  id={course._id}
                  imageUrl={course.imageUrl}
                  duration={course.duration}
                  title={course.title}
                  rating={course.rating}
                  price={course.price}
                  viewMode={viewMode}
                  introVideo={course.introVideoUrl}
                  _id={course._id}
                  averageRating={course.averageRating}
                  totalReviews={course.totalReviews}
                />

                {/* <div className="mt-1">
                  <span className="badge bg-success">
                    💲 {discountedPrice.toFixed(2)} after {group.discount}% OFF
                  </span>
                </div> */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
