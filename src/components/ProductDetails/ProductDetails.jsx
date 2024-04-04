import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";
import starIcon from "../../assets/icon/starIcon.svg";
import prevArrow from "../../assets/icon/prevArrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByIdApi } from "../../apis/product";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorageData } from "../../utils/helper";
import { addToCartAsync, addedToCart } from "../../Features/cart/cartSlice";
import ImageCarousel from "../Carousel/ImageCarousel";
function ProductDetails({ mobileView }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectNavbarHeight = useSelector((state) => state.ui.navbarHeight);
  const isAuthenticated = getLocalStorageData("isAuthenticated");
  const { productId } = useParams();

  const [product, setProduct] = useState(null);

  const handleBuyNow = (productId, quantity) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCartAsync({ productId, quantity })).then(() => {
        navigate("/cart");
      });
    }
  };

  const getProductById = async (productId) => {
    const response = await getProductByIdApi(productId);
    setProduct(response);
  };

  const handleAddToCart = (productId, quantity) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(addToCartAsync({ productId, quantity })).then(() => {
        dispatch(addedToCart());
      });
    }
  };

  useEffect(() => {
    getProductById(productId);
  }, [dispatch]);

  return (
    <div
      style={
        mobileView
          ? { marginTop: "90px" }
          : { marginTop: `${selectNavbarHeight + 50}px` }
      }
      className={styles.mainContainer}
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

      {mobileView && (
        <button
          className={styles.buyNowButton}
          onClick={() => {
            handleBuyNow(product?._id, 1);
          }}
        >
          Buy Now
        </button>
      )}
      {!mobileView && (
        <div className={styles.productHeading}>{product?.heading}</div>
      )}
      <div className={styles.productDetails}>
        {!mobileView && (
          <div className={styles.imgContainer}>
            <img src={product?.images[0]} alt="" />
          </div>
        )}

        {mobileView && <ImageCarousel images={product?.images} />}
        <div className={styles.details}>
          <p className={styles.productName}>{product?.title}</p>
          <div className={styles.reviewRow}>
            <div className={styles.stars}>
              <div className={styles.stars}>
                {product &&
                  Array(product.rating)
                    .fill()
                    .map((_, index) => (
                      <img key={index} src={starIcon} alt="star" />
                    ))}
              </div>
            </div>
            <span>({product?.numOfCustomerReviews} Customer reviews)</span>
          </div>
          {mobileView && (
            <div className={styles.productfeatures}>{product?.heading}</div>
          )}
          <p className={styles.priceRow}>Price - ₹ {product?.price}</p>
          <p className={styles.colorAndTypeOfHeadphone}>
            {product?.color} | {product?.typeOfProduct}
          </p>
          <div className={styles.description}>
            <ul>
              About this item
              {product?.description?.split("\n")?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <p className={styles.priceRow}>
            Available - <span>In stock</span>
          </p>
          <p className={styles.priceRow}>
            Brand - <span>{product?.brand}</span>
          </p>
        </div>
      </div>
      {!mobileView && (
        <div className={styles.bottomRow}>
          <div className={styles.bottomImgContainer}>
            {product?.images?.slice(1, 4)?.map((img, index) => (
              <div className={styles.subImg} key={index}>
                <img src={img} alt="image" />
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => {
                handleAddToCart(product?._id, 1);
              }}
            >
              Add to cart
            </button>
            <button
              className={styles.buyNowButton}
              onClick={() => {
                handleBuyNow(product?._id, 1);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      )}
      {mobileView && (
        <>
          <div className={styles.buttonContainer}>
            <button
              className={styles.addToCartButton}
              onClick={() => {
                handleAddToCart(product?._id, 1);
              }}
            >
              Add to cart
            </button>
            <button
              style={{ marginBottom: "7rem" }}
              className={styles.buyNowButton}
              onClick={() => {
                handleBuyNow(product?._id, 1);
              }}
            >
              Buy Now
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
