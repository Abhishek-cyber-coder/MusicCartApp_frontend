import axios from "axios";
import { toast } from "react-toastify";
import { getLocalStorageData } from "../utils/helper";
const backendUrl = `${import.meta.env.REACT_APP_BACKEND_URL}/cart`;

const token = getLocalStorageData("token");

export const addToCartApi = async ({ productId, quantity }) => {
  try {
    const requestUrl = `${backendUrl}/addToCart`;
    const reqPayload = { productId, quantity };

    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.post(requestUrl, reqPayload);
    toast.success(response?.data?.message);
    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const getCartDetailsApi = async () => {
  try {
    const requestUrl = `${backendUrl}/cartDetails`;
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.get(requestUrl);

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartApi = async ({ productId, quantity }) => {
  try {
    const requestUrl = `${backendUrl}/updateCart`;
    const reqPayload = { productId, quantity };
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.put(requestUrl, reqPayload);

    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};

export const deleteCartItemsApi = async () => {
  try {
    const requestUrl = `${backendUrl}/deleteCart/items`;
    axios.defaults.headers.common["Authorization"] = token;

    const response = await axios.put(requestUrl);

    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
