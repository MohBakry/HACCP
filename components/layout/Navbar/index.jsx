"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../src/Assets/images/logo.PNG";
import logoW from "../../../src/Assets/images/logo-w.PNG";
import Image from "next/image";
import "bootstrap/dist/js/bootstrap.bundle.js";
import style from "./styles.module.css";

export default function Navbar() {
  let pathName = usePathname();
  let links = [
    { path: "/", link: "Home" },
    { path: "/aboutUs", link: "About Us" },
    { path: "/courses", link: "Courses" },
    { path: "/consultation", link: "Consultation" },
    { path: "/directory", link: "Directory" },
    { path: "/events", link: "Events" },
    { path: "/podcast", link: "Podcast" },
    { path: "/news", link: "News" },
    { path: "/contactUs", link: "Contact Us" },
  ];
  return (
    <>
      <nav className="navbar fixed-top navbar-expand-md navbar-light bg-body bg-opacity-75 py-0 g ">
        <div className="container-fluid p-0 ">
          <div className="navbar-brand py-0">
            <Link href="/">
              <Image
                className={`${style.logos}   mx-3`}
                src={logo}
                width={200}
                height={100}
                alt="HACCP"
              />
            </Link>
          </div>

          <div className={`flex-wrap w-100   ${style.navround} `}>
            <div className="row g-0">
              <div
                className={`${style.logoSub} col-md-3  justify-content-center `}
              >
                <Link href="/">
                  <Image src={logoW} width={120} height={60} alt="ff" />
                </Link>
              </div>

              <button
                className={`${style.secBg} navbar-toggler border rounded-0 border-3 border-white d-lg-none`}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span>
                  <i class="fa-solid fa-bars text-white"></i>
                </span>
              </button>

              <div
                className={`${style.navround} ${style.social} ms-auto d-flex col-md-9 `}
              >
                <div
                  className={`${style.socialround} social w-75 bg-white align-items-center py-2 d-flex justify-content-around`}
                >
                  <i className={`${style.socicon} fa-brands fa-linkedin`}></i>
                  <i className={`${style.socicon} fa-brands fa-spotify`}></i>
                  <i className={`${style.socicon} fa-brands fa-youtube`}></i>
                  <i className={`${style.socicon} fa-brands fa-twitter`}></i>
                  <i className={`${style.socicon} fa-brands fa-facebook`}></i>
                  <i className={`${style.socicon} fa-brands fa-instagram`}></i>
                </div>
                <div
                  className={`${style.socicon} login mx-auto align-items-center d-flex`}
                >
                  <i className="fa-solid fa-user text-white mx-2"></i>
                  <span className="text-white pe-1">Login</span>
                </div>
              </div>
            </div>

            <div
              className="collapse py-2 navbar-collapse   "
              id="collapsibleNavId"
            >
              <ul
                className={`${style.links} navbar-nav w-100  justify-content-around ms-auto mt-0 mt-lg-0`}
              >
                {links.map((link) => (
                  <li className="nav-item " key={link}>
                    <Link
                      className={
                        pathName === link.path
                          ? ` nav-link ${style.activLink} text-info text-bold `
                          : `nav-link text-white`
                      }
                      href={link.path}
                    >
                      {link.link}
                    </Link>
                  </li>
                ))}

                <li className="nav-item align-items-center justify-content-center d-flex">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
