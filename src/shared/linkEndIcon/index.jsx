import React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const LinkWithEndIcon = ({
  text = "Learn More",
  icon = "fa-solid fa-arrow-right",
  customClass = "",
  to = "#",
}) => {
  return (
    <Link to={to} className={`${styles.learnMoreBtn} ${customClass}`}>
      {text} <i className={`${icon} ms-2`}></i>
    </Link>
  );
};

export default LinkWithEndIcon;
