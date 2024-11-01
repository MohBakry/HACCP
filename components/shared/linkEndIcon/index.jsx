import React from "react";
import styles from "./styles.module.css";

const LinkWithEndIcon = ({
  text = "Learn More",
  icon = "fa-solid fa-arrow-right",
  customClass = "",
  to = "#",
}) => {
  return (
    <a href={to} className={`${styles.learnMoreBtn} ${customClass}`}>
      {text} <i className={`${icon} ms-2`}></i>
    </a>
  );
};

export default LinkWithEndIcon;
