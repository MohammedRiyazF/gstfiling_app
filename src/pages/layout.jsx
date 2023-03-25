import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="bg-gray-300 h-[100vh]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;