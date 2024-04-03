import React from "react";
import styles from "./ProductGridItem.module.css";
import { getLocalStorageData } from "../../utils/helper";
import addToCartIcon from "../../assets/icon/addToCartIcon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addedToCart, addToCartAsync } from "../../Features/cart/cartSlice";
function ProductGridItem({ productDetail }) {
  const isAuthenticated = getLocalStorageData("isAuthenticated");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (productId, quantity, e) => {
    e.stopPropagation();
    dispatch(addToCartAsync({ productId, quantity })).then(() => {
      dispatch(addedToCart());
    });
  };

  return (
    <div className={styles.gridBox}>
      <div
        className={styles.imgContainer}
        onClick={() => {
          navigate(`/product/${productDetail?._id}`, {
            state: { productName: productDetail?.title },
          });
        }}
      >
        <img
          src={productDetail?.images[0]}
          alt="Product Image"
          className={styles.productImg}
        />
        {isAuthenticated && (
          <div
            className={styles.addToCartButton}
            onClick={(e) => {
              handleAddToCart(productDetail?._id, 1, e);
            }}
          >
            <img src={addToCartIcon} alt="Cart Icon" />
          </div>
        )}
      </div>
      <div className={styles.gridDetailsContainer}>
        <p>{productDetail?.title}</p>
        <p>Price - ₹ {productDetail?.price}</p>
        <p>
          {productDetail?.color} | {productDetail?.typeOfProduct}
        </p>
      </div>
    </div>
  );
}

export default ProductGridItem;
