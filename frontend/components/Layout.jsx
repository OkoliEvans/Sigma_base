import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="pt-24 bg-[#F1F5F6] pb-24">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
