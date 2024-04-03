import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Invoices from "../../components/Invoices/Invoices";
import Footer from "../../components/Footer/Footer";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import MobileFooter from "../../components/Footer/MobileFooter";

function InvoicePage() {
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
      {mobileView ? <MobileHeader /> : <Navbar />}
      <div style={{ flexGrow: "1", position: "relative", zIndex: "0" }}>
        <Invoices mobileView={mobileView} />
      </div>
      {mobileView ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default InvoicePage;
