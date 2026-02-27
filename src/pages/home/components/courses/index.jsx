import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CourseCard from '../../../../shared/CourseCard';
import styles from './styles.module.css';
import LinkWithEndIcon from '../../../../shared/linkEndIcon';
import LoadingSpinner from '../../../../shared/LoadingSpinner';
import { getHighlightedCourses } from '../../../../Redux/courses/courses.service';

const PopularCourses = () => {
  const dispatch = useDispatch();
  const { highlightedCourses, loading } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getHighlightedCourses());
  }, [dispatch]);

  return (
    <section className="py-5">
      <div className="container-fluid px-5 ">
        <h2 className="text-center mb-5">Our Popular Courses</h2>
        {loading.getHighlightedCourses ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="row">
              {highlightedCourses.slice(0, 4).map((course) => (
                <div key={course._id} className="col-12 col-md-6 col-lg-3 mb-4">
                  <CourseCard
                    imageUrl={course.imageUrl || course.image}
                    duration={course.duration}
                    title={course.title}
                    rating={course.rating}
                    price={course.price}
                    _id={course._id}
                  />
                </div>
              ))}
            </div>
            <div className="text-start mt-4">
              <LinkWithEndIcon
                to="/courses"
                text="Explore More"
                customClass={`btn btn-primary ${styles.exploreButton}`}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PopularCourses;
