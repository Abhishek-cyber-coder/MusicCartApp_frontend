import React from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "./LoadingToast.module.css";
function LoadingToast() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <FaSpinner
        icon="spinner"
        className={styles.spinner}
        style={{ width: "24px", height: "24px" }}
      />
      <span>Loading...</span>
    </div>
  );
}

export default LoadingToast;
