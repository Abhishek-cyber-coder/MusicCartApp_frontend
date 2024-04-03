import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Checkout from "../../components/Checkout/Checkout";
import { useParams } from "react-router-dom";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import MobileFooter from "../../components/Footer/MobileFooter";

function InvoiceDetailPage() {
  const { invoiceId } = useParams();
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
        <Checkout mobileView={mobileView} invoiceId={invoiceId} />
      </div>
      {mobileView ? <MobileFooter /> : <Footer />}
    </div>
  );
}

export default InvoiceDetailPage;
