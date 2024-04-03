import React from "react";
import styles from "./ProductListItem.module.css";
import addToCartIcon from "../../assets/icon/addToCartIcon.svg";
import { getLocalStorageData } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCartAsync, addedToCart } from "../../Features/cart/cartSlice";
function ProductListItem({ productDetail }) {
  const isAuthenticated = getLocalStorageData("isAuthenticated");
  const dispatch = useDispatch();

  const handleAddToCart = (productId, quantity, e) => {
    e.stopPropagation();
    dispatch(addToCartAsync({ productId, quantity })).then(() => {
      dispatch(addedToCart());
    });
  };

  const navigate = useNavigate();
  return (
    <div className={styles.listBox}>
      <div className={styles.imgContainer}>
        <img
          src={productDetail?.images[0]}
          alt="Product Image"
          className={styles.productImg}
        />
        {isAuthenticated && (
          <div
            className={styles.addToCartButton}
            onClick={(event) => {
              handleAddToCart(productDetail?._id, 1, event);
            }}
          >
            <img src={addToCartIcon} alt="cart Icon" />
          </div>
        )}
      </div>
      <div className={styles.listDetailsContainer}>
        <p className={styles.productTitle}>{productDetail?.title}</p>
        <p className={styles.otherParas}>Price - ₹ {productDetail?.price}</p>
        <p className={styles.otherParas}>
          {productDetail?.color} | {productDetail?.typeOfProduct}
        </p>
        <p className={styles.otherParas}>{productDetail?.heading}</p>
        <button
          onClick={() => {
            navigate(`/product/${productDetail?._id}`, {
              state: { productName: productDetail?.title },
            });
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default ProductListItem;
