import React from "react";
import styles from "./UserCart.module.css";
import bagImg from "../../assets/images/bagImg.png";
import prevArrow from "../../assets/icon/prevArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCartDetail } from "../../Features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import CartProducts from "../CartProducts/CartProducts";

function UserCart({ mobileView }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectNavbarHeight = useSelector((state) => state.ui.navbarHeight);
  const cart = useSelector(selectCartDetail);

  return (
    <div
      style={
        mobileView
          ? { marginTop: "90px" }
          : { marginTop: `${selectNavbarHeight}px` }
      }
      className={styles.userCart}
    >
      <div className={styles.buttonRow}>
        {mobileView ? (
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={prevArrow} alt="Prev arrow" />
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Back to products
          </button>
        )}
      </div>

      {!mobileView && (
        <div className={styles.userCartRow}>
          <img src={bagImg} alt="Bag icon" />
          <span>My Cart</span>
        </div>
      )}
      <div className={styles.cartContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.leftUpperBox}>
            {!mobileView &&
              cart?.items?.map((item, index) => {
                return (
                  <CartProducts
                    key={index}
                    productDetails={item?.product}
                    quantity={item?.quantity}
                    price={item?.price}
                  />
                );
              })}

            {mobileView &&
              cart?.items?.map((item, index) => (
                <div className={styles.cartProduct} key={index}>
                  <img src={item?.product?.images[0]} alt="Product Image" />
                  <div className={styles.detailsRow}>
                    <p>{item?.product?.title}</p>
                    <h4>₹{item?.product?.price}</h4>
                    <span>Color : {item?.product?.color}</span>
                    <span>In Stock</span>
                  </div>
                </div>
              ))}
            {mobileView && (
              <div className={styles.mobileTotalPrice}>
                <div>
                  <span>Convenience Fee</span>
                  <span>₹45</span>
                </div>
                <div>
                  <p>Total :</p>
                  <p>₹{cart?.total + 45 || 0}</p>
                </div>
              </div>
            )}
          </div>

          {!mobileView && (
            <div className={styles.leftLower}>
              <span className={styles.totalItems}>
                {cart?.totalItems || "No"} Items
              </span>
              <span className={styles.totalPrice}>₹{cart?.total || 0}</span>
            </div>
          )}
          {mobileView && (
            <div className={styles.leftLower}>
              <span>
                Total Amount <b>₹{cart?.total + 45 || 0}</b>
              </span>
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                PLACE ORDER
              </button>
            </div>
          )}
        </div>

        {!mobileView && (
          <div className={styles.rightContainer}>
            <div className={styles.rightUpperBox}>
              <div className={styles.priceDetails}>
                <div>PRICE DETAILS</div>
                <span>
                  <p>Total MRP</p> <p>₹{cart?.total}</p>
                </span>
                <span>
                  <p>Discount on MRP</p>
                  <p>₹0</p>
                </span>
                <span>
                  <p>Convenience Fee</p>₹45
                </span>
              </div>
              <div className={styles.priceDetails}>
                <div>
                  <p>Total Amount</p>
                  <p>₹{cart?.total ? cart?.total + 45 : 45}</p>
                </div>
              </div>
            </div>
            <div className={styles.rightLower}>
              <button
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCart;
