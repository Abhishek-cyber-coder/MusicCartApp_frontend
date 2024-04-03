import React, { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import phoneIcon from "../../assets/icon/phoneIcon.svg";
import { getLocalStorageData, getUserInitials } from "../../utils/helper";
import Logo from "../Logo/Logo";
import cartIcon from "../../assets/icon/cartIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { setNavbarHeight } from "../../Features/ui/uiSlice";
import { logout } from "../../Features/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCartDetailsAsync,
  selectCartDetail,
  selectIsAddCart,
} from "../../Features/cart/cartSlice";

function Navbar({ productName }) {
  const navbarRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isUserIconClicked, setIsUserIconClicked] = useState(false);
  const isAuthenticated = getLocalStorageData("isAuthenticated");
  const username = getLocalStorageData("name");
  const userInitials = getUserInitials(username);
  const cart = useSelector(selectCartDetail);
  const isAddToCart = useSelector(selectIsAddCart);

  useEffect(() => {
    const navbarHeight = navbarRef.current.offsetHeight;
    dispatch(setNavbarHeight(navbarHeight));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCartDetailsAsync());
  }, [dispatch, isAddToCart]);

  const logoutHandler = () => {
    navigate("/");
    window.location.reload();
    dispatch(logout());
  };

  return (
    <nav className={styles.main} ref={navbarRef}>
      <div className={styles.navbar}>
        <div className={styles.firstSection}>
          <img src={phoneIcon} alt="Phone Icon" />
          <p>912121131313</p>
        </div>
        <div className={styles.midSection}>
          <p>Get 50% off on selected items</p>
          <p>|</p>
          <p>Shop Now</p>
        </div>
        {!isAuthenticated && (
          <div
            style={{ justifyContent: "space-around" }}
            className={styles.lastSection}
          >
            <p className={styles.btn} onClick={() => navigate("/login")}>
              Login
            </p>
            <p>|</p>
            <p className={styles.btn} onClick={() => navigate("/register")}>
              Signup
            </p>
          </div>
        )}
        {isAuthenticated && location.pathname !== "/" ? (
          <div className={styles.lastSection}>
            <p className={styles.btn} onClick={logoutHandler}>
              Logout
            </p>
          </div>
        ) : null}
      </div>
      <div className={styles.navigationSection}>
        <div
          style={location.pathname !== "/" ? { gap: "0" } : null}
          className={styles.logoSection}
        >
          <Logo _heightAndWidth="45px" _fontSize="1.8rem" />
          <div
            style={location.pathname !== "/" ? { marginLeft: "1rem" } : null}
            className={styles.btn}
            onClick={() => navigate("/")}
          >
            Home
          </div>
          {isAuthenticated && (
            <>
              {location.pathname === "/" && (
                <div
                  onClick={() => navigate("invoices")}
                  className={styles.btn}
                >
                  Invoice
                </div>
              )}
              {location.pathname.startsWith("/product") && productName && (
                <div>/{productName}</div>
              )}
              {location.pathname.startsWith("/cart") && <div>/ View Cart</div>}
              {location.pathname.startsWith("/checkout") && (
                <div>/ Checkout</div>
              )}
              {location.pathname.startsWith("/invoices") && (
                <div>/ Invoices</div>
              )}
              {location.pathname.startsWith("/invoice/") && (
                <div>/ Invoices</div>
              )}
            </>
          )}
        </div>
        {isAuthenticated && (
          <>
            <div className={styles.viewCartSection}>
              {!location.pathname.startsWith("/checkout") &&
                !location.pathname.startsWith("/order") &&
                !location.pathname.startsWith("/invoice/") && (
                  <div
                    onClick={() => navigate("/cart")}
                    className={`${styles.viewCartBtn} ${styles.btn}`}
                  >
                    <div>
                      <img src={cartIcon} alt="Cart Icon" />
                      <p>View Cart</p>
                    </div>
                    {!location.pathname.startsWith("/cart") &&
                      !location.pathname.startsWith("/invoices") && (
                        <p className={styles.cartCount}>{cart?.totalItems}</p>
                      )}
                  </div>
                )}

              {location.pathname === "/" && (
                <div
                  className={`${styles.profileIconBtn} ${styles.btn}`}
                  onClick={() => setIsUserIconClicked((prev) => !prev)}
                >
                  <p>{userInitials}</p>
                </div>
              )}
              {isUserIconClicked && (
                <div className={styles.profileIconBox}>
                  <p>{username}</p>
                  <p onClick={logoutHandler}>Logout</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
