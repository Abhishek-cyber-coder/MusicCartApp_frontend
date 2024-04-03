import React, { useEffect } from "react";
import styles from "./CartProducts.module.css";
import Select from "react-select";
import { quantityOptions } from "../../utils/options";
import { quantitySelectStyles } from "../../utils/customSelectStyle";
import { useDispatch } from "react-redux";
import {
  getCartDetailsAsync,
  updateCartAsync,
} from "../../Features/cart/cartSlice";
function CartProducts({ productDetails, quantity, price }) {
  const dispatch = useDispatch();
  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartAsync({ productId, quantity })).then(() => {
      dispatch(getCartDetailsAsync());
    });
  };

  return (
    <div className={styles.cartProducts}>
      <img src={productDetails?.images?.[0]} alt="Product image" />
      <div className={styles.detailsColumn}>
        <h4>{productDetails?.title}</h4>
        <p style={{ color: "#A2A2A2" }}>Color - {productDetails?.color}</p>
        <p style={{ color: "#A2A2A2" }}>In Stock</p>
      </div>
      <div className={styles.detailsColumn}>
        <h4>Price</h4>
        <p>₹{productDetails?.price}</p>
      </div>
      <div className={styles.detailsColumn}>
        <h4>Quantity</h4>
        <Select
          menuShouldScrollIntoView={false}
          isSearchable={false}
          placeholder={quantity}
          options={quantityOptions}
          styles={quantitySelectStyles}
          onChange={(selectedOption) => {
            handleQuantityChange(productDetails?._id, selectedOption.value);
          }}
        />
      </div>
      <div className={styles.detailsColumn}>
        <h4>Total</h4>
        <p>₹{price}</p>
      </div>
    </div>
  );
}

export default CartProducts;
