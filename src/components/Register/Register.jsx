import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import Logo from "../Logo/Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingToast from "../Toast/LoadingToast";
import {
  selectIsLoading,
  selectIsAuthenticated,
  registerUserAsync,
} from "../../Features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import MobileHeader from "../MobileHeader/MobileHeader";
function Register() {
  const isLoading = useSelector(selectIsLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [loadingToastId, setLoadingToastId] = useState(null);
  const [mobileView, setMobileView] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    mobileNum: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: "",
    mobileNum: "",
    email: "",
    password: "",
  });

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

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [navigate, isAuthenticated]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  let valid = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, mobileNum, email, password } = userData;
    let allErrors = {};

    if (!name.trim()) {
      allErrors.name = "*Name is required!";
      valid = false;
    }

    if (!mobileNum.trim()) {
      allErrors.mobileNum = "*Mobile number is required";
      valid = false;
    } else if (!/^[0-9]{10}$/.test(mobileNum)) {
      allErrors.mobileNum =
        "*Mobile number is invalid (Don't use +91/0 in beginning)";
      valid = false;
    }

    if (!email.trim()) {
      allErrors.email = "*Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      allErrors.email = "*Email is invalid!";
      valid = false;
    }

    if (!password.trim()) {
      allErrors.password = "*Password is required";
      valid = false;
    } else if (password.length < 8) {
      allErrors.password = "*Password must be 8 characters long";
      valid = false;
    }

    if (valid) {
      dispatch(registerUserAsync(userData));
    } else {
      setError(allErrors);
      return;
    }
  };

  return (
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
            Create Account
            {mobileView && <small> Don’t have an account?</small>}
          </p>
          <label htmlFor="nameField">Your name</label>
          <input
            style={
              error?.name
                ? { borderColor: "#FF0000" }
                : { borderColor: "#b6b6b6" }
            }
            type="text"
            name="name"
            id="nameField"
            value={userData?.name}
            onChange={handleChange}
          />
          {error?.name && <span className={styles.error}>{error?.name}</span>}
          <label htmlFor="mobileField">Mobile number</label>
          <input
            style={
              error?.mobileNum
                ? { borderColor: "#FF0000" }
                : { borderColor: "#b6b6b6" }
            }
            type="text"
            name="mobileNum"
            id="mobileField"
            value={userData?.mobileNum}
            onChange={handleChange}
          />
          {error?.mobileNum && (
            <span className={styles.error}>{error?.mobileNum}</span>
          )}
          <label htmlFor="emailField">Email Id</label>
          <input
            style={
              error?.email
                ? { borderColor: "#FF0000" }
                : { borderColor: "#b6b6b6" }
            }
            type="email"
            name="email"
            id="emailField"
            value={userData?.email}
            onChange={handleChange}
          />
          {error?.email && <span className={styles.error}>{error?.email}</span>}
          <label htmlFor="PasswordField">Password</label>
          <input
            style={
              error?.password
                ? { borderColor: "#FF0000" }
                : { borderColor: "#b6b6b6" }
            }
            type="password"
            name="password"
            id="passwordField"
            value={userData?.password}
            onChange={handleChange}
          />
          {error?.password && (
            <span className={styles.error}>{error?.password}</span>
          )}
          <p className={styles.para}>
            By enrolling your mobile phone number, you consent to receive
            automated security notifications via text message from Musicart.
            Message and data rates may apply.
          </p>
          <button className={styles.submitBtn} onClick={handleSubmit}>
            Continue
          </button>
          <p className={styles.lastPara}>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </div>
      {/* <div className={styles.loginBox}>
        {mobileView && <heading>Welcome</heading>}
        <p className={styles.heading}>Create Account</p>
        <label htmlFor="nameField">Your name</label>
        <input
          style={
            error?.name
              ? { borderColor: "#FF0000" }
              : { borderColor: "#b6b6b6" }
          }
          type="text"
          name="name"
          id="nameField"
          value={userData?.name}
          onChange={handleChange}
        />
        {error?.name && <span className={styles.error}>{error?.name}</span>}
        <label htmlFor="mobileField">Mobile number</label>
        <input
          style={
            error?.mobileNum
              ? { borderColor: "#FF0000" }
              : { borderColor: "#b6b6b6" }
          }
          type="text"
          name="mobileNum"
          id="mobileField"
          value={userData?.mobileNum}
          onChange={handleChange}
        />
        {error?.mobileNum && (
          <span className={styles.error}>{error?.mobileNum}</span>
        )}
        <label htmlFor="emailField">Email Id</label>
        <input
          style={
            error?.email
              ? { borderColor: "#FF0000" }
              : { borderColor: "#b6b6b6" }
          }
          type="email"
          name="email"
          id="emailField"
          value={userData?.email}
          onChange={handleChange}
        />
        {error?.email && <span className={styles.error}>{error?.email}</span>}
        <label htmlFor="PasswordField">Password</label>
        <input
          style={
            error?.password
              ? { borderColor: "#FF0000" }
              : { borderColor: "#b6b6b6" }
          }
          type="password"
          name="password"
          id="passwordField"
          value={userData?.password}
          onChange={handleChange}
        />
        {error?.password && (
          <span className={styles.error}>{error?.password}</span>
        )}
        <p className={styles.para}>
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </p>
        <button className={styles.submitBtn} onClick={handleSubmit}>
          Continue
        </button>
        <p className={styles.lastPara}>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div> */}
      <div className={styles.signIn}>
        <p>Already have an account?</p>
        <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
}

export default Register;
