import React, { useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import Select from "react-select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemsAsync,
  selectCartDetail,
} from "../../Features/cart/cartSlice";
import { getLocalStorageData } from "../../utils/helper";
import { paymentSelectStyles } from "../../utils/customSelectStyle";
import { paymentOptions } from "../../utils/options";
import {
  addInvoiceAsync,
  fetchInvoiceByIdAsync,
  selectSelectedInvoice,
} from "../../Features/invoice/invoiceSlice";
function Checkout({ invoiceId, mobileView }) {
  const userName = getLocalStorageData("name");
  const navigate = useNavigate();
  const selectNavbarHeight = useSelector((state) => state.ui.navbarHeight);
  const dispatch = useDispatch();
  const cart = useSelector(selectCartDetail);

  const [selectedProduct, setSelectedProduct] = useState({
    name: "",
    color: "",
  });
  const [address, setAddress] = useState("");
  const [paymentMode, setPaymentMode] = useState(null);
  const [addressError, setAddressError] = useState("");
  const [paymentModeError, setPaymentModeError] = useState("");
  const [invoiceProducts, setInvoiceProducts] = useState(null);
  const invoice = useSelector(selectSelectedInvoice);

  const handleProductClick = (product) => {
    setSelectedProduct({ ...product });
  };

  const handlePaymentModeChange = (selectedOption) => {
    setPaymentMode(selectedOption);
    setPaymentModeError("");
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const handlePlaceOrder = () => {
    if (selectedProduct?.name || selectedProduct?.color) {
      if (!address) {
        setAddressError("*Please enter delivery address!");
      }
      if (!paymentMode) {
        setPaymentModeError("*Please select a payment mode!");
      }
      if (!address || !paymentMode) {
        toast.error("Fill the required fields!");
      }
    } else {
      toast.error("Add products in your cart");
    }

    if (address && paymentMode) {
      const orderDetails = {
        deliveryAddress: address,
        paymentMethod: paymentMode.value,
        items: cart?.items,
        orderTotal: cart?.total + 45,
      };

      dispatch(addInvoiceAsync(orderDetails)).then(() => {
        dispatch(deleteCartItemsAsync());
      });
      navigate("/order");
    }
  };

  useEffect(() => {
    if (cart?.totalItems > 0) {
      setSelectedProduct({ ...cart?.items[0]?.product });
    }
  }, [cart]);

  useEffect(() => {
    if (invoiceId) {
      dispatch(fetchInvoiceByIdAsync(invoiceId));
    }
  }, [dispatch, invoiceId]);

  useEffect(() => {
    if (invoiceId && invoice) {
      const { deliveryAddress, paymentMethod, items } = invoice;
      setAddress(deliveryAddress);
      setPaymentMode(paymentMethod);
      setInvoiceProducts(items);
      setSelectedProduct({ ...items[0].product });
    }
  }, [invoiceId, invoice]);

  return (
    <div
      style={
        mobileView
          ? { marginTop: "40px" }
          : { marginTop: `${selectNavbarHeight}px` }
      }
      className={styles.checkoutContainer}
    >
      <div className={styles.buttonRow}>
        {mobileView && (
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            🡨
          </button>
        )}
      </div>
      {!mobileView && (
        <div className={styles.buttonRow}>
          <button
            onClick={() => {
              navigate("/cart");
            }}
          >
            Back to cart
          </button>
        </div>
      )}
      <div className={styles.checkoutRow}>
        {invoiceId && invoiceProducts ? "Invoice" : "Checkout"}
      </div>
      <div className={styles.checkoutBox}>
        <div className={styles.leftContainer}>
          <div className={styles.leftFirstRow} id={styles.commonRow}>
            <div className={styles.boxContainer}>
              <p>1. Delivery address</p>
            </div>
            <div className={styles.boxContainer}>
              <span>{userName}</span>
              <textarea
                value={address}
                onChange={handleAddressChange}
                readOnly={invoiceId && invoiceProducts}
                style={invoiceId && invoiceProducts ? { border: "none" } : null}
              ></textarea>
              {addressError && (
                <div className={styles.error}>{addressError}</div>
              )}
            </div>
          </div>
          <hr />
          <div className={styles.leftSecondRow} id={styles.commonRow}>
            <div className={styles.boxContainer}>
              <p>2. Payment method</p>
            </div>
            <div className={styles.boxContainer}>
              {invoiceId && invoiceProducts ? (
                <input
                  type="text"
                  value={paymentMode}
                  readOnly
                  className={styles.readOnlyInput}
                />
              ) : (
                <Select
                  isSearchable={false}
                  placeholder="Mode of payment"
                  styles={paymentSelectStyles}
                  options={paymentOptions}
                  value={paymentMode}
                  onChange={handlePaymentModeChange}
                />
              )}
              {paymentModeError && (
                <div className={styles.error}>{paymentModeError}</div>
              )}
            </div>
          </div>
          <hr />
          <div className={styles.leftThirdRow} id={styles.commonRow}>
            <div className={styles.boxContainer}>
              <p>3. Review items and delivery</p>
            </div>
            <div className={styles.boxContainer}>
              <div className={styles.imagesContainer}>
                {invoiceId && invoiceProducts
                  ? invoiceProducts?.map((item, index) => (
                      <img
                        src={item?.product?.images[0]}
                        alt="Product Image"
                        key={index}
                        className={styles.img}
                        onClick={() => {
                          handleProductClick(item?.product);
                        }}
                      />
                    ))
                  : cart?.items?.map((item, index) => (
                      <img
                        src={item?.product?.images[0]}
                        alt="Product Image"
                        key={index}
                        className={styles.img}
                        onClick={() => {
                          handleProductClick(item?.product);
                        }}
                      />
                    ))}
              </div>
              <p id={styles.productName}>{selectedProduct?.title}</p>
              <span>Color : {selectedProduct?.color}</span>
              {mobileView && <span>In Stock</span>}
              <div id={styles.deliveryTime}>
                Estimated delivery : <br />
                Monday — FREE Standard Delivery
              </div>
            </div>
          </div>
          <hr />
          {!mobileView && (
            <div className={styles.leftFourthRow} id={styles.commonRow}>
              {!invoiceId && !invoiceProducts && (
                <div className={styles.placeOrderRow}>
                  <button onClick={handlePlaceOrder}>Place your order</button>
                  <div>
                    <p>
                      Order Total : ₹
                      {invoiceId && invoiceProducts
                        ? invoice?.orderTotal
                        : cart?.total + 45 || 45}
                      .00
                    </p>
                    <span>
                      By placing your order, you agree to Musicart privacy
                      notice and conditions of use.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={styles.rightContainer}>
          {!mobileView && (
            <div className={styles.placeOrderBox}>
              {!invoiceId && !invoiceProducts && (
                <div className={styles.firstRow}>
                  <button onClick={handlePlaceOrder}>Place your order</button>
                  <p>
                    By placing your order, you agree to Musicart privacy notice
                    and conditions of use.
                  </p>
                  <hr />
                </div>
              )}
              <div className={styles.secondRow}>
                <p>Order Summary</p>
                <div>
                  <span>Items :</span>
                  <span>
                    ₹
                    {invoiceId && invoiceProducts
                      ? invoice?.orderTotal - 45
                      : cart?.total}
                    .00
                  </span>
                </div>
                <div>
                  <span>Delivery :</span>
                  <span>₹45.00</span>
                </div>
              </div>
              <hr />
              <div className={styles.thirdRow}>
                <span>Order total :</span>
                <span>
                  ₹
                  {invoiceId && invoiceProducts
                    ? invoice?.orderTotal
                    : cart?.total + 45 || 45}
                  .00
                </span>
              </div>
            </div>
          )}
          {mobileView && (
            <div className={styles.placeOrderBox}>
              {!invoiceId && !invoiceProducts && (
                <div className={styles.firstRow}>
                  <button
                    style={{ marginBottom: "2rem" }}
                    onClick={handlePlaceOrder}
                  >
                    Place your order
                  </button>
                </div>
              )}
              <hr />
              <div className={styles.thirdRow}>
                <p>Order total :</p>
                <span>
                  ₹
                  {invoiceId && invoiceProducts
                    ? invoice?.orderTotal
                    : cart?.total + 45 || 45}
                  .00
                </span>
              </div>

              <div className={styles.secondRow}>
                <p>Order Summary</p>
                <div>
                  <span>Items :</span>
                  <span>
                    ₹
                    {invoiceId && invoiceProducts
                      ? invoice?.orderTotal - 45
                      : cart?.total}
                    .00
                  </span>
                </div>
                <div>
                  <span>Delivery :</span>
                  <span>₹45.00</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
