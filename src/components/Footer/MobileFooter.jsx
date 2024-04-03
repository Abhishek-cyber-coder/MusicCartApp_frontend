import React, { useEffect } from "react";
import styles from "./MobileFooter.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import homeFooter from "../../assets/images/homeFooter.png";
import cartFooter from "../../assets/images/cartFooter.png";
import blackInvoiceFooter from "../../assets/images/blackInvoiceFooter.png";
import userLogin from "../../assets/images/userLogin.png";
import userLogout from "../../assets/images/userLogout.png";
import { getLocalStorageData } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Features/auth/authSlice";
import {
  getCartDetailsAsync,
  selectCartDetail,
  selectIsAddCart,
} from "../../Features/cart/cartSlice";
function MobileFooter() {
  const isAuthenticated = getLocalStorageData("isAuthenticated");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector(selectCartDetail);
  const isAddToCart = useSelector(selectIsAddCart);

  useEffect(() => {
    dispatch(getCartDetailsAsync());
  }, [dispatch, isAddToCart]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className={styles.footer}>
      <div>
        <img
          src={homeFooter}
          alt="Home Icon"
          onClick={() => {
            navigate("/");
          }}
        />
        <p>Home</p>
      </div>
      <div>
        <div>
          <img
            src={cartFooter}
            alt="Cart Icon"
            onClick={() => {
              navigate("/cart");
            }}
          />
          <small>{cart?.totalItems || 0}</small>
        </div>
        <p>Cart</p>
      </div>

      {!(
        location.pathname.startsWith("/product") ||
        location.pathname.startsWith("/cart") ||
        location.pathname.startsWith("/checkout")
      ) &&
        isAuthenticated && (
          <div>
            <img
              src={blackInvoiceFooter}
              alt="Invoice Icon"
              onClick={() => {
                navigate("/invoices");
              }}
            />
            <p>Invoice</p>
          </div>
        )}

      <div>
        {isAuthenticated ? (
          <img src={userLogout} alt="Logout Icon" onClick={handleLogout} />
        ) : (
          <img src={userLogin} alt="Login Icon" onClick={handleLogin} />
        )}
        <p>{isAuthenticated ? "Logout" : "Login"}</p>
      </div>
    </div>
  );
}

export default MobileFooter;
