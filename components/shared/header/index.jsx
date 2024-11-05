import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const Header = ({ title = "", img }) => {
  return (
    <div className="header position-relative">
      {img && (
        <Image
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          alt="About-Header"
          src={img}
        />
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
