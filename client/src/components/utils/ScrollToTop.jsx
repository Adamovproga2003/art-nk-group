import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";

import styles from "./ScrollToTop.module.css"

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="top-to-btm">
      <FaAngleUp className={`${styles.iconPosition} ${styles.iconStyle} ${showTopBtn && styles.visible}`} onClick={goToTop} />
    </div>
  );
};
export default ScrollToTop;
