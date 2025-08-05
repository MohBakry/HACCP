

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Courses from '../courses';
import CourseCard from '../../shared/CourseCard';
import CompletedCourses from '../courses/copmletedCourses';
import CurrentCourses from '../courses/currentCourses';
import styles from './styles.module.css'
import Profile from './editProfile';

export default function ProfilePage() {
  const [selectedPage, setSelectedPage] = useState('myCourses');
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="d-flex">
      {/* Sidebar */}
     
      <div
       className={`${styles.bg} col-md-2 border-end text-white p-2 border-bottom`}
        
      >
        <div className='m-1'>
        <h3>Welcome Ahmed</h3>
        </div>
        <div className={`${styles.bgTitle} p-1 border-bottom nav border-end vh-100`}>
        <ul className="nav flex-column p-2">
         
          <li className="nav-item my-2">
            <button
              className={`${styles.btnSide} nav-link  btn btn-link`}
              onClick={() => setSelectedPage('profile')}
            >
              
            <h6>Profile Info</h6>
            </button>
          </li>
          <li className="nav-item my-2">
            <button
              className={`${styles.btnSide} nav-link  btn btn-link`}
              onClick={() => setSelectedPage('myCourses')}
            >
              
            <h6>My Courses</h6>
            </button>
          </li>
          <li className="nav-item my-2">
            <button
              className={`${styles.btnSide} nav-link  btn btn-link`}
              onClick={() => setSelectedPage('completed')}
            >
              
            <h6>Recommended Courses</h6>
            </button>
          </li>
        </ul>
        </div>
       
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-5">
        {selectedPage === 'profile' && (
          <Profile/>
        )}

        {selectedPage === 'myCourses' && (
          
    <div className="d-flex ">
          
           <div  className="flex-grow-1 col-9 p-4">
             <h2 className="mb-4">My Courses</h2>
    
             <ul className="nav nav-tabs mb-4">
               <li className='nav-item' >
                 <button
                  className={`${styles.btnCnt} nav-link ${activeTab === 'current' ? 'active' : ''}`}
                  onClick={() => setActiveTab('current')}
                >
                 <h6 className='p-2'>
                 Current Courses</h6> 
                </button>
              </li>
              <li className='nav-item' >
                <button
                  className={`${styles.btnCnt} nav-link ${activeTab === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveTab('completed')}
                >
                                   <h6 className='p-2'>

                  Completed Courses
                  </h6>
                </button>
              </li>
            </ul>
    
            {activeTab === 'current' ? (
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <CurrentCourses/>
                      
                    </div>
                  </div>
                </div>
                {/* Add more current courses */}
              </div>
            ) : (
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="card shadow-sm bg-light">
                    <div className="card-body">
                      {/* <h5 className="card-title">JavaScript Mastery</h5> */}
                      <CompletedCourses/>
                      
                    </div>
                  </div>
                </div>
                {/* Add more completed courses */}
              </div>
            )}
          </div>
        </div>
      )
    }
        

        {selectedPage === 'completed' && (
          <div>
            <h2>Completed Courses</h2>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">JavaScript Mastery</h5>
                <p className="card-text text-success">Completed</p>
              </div>
            </div>
            {/* Add more completed courses */}
          </div>
        )}
      </div>
    </div>
  );
}
