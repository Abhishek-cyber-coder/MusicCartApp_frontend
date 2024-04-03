import React from "react";
import styles from "./MobileHeader.module.css";
import logoImg from "../../assets/images/logo.png";
function MobileHeader() {
  return (
    <div className={styles.mobileHeader}>
      <img src={logoImg} alt="App Logo" />
      <span>Musicart</span>
    </div>
  );
}

export default MobileHeader;
