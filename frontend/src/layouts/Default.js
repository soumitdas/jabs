import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Default = ({ children }) => {
  return (
    <>
    <div className="wrapper">
      <Navbar />
      {children}
    </div>
      <Footer />
    </>
  );
};

export default Default;
