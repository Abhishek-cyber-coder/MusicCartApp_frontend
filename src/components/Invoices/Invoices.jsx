import React, { useEffect } from "react";
import styles from "./Invoices.module.css";
import invoiceImg from "../../assets/images/invoiceImg.png";
import blackInvoiceImg from "../../assets/images/blackInvoiceFooter.png";
import prevArrow from "../../assets/icon/prevArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchInvoicesAsync,
  selectAllInvoices,
} from "../../Features/invoice/invoiceSlice";
import { getLocalStorageData } from "../../utils/helper";
function Invoices({ mobileView }) {
  const userName = getLocalStorageData("name");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectNavbarHeight = useSelector((state) => state.ui.navbarHeight);

  const invoices = useSelector(selectAllInvoices);

  const handleGetInvoice = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`);
  };

  useEffect(() => {
    dispatch(fetchInvoicesAsync());
  }, [dispatch]);
  return (
    <div
      style={
        mobileView
          ? { marginTop: "10vh" }
          : { marginTop: `${selectNavbarHeight}px` }
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
            Back to Home
          </button>
        )}
      </div>
      <div className={styles.invoiceHeading}>
        {mobileView && <img src={blackInvoiceImg} alt="invoice Image" />}My
        Invoices
      </div>
      <div className={styles.invoicesContainer}>
        {invoices?.map((invoice, index) => (
          <div className={styles.invoiceBox} key={index}>
            <div className={styles.insideInvoiceBox}>
              <img src={invoiceImg} alt="Invoice icon" />
              <span>
                {userName}
                <br />
                <p>{invoice?.deliveryAddress}</p>
              </span>
            </div>
            <button
              onClick={() => {
                handleGetInvoice(invoice?._id);
              }}
            >
              View Invoice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Invoices;
