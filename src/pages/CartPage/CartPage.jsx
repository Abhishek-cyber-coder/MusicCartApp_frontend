import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import UserCart from "../../components/UserCart/UserCart";
import Footer from "../../components/Footer/Footer";
import MobileFooter from "../../components/Footer/MobileFooter";
import MobileNavbar from "../../components/Navbar/MobileNavbar";

function CartPage() {
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

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {mobileView ? <MobileNavbar /> : <Navbar />}
      <div style={{ flexGrow: "1", position: "relative", zIndex: "0" }}>
        <UserCart mobileView={mobileView} />
      </div>
      {mobileView ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default CartPage;
