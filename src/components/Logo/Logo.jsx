import React from "react";
import styles from "./Logo.module.css";
import logo from "../../assets/images/logo.png";
function Logo({
  _marginTop,
  _marginLeft,
  _heightAndWidth,
  _fontSize,
  _justifyContent,
}) {
  return (
    <div
      style={{
        marginTop: _marginTop,
        marginLeft: _marginLeft,
        justifyContent: _justifyContent,
      }}
      className={styles.main}
    >
      <img
        style={{ height: _heightAndWidth, width: _heightAndWidth }}
        src={logo}
        alt="logo"
      />
      <p style={{ fontSize: _fontSize }}>Musicart</p>
    </div>
  );
}

export default Logo;
