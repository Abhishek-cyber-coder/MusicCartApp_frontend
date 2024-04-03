import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `http://localhost:3000/api/v1/auth`;
export const registerUserAPI = async ({ name, mobileNum, email, password }) => {
  try {
    const requestUrl = `${backendUrl}/register`;

    const reqPayload = { name, mobileNum, email, password };

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

export const loginUserAPI = async ({ email, password }) => {
  try {
    const requestUrl = `${backendUrl}/login`;

    const reqPayload = { email, password };

    const response = await axios.post(requestUrl, reqPayload);

    toast.success(response?.data?.message);
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
