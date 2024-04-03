import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import { useLocation } from "react-router-dom";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import MobileFooter from "../../components/Footer/MobileFooter";

function ProductPage() {
  const location = useLocation();
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
  const { productName } = location.state;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {mobileView ? <MobileNavbar /> : <Navbar productName={productName} />}

      <div style={{ flexGrow: "1", position: "relative", zIndex: "0" }}>
        <ProductDetails mobileView={mobileView} />
      </div>
      {mobileView ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default ProductPage;
