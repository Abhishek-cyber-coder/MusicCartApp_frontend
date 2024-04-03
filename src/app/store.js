import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice";
import uiReducer from "../Features/ui/uiSlice";
import feedbackReducer from "../Features/feedback/feedbackSlice";
import productReducer from "../Features/product/productSlice";
import cartReducer from "../Features/cart/cartSlice";
import invoiceReducer from "../Features/invoice/invoiceSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    feedback: feedbackReducer,
    product: productReducer,
    cart: cartReducer,
    invoice: invoiceReducer,
  },
});
