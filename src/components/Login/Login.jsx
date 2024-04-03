import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Logo from "../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserAsync,
  selectIsLoading,
  selectIsAuthenticated,
} from "../../Features/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingToast from "../Toast/LoadingToast";
import MobileHeader from "../MobileHeader/MobileHeader";
function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  const [loadingToastId, setLoadingToastId] = useState(null);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (isLoading) {
      const id = toast(<LoadingToast />);
      setLoadingToastId(id);
    } else {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
        setLoadingToastId(null);
      }
    }
  }, [isLoading]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const isValidEmailOrMobile = (value) => {
    const emailOrMobileRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    return emailOrMobileRegex.test(value) || mobileRegex.test(value);
  };

  let errorInEmail = false;
  let errorInPass = false;
  let valid = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmailOrMobile(userData?.email)) {
      setErrors((prevErr) => ({
        ...prevErr,
        email: "Email or mobile number is required and must be valid.",
      }));

      setUserData((prevData) => ({ ...prevData, email: "" }));
      errorInEmail = true;
      valid = false;
    } else {
      setErrors((prevErr) => ({ ...prevErr, email: "" }));
    }

    if (userData.password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password is required and must be at least 8 characters long.",
      }));
      setUserData({ ...userData, password: "" });
      errorInPass = true;
      valid = false;
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }

    if (errorInEmail && errorInPass) {
      setUserData({ email: "", password: "" });
    }

    if (valid) {
      dispatch(loginUserAsync(userData));
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        {mobileView ? (
          <MobileHeader />
        ) : (
          <div className={styles.logo}>
            <Logo _heightAndWidth="40px" _fontSize="2rem" />
          </div>
        )}
        <div className={styles.main}>
          {mobileView && <heading>Welcome</heading>}
          <div className={styles.loginBox}>
            <p className={styles.heading}>
              Sign in {mobileView && <small> Already a customer?</small>}
            </p>
            <label htmlFor="emailOrMobile">
              Enter your email or mobile number
            </label>
            <input
              style={
                errors?.email !== ""
                  ? { borderColor: "#FF0000" }
                  : { borderColor: "#b6b6b6" }
              }
              value={userData?.email}
              onChange={handleChange}
              type="text"
              name="email"
              id="emailOrMobile"
            />
            {errors?.email !== "" && (
              <span className={styles.error}>{`*${errors?.email}`}</span>
            )}
            <label htmlFor="passwordField">Password</label>
            <input
              style={
                errors?.password !== ""
                  ? { borderColor: "#FF0000" }
                  : { borderColor: "#b6b6b6" }
              }
              value={userData?.password}
              onChange={handleChange}
              type="password"
              name="password"
              id="passwordField"
            />
            {errors?.password !== "" && (
              <span className={styles.error}>{`*${errors?.password}`}</span>
            )}
            <button className={styles.submitBtn} onClick={handleSubmit}>
              Continue
            </button>
            <p className={styles.lastPara}>
              By continuing, you agree to Musicart privacy notice and conditions
              of use.
            </p>
          </div>
        </div>

        <div className={styles.horizontalLine}>
          <div></div>
          <p>New to Musicart?</p>
          <div></div>
        </div>
        <div
          className={styles.registerBtn}
          onClick={() => navigate("/register")}
        >
          Create your Musicart account
        </div>
      </div>
    </>
  );
}

export default Login;
