import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationProvider";


const Login = () => {
  const { triggerNotification } = useNotification();
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, naviagte, backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // User redirect Home Page

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let response;
      if (currentState === "Sign Up") {
        response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
      }

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        const userId =
          response.data.userId ||
          (response.data.user && response.data.user.userId);
        if (userId) {
          localStorage.setItem("userId", userId);
        }
        triggerNotification(
        currentState === "Login"
          ? "Login successful!"
          : "Account created successfully!",
        "success"
      );
      } else {
        // toast.error(response.data.message);
         triggerNotification(response.data.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
      triggerNotification(error.response?.data?.message || error.message, "error");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/"); // Correct function name
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-24 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forget your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer text-pink-600"
          >
            Create account?
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer text-pink-600"
          >
            Login Here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
