"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../src/Assets/images/logo.PNG";
import logoW from "../../../src/Assets/images/logo-w.PNG";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.js";
import style from "./styles.module.css";
import useResponsiveSizes from "../../../hooks/useResponsiveSizes.js";

export default function Footer() {
  // Define custom breakpoints with width/height for each range
  const breakpoints = [
    { minWidth: 0, maxWidth: 576, width: 300, height: 200 }, // Extra small devices (phones)
    { minWidth: 576, maxWidth: 768, width: 400, height: 300 }, // Small devices (portrait tablets)
    { minWidth: 768, maxWidth: 992, width: 500, height: 350 }, // Medium devices (landscape tablets)
    { minWidth: 992, maxWidth: 1200, width: 600, height: 400 }, // Large devices (desktops)
    { minWidth: 1200, maxWidth: Infinity, width: 300, height: 150 }, // Extra large devices (large desktops)
  ];

  // Get the responsive sizes based on current window width
  const { width, height } = useResponsiveSizes(breakpoints);
  return (
    <footer className={`${style.footer} text-light`}>
      <div className="container">
        <div className="row py-4">
          {/* Left Section - Logo and Social Icons */}
          <div className="col-md-4 mb-3">
            <div className="footer-logo mb-3">
              <Image
                src={logoW}
                alt="HACCP Logo"
                width={width}
                height={height}
              />{" "}
              {/* Replace with actual logo path */}
            </div>
            <div className="d-flex gap-2 justify-center">
              <i className={`${style.socicon} fa-brands fa-linkedin`}></i>
              <i className={`${style.socicon} fa-brands fa-spotify`}></i>
              <i className={`${style.socicon} fa-brands fa-youtube`}></i>
              <i className={`${style.socicon} fa-brands fa-twitter`}></i>
              <i className={`${style.socicon} fa-brands fa-facebook`}></i>
              <i className={`${style.socicon} fa-brands fa-instagram`}></i>
            </div>
          </div>

          {/* Middle Section - Quick Links */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Learning
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="text-light">
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Right Section - Contact Info */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>
                <i className="bi bi-geo-alt"></i> 84, 115 st, Maadi, Cairo EGYPT
              </li>
              <li>
                <i className="bi bi-envelope"></i> info@haccp.com
              </li>
              <li>
                <i className="bi bi-phone"></i> 01033535969
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom bg-primary py-2">
        <div className="container">
          <p className="text-center mb-0">
            © 2024 HACCP Institute Nord. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
