import React from "react";
import styles from "./Header.module.css";
import LoginComponent from "./LoginComponent/LoginComponent";
import LogoComponent from "./LogoComponent/LogoComponent";
import Navbar from "./Navbar/Navbar";
import { useLayoutEffect, useEffect, useState, useRef } from "react";

const Header = (params) => {
  const ref = useRef();
  let [check, setCheck] = useState(true);
  const sticky = useStickyHeader(0);
  const headerClasses = `${styles.header} ${sticky && check ? styles.sticky : ""}`;
  const { clientHeight } = ref;

  return (
    <header className={headerClasses} ref={ref}>
      <LogoComponent />
      <Navbar />
      <LoginComponent />
    </header>
  );
};

function useStickyHeader(offset = 0) {
  const [stick, setStick] = useState(false);

  const handleScroll = () => {
    setStick(window.scrollY > offset);
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return stick;
}

export default Header;
