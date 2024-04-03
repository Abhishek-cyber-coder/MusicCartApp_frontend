import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLocalStorageData } from "../utils/helper";

const backendUrl = "http://localhost:3000/api/v1/feedback";

export const sendUserFeedbackApi = async ({ typeOfFeedback, message }) => {
  try {
    const requestUrl = backendUrl;

    const reqPayload = {
      typeOfFeedback,
      message,
    };

    axios.defaults.headers.common["Authorization"] =
      getLocalStorageData("token");

    const response = await axios.post(requestUrl, reqPayload);
    toast.success(response?.data?.message);
    console.log(response?.data);

    return response?.data;
  } catch (error) {
    console.log(error);
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
