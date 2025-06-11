// src/components/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = ({ setToken }) => {
  return (
    <div className="flex h-screen bg-gray-50 relative overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar setToken={setToken} />
        <main className="flex-1 overflow-y-auto p-4 ml-0 md:ml-56 mt-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
