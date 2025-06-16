"use client";

import React from "react";
import logoW from "../../../assets/images/logo-white.png";
import "bootstrap/dist/js/bootstrap.bundle.js";
import style from "./styles.module.css";
import useResponsiveSizes from "../../../hooks/useResponsiveSizes.js";

export default function Footer() {
  // Define custom breakpoints with width/height for each range
  const breakpoints = [
    // { minWidth: 0, maxWidth: 576, width: 300, height: 200 }, // Extra small devices (phones)
    // { minWidth: 576, maxWidth: 768, width: 400, height: 300 }, // Small devices (portrait tablets)
    { minWidth: 0, maxWidth: 2000, width: 150, height: 75 }, // Medium devices (landscape tablets)
    { minWidth: 2000, maxWidth: 3500, width: 280, height: 140 }, // Large devices (desktops)
    { minWidth: 3500, maxWidth: Infinity, width: 300, height: 150 }, // Extra large devices (large desktops)
  ];

  // Get the responsive sizes based on current window width
  const { width, height } = useResponsiveSizes(breakpoints);
  return (
    <footer className={`${style.footer} text-light`}>
      <div className="container">
        <div className="row py-4">
          {/* Left Section - Logo and Social Icons */}
          <div className="col-12 col-md-4 px-4 px-md-2 px-lg-4 mb-3 row">
            <div className={`${style.footerLogo} col-8 mb-3 d-flex `}>
              <img
                src={logoW}
                alt="HACCP Logo"
                style={{width:width,height:height}}
              />
            </div>
            <p
              className={`col-12  col-lg-9 d-flex mb-3 text-secondary ${style.footerText}`}
            >
              Continually optimize backward manufactured products whereas
              communities negotiate life compelling alignments
            </p>
            <div className="col-12  d-flex flex-wrap">
              <h3 className="w-100 mb-3">Follow us on:</h3>
              <div className="d-flex w-100 gap-4 gap-md-3">
                <i className={`${style.socicon} fa-brands fa-linkedin`}></i>
                <i className={`${style.socicon} fa-brands fa-spotify`}></i>
                <i className={`${style.socicon} fa-brands fa-youtube`}></i>
                <i className={`${style.socicon} fa-brands fa-twitter`}></i>
                <i className={`${style.socicon} fa-brands fa-facebook`}></i>
                <i className={`${style.socicon} fa-brands fa-instagram`}></i>
              </div>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="col-12 col-md-4 px-4 px-md-2 px-lg-4 mb-3 ">
            <h5>Quick Links</h5>
            <ul className={`list-unstyled ${style.links}`}>
              <li className="mb-2">
                <a href="#" className="text-light">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light">
                  Learning
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light">
                  Events
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light">
                  News
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light">
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="col-12 col-md-4 px-4 px-md-2 px-lg-4">
            <h5>Contact Us</h5>
            <ul className={`list-unstyled ${style.info} `}>
              <li className="mb-2">
                <i className={`fa-solid fa-location-dot ${style.infoIcon}`}></i>{" "}
                84, 115 st, Maadi, Cairo EGYPT
              </li>
              <li className="mb-2">
                <i className={`fa-solid fa-envelope  ${style.infoIcon}`}></i>{" "}
                info@haccp.com
              </li>
              <li className="mb-2">
                <i className={`fa-solid fa-phone  ${style.infoIcon}`}></i>{" "}
                01033535969
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={`${style.footerBottom} py-2`}>
        <div className="container">
          <p className="text-center mb-0">
            © 2024 HACCP Institute Nord. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
