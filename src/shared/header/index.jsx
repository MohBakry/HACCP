import React from "react";
import styles from "./styles.module.css";
// import Image from "next/image";
import useResponsiveSizes from "../../hooks/useResponsiveSizes";

const Header = ({ title = "", img }) => {
  const { width, height } = useResponsiveSizes([
    { minWidth: 0, maxWidth: 450, width: 450, height: 220 }, // Medium devices (landscape tablets)
    { minWidth: 450, maxWidth: 922, width: 930, height: 300 }, // Large devices (desktops)
    { minWidth: 922, maxWidth: 1600, width: 1600, height: 350 }, // Large devices (desktops)
    { minWidth: 1600, maxWidth: Infinity, width: 2000, height: 350 }, // Extra large devices (large desktops)
  ]);
  return (
    <div className="header position-relative mb-5">
      {img && (
        <div className="w-100 d-flex overflow-hidden">
          <img
            style={{width:width,height:height}}
            alt="About-Header"
            src={img}
            className={` ${styles.img}`}
          />
        </div>
      )}

      {title && (
        <div className={` position-absolute start-0 ${styles.headerTitle}`}>
          <h1 className={`${styles.headerText} p-4  mb-0`}>{title}</h1>
        </div>
      )}
    </div>
  );
};

export default Header;
