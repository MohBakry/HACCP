'use client';

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import logo from '../../src/Assets/images/logo.PNG'
import Image from 'next/image';
import style from'./navbar.module.css'

export default function Navbar() {
      let pathName=usePathname();
      let links=[
            {path:'/',link:'Home'},
            {path:'/aboutUs',link:'About Us'},
            {path:'/courses',link:'Courses'},
            {path:'/consultation',link:'Consultation'},
            {path:'/directory',link:'Directory'},
            {path:'/events',link:'Events'},
            {path:'/podcast',link:'Podcast'},
            {path:'/news',link:'News'},
            {path:'/contactUs',link:'Contact Us'},
      ]
  return (
    <>
    <nav className="navbar navbar-expand-md navbar-light p-0 ">
            <div className="container-fluid pe-0 ">
            <Link className="navbar-brand" href="/">
            <Image className='mx-3' src={logo} width={200} height={100} alt="HACCP" />
            </Link>
            <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
           <div className={`flex-wrap w-100   ${style.navround} `}>
            <div className={`${style.navround } ${style.social} ms-auto d-flex w-75 `}>
            <div className={`${style.socialround} social w-75 bg-white py-2 d-flex justify-content-around`}>
              
              <i className={`${style.socicon} fa-brands fa-linkedin`}></i>
              <i className={`${style.socicon} fa-brands fa-spotify`}></i>
              <i className={`${style.socicon} fa-brands fa-youtube`}></i>
              <i className={`${style.socicon} fa-brands fa-twitter`}></i>
              <i className={`${style.socicon} fa-brands fa-facebook`}></i>
              <i className={`${style.socicon} fa-brands fa-instagram`}></i>
              
            </div>
            <div className="login mx-auto">
            <i className="fa-solid fa-user text-white mx-2"></i>
             <span className='text-white'>Login/Register</span>
            </div>
            </div>
           <div className="collapse py-3 navbar-collapse   " id="collapsibleNavId">
              <ul className={`${style.links} navbar-nav w-100  justify-content-around ms-auto mt-0 mt-lg-0`}>
              {links.map((link)=><li className="nav-item ">
                  <Link className={pathName===link.path?'nav-link text-white bg-info':'nav-link text-white'} href={link.path}>{link.link}</Link>
                </li>)}
                
            <li className='nav-item align-items-center d-flex' >
            <i class="fa-solid fa-magnifying-glass"></i>       
                 </li>
              </ul>
             
            </div>
           </div>
          </div>
        </nav>
      
    </>
  )
}
