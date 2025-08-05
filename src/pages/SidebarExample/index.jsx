import React from 'react'
import {
  CBadge,
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavGroup,
  CNavItem,
} from '@coreui/react'

import '@coreui/coreui/dist/css/coreui.min.css'
import styles from './styles.module.css'

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'User' }

  return (
    <CSidebar className={`${styles.bg} border-end text-white w-25`}>
      <CSidebarHeader className="border-bottom">
        <h3>Welcome {user.name}</h3>
      </CSidebarHeader>

      <CSidebarNav className={`${styles.bgTitle} border-bottom`}>
        <h5 className="p-2">My Menu</h5>

        <CNavItem className={styles.navItem} href="/myProfile">
          My Profile
        </CNavItem>

        <CNavGroup
          className={styles.navItem}
          toggler={<div className={styles.navItem}>My Courses</div>}
        >
          <CNavItem className={styles.navItem} href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Current Courses
          </CNavItem>

          <CNavItem className={styles.navItem} href="#">
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>{' '}
            Completed Courses
          </CNavItem>
        </CNavGroup>

        <CNavItem className={styles.navItem} href="#">
          Recommended Courses
          <CBadge color="primary ms-auto p-1">NEW</CBadge>
        </CNavItem>

        <CNavItem className={styles.navItem} href="#">
          Download CoreUI
        </CNavItem>

        <CNavItem className={styles.navItem} href="#">
          Try CoreUI PRO
        </CNavItem>
      </CSidebarNav>

      <CSidebarHeader className="border-top">
        <CSidebarToggler />
      </CSidebarHeader>
    </CSidebar>
  )
}
