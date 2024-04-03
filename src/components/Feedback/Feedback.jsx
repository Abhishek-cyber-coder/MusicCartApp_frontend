import React, { useEffect, useState } from "react";
import styles from "./Feedback.module.css";
import feedbackIcon from "../../assets/icon/feedbackIcon.svg";
import downArrowIcon from "../../assets/icon/downArrowIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoading,
  sendFeedbackAsync,
} from "../../Features/feedback/feedbackSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingToast from "../Toast/LoadingToast";
function Feedback() {
  const [loadingToastId, setLoadingToastId] = useState(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSelectionOpen, setIsSelectionOpen] = useState(false);
  const [typeOfFeedback, setTypeOfFeedback] = useState("Choose the type");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({
    typeOfFeedback: "",
    message: "",
  });

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

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

  let valid = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (typeOfFeedback === "Choose the type") {
      valid = false;
      setErrors((prevError) => ({
        ...prevError,
        typeOfFeedback: "*Required Field",
      }));
    } else {
      setErrors((prevError) => ({ ...prevError, typeOfFeedback: "" }));
    }

    if (!(message.trim().length > 0)) {
      valid = false;
      setErrors((prevError) => ({ ...prevError, message: "*Required Field" }));
    } else {
      setErrors((prevError) => ({ ...prevError, message: "" }));
    }

    if (valid) {
      setIsFeedbackOpen(false);
      setIsSelectionOpen(false);
      setErrors({
        typeOfFeedback: "",
        message: "",
      });
      setTypeOfFeedback("Choose the type");
      setMessage("");
      dispatch(sendFeedbackAsync({ typeOfFeedback, message }));
    }
  };
  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          setIsFeedbackOpen(!isFeedbackOpen);
          setIsSelectionOpen(false);
        }}
        className={styles.feedbackCover}
      >
        <img src={feedbackIcon} alt="Feedback" />
      </div>

      {isFeedbackOpen && (
        <div className={styles.feedbackBox}>
          <div className={styles.formFieldContainer}>
            <label htmlFor="chooseType">Type of feedback</label>
            <div
              className={styles.selectContainer}
              onClick={() => setIsSelectionOpen(!isSelectionOpen)}
              style={
                errors?.typeOfFeedback !== ""
                  ? { borderColor: "#ff0000" }
                  : { borderColor: "#919191" }
              }
            >
              <p id="chooseType">{typeOfFeedback}</p>
              <img src={downArrowIcon} alt="Down Arrow" />
              {isSelectionOpen && (
                <div className={styles.optionsBox}>
                  <p onClick={() => setTypeOfFeedback("Bugs")}>Bugs</p>
                  <p onClick={() => setTypeOfFeedback("Feedback")}>Feedback</p>
                  <p onClick={() => setTypeOfFeedback("Query")}>Query</p>
                </div>
              )}
            </div>
            {errors?.typeOfFeedback && (
              <p className={styles.error}>{errors?.typeOfFeedback}</p>
            )}
          </div>
          <div className={styles.formFieldContainer}>
            <label htmlFor="inputFeedback">Feedback</label>
            <textarea
              style={
                errors?.message !== ""
                  ? { borderColor: "#ff0000" }
                  : { borderColor: "#919191" }
              }
              id="inputFeedback"
              value={message}
              placeholder="Type your feedback"
              name="message"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            {errors?.message && (
              <p className={styles.error}>{errors?.message}</p>
            )}
          </div>

          <button onClick={handleSubmit} className={styles.submitBtn}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default Feedback;
