import React from 'react';
import styles from './styles.module.css';
import { useLocation } from 'react-router-dom';
const routeTitles = {
  '/manage-courses/course-content': 'Course Content',
  '/instructors': 'Instructors',
  '/course-groups': 'Course Groups',
  '/students': 'Students',
  '/manage-courses': 'Manage Courses & Groups',
  '/manage-courses/add': 'Add Course',
  '/dashboard': 'Dashboard',
};
const PageHeader = () => {
  const { pathname } = useLocation();

  const [currentTitle, setCurrentTitle] = React.useState('');

  React.useEffect(() => {
    const path = Object.keys(routeTitles).find((key) => pathname.includes(key));
    setCurrentTitle(routeTitles[path] || 'Dashboard');
  }, [pathname]);
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>
        {currentTitle ? currentTitle : 'Dashboard'}
      </h1>
    </div>
  );
};

export default PageHeader;
