import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import logoW from '../../assets/images/logo-white.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../Redux/auth/user.store';
import Instructors from '../../pages/dashBoard/instructors';

export default function DashboardSidebar() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const links = {
    student: [
      {
        path: '/my-courses',
        link: 'My Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/profile',
        link: 'My Profile',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/recommended-courses',
        link: 'Recommended Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
    ],
    user: [
      {
        path: '/my-courses',
        link: 'My Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/profile',
        link: 'My Profile',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/recommended-courses',
        link: 'Recommended Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
    ],
    admin: [
      {
        path: '/dashboard/manage-courses',
        link: 'Manage Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/dashboard/current-courses',
        link: 'Current Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/dashboard/completed-courses',
        link: 'Completed Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
      {
        path: '/dashboard/instructors',
        link: 'Instructors',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
    ],
    instructor: [
      {
        path: '/dashboard/instructor-courses',
        link: 'My Courses',
        icon: <i className="fas fa-tachometer-alt me-2"></i>,
      },
    ],
  };
  return (
    <div
      className={` position-sticky top-0 start-0 d-flex flex-column vh-100 p-3 ${styles.sidebar}`}
    >
      <div className="mb-4 text-center">
        <div className={`${styles.logoSub} col-md-3  justify-content-center `}>
          <Link to="/">
            <img src={logoW} width={120} height={60} alt="ff" />
          </Link>
        </div>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {links[user.role].map((item) => (
          <li className="nav-item py-2" key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${styles.link} ${isActive ? styles.active : ''}`
              }
            >
              <div className="d-flex">
                <div className="d-flex justify-center pt-2">{item.icon}</div>
                <div className="d-flex word-wrap">{item.link}</div>
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-3 border-top border-secondary">
        <h4>{user?.name}</h4>
        <div className="pb-3">{user?.role}</div>
        <button
          className={`btn btn-outline-light w-100 ${styles.navItem}`}
          onClick={() => {
            dispatch(logout());
          }}
        >
          <i className="fa fa-sign-out-alt me-2" /> Logout
        </button>
      </div>
    </div>
  );
}
