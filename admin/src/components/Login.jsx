import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const AdminLogin = ({ setToken }) => {
  const { triggerNotification } = useNotification();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        triggerNotification("Logged in successfully!", "success");
        navigate("/dashboard");
      } else {
        triggerNotification(response.data.message || "Login failed", "error");
      }
    } catch (error) {
      triggerNotification(
        error.response?.data?.message || error.message || "Login error",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row overflow-hidden">
      {/* Image Section */}
      <div className="w-full lg:w-1/2 h-52 lg:h-auto relative">
        <img
          src="/admin.png"
          alt="Admin"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center text-white px-4  text-center">
          <h1 className="text-3xl md:text-3xl font-bold mt-5 mb-2">Welcome Admin</h1>
          <p className="text-xs md:text-sm max-w-md">
            Manage your shop and platform securely with EzyKart Admin Panel.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-6 bg-white">
        <div className="w-full max-w-md space-y-5">
          <h2 className="text-2xl font-extrabold text-pink-600 text-center">
            Admin Login
          </h2>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
              />
              <div
                className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-md text-white font-semibold transition ${
                loading
                  ? "bg-pink-300 cursor-not-allowed"
                  : "bg-pink-600 hover:bg-pink-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EzyKart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
