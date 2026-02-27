import React from 'react';
import styles from '../styles.module.css';

export default function CourseOverview({ courseContent }) {
  return (
    <div className="row mb-5">
      <div className="col-12">
        <div className={styles.courseHeader}>
          <h3 className="mb-3" style={{ color: '#012F5A' }}>
            <i className="fas fa-book-open me-3"></i>
            Course Overview
          </h3>
          <p
            className="text-muted"
            style={{ fontSize: '1.1rem', lineHeight: '1.8' }}
          >
            {courseContent.course?.description ||
              courseContent.courseTitle ||
              'No description available'}
          </p>

          {/* Course Meta Info */}
          <div className="d-flex gap-4 flex-wrap mt-4">
            <span
              className="badge p-2"
              style={{ backgroundColor: '#012F5A', fontSize: '1rem' }}
            >
              <i className="fas fa-book me-2"></i>
              {courseContent.progress?.totalModulesCount ||
                courseContent.modules?.length ||
                0}{' '}
              Modules
            </span>
            <span
              className="badge p-2"
              style={{ backgroundColor: '#83c7d0', fontSize: '1rem' }}
            >
              <i className="fas fa-clock me-2"></i>
              {courseContent.courseDuration ||
                courseContent.course?.courseDuration ||
                'N/A'}{' '}
              hours
            </span>
            <span
              className="badge p-2"
              style={{ backgroundColor: '#6c757d', fontSize: '1rem' }}
            >
              <i className="fas fa-tag me-2"></i>
              {courseContent.courseCategory ||
                courseContent.course?.courseCategory ||
                'General'}
            </span>
          </div>

          {/* Progress Bar */}
          {courseContent.progress?.overallProgress !== undefined && (
            <div className="mt-4">
              <div className="d-flex justify-content-between mb-2">
                <strong>Your Progress</strong>
                <span>{courseContent.progress.overallProgress}%</span>
              </div>
              <div className="progress" style={{ height: '10px' }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{
                    width: `${courseContent.progress.overallProgress}%`,
                  }}
                  aria-valuenow={courseContent.progress.overallProgress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
