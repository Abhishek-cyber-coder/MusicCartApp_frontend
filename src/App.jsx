import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./pages/ProductPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage/OrderSuccessPage";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage/InvoiceDetailPage";
import { getLocalStorageData } from "./utils/helper";

function App() {
  const ProtectingRoute = () => {
    const isAuthenticated = getLocalStorageData("isAuthenticated");
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route element={<ProtectingRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order" element={<OrderSuccessPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
            <Route path="/invoice/:invoiceId" element={<InvoiceDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        hideProgressBar={true}
        autoClose={2000}
        position="top-right"
        pauseOnHover
      />
    </>
  );
}

export default App;
