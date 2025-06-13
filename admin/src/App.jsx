import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { NotificationProvider } from "./context/NotificationProvider";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  // const token = localStorage.getItem("token");
  {
    /* <Route path="/add" element={<Add token={token} />} /> */
  }

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  // console.log(token);

  return (
    <>
      <NotificationProvider>
        {/* <ToastContainer /> */}
        <Routes>
          {token ? (
            <Route element={<Layout setToken={setToken} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/add" element={<Add />} />
              <Route path="/list" element={<List />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route>
          ) : (
            <>
              <Route path="*" element={<Login setToken={setToken} />} />
            </>
          )}
        </Routes>
      </NotificationProvider>
    </>
  );
};

export default App;
