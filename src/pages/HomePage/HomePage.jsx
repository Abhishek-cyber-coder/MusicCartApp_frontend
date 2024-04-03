import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Product from "../../components/Product/Product";
import Feedback from "../../components/Feedback/Feedback";
import MobileNavbar from "../../components/Navbar/MobileNavbar";
import { getLocalStorageData } from "../../utils/helper";
import MobileFooter from "../../components/Footer/MobileFooter";

function HomePage() {
  const isAuthenticated = getLocalStorageData("isAuthenticated");
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
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {mobileView ? <MobileNavbar /> : <Navbar />}

        <div style={{ flexGrow: "1", position: "relative", zIndex: "0" }}>
          <Product mobileView={mobileView} />
        </div>

        {mobileView ? <MobileFooter /> : <Footer />}
      </div>
      {!mobileView && isAuthenticated && <Feedback />}
    </>
  );
}

export default HomePage;
