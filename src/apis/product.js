import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `${import.meta.env.REACT_APP_BACKEND_URL}/product`;

export const getAllProductsApi = async ({
  headphoneType,
  company,
  color,
  priceRange,
  sortBy,
  search,
}) => {
  try {
    const requestUrl = `${backendUrl}/all?headphoneType=${headphoneType}&company=${company}&color=${color}&priceRange=${priceRange}&sortBy=${sortBy}&search=${search}`;

    const response = await axios.get(requestUrl);

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

export const getProductByIdApi = async (productId) => {
  try {
    const requestUrl = `${backendUrl}/details/${productId}`;

    const response = await axios.get(requestUrl);
    return response?.data;
  } catch (error) {
    if (error?.response) {
      toast.error(error.response?.data?.message);
    } else {
      toast.error(error?.message);
    }
  }
};
