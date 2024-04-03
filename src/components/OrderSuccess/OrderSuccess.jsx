import React from "react";

import styles from "./OrderSuccess.module.css";
import partyImg from "../../assets/images/partyImg.png";
import { useNavigate } from "react-router-dom";
function OrderSuccess() {
  const navigate = useNavigate();
  return (
    <div className={styles.order}>
      <div className={styles.orderContainer}>
        <div className={styles.orderBox}>
          <img src={partyImg} alt="Party Image" />
          <span>Order is placed successfully!</span>
          <p>You will be receiving a confirmation email with order details</p>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to Home page
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
