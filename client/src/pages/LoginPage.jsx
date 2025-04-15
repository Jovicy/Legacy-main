import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(`/login`, formData);

      const { token, refreshToken, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login Successful!");

      if (response.data.user.firstLogin && response.data.user.role == "user") {
        await api.post(`/transaction/add`, {
          userId: response.data.user._id,
          amount: 50,
          type: "credit",
          description: "welcome Bonus",
        });
      }

      setTimeout(() => {
        if (user.role === "admin" && response.status === 200) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      const errorMessage = err.response?.data?.message || "An error occurred. Please try again!";
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  return (
    <section className="py-20 h-screen flex justify-center items-center bg-works-bg bg-cover">
      <ToastContainer />
      <div className="custom-container flex flex-col justify-center items-center">
        <div className="md:w-[40%] w-full">
          {/* Header */}
          <div className="w-full bg-works-gradient rounded-t-lg p-10 bg-cover bg-center text-center">
            <h2 className="text-3xl font-bold text-center text-white">Welcome back</h2>
            <p>The world of investing is already waiting.</p>
          </div>

          {/* Login Form */}
          <div className="w-full bg-subBlack rounded-b-lg p-10 shadow-button-light-color shadow-lg">
            <form className="flex flex-col gap-3" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter Email Address"
                  className="w-full px-6 py-3 text-sm text-button-light-color border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                />
              </div>

              {/* Password Field with Toggle */}
              <div className="flex flex-col gap-2 relative">
                <div className="flex items-center justify-between text-sm font-normal">
                  <label>Password</label>
                  <Link to="/forget-password" className="text-button-light-color font-semibold">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter Your Password"
                    className="w-full px-6 py-3 text-sm text-button-light-color border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-3 text-gray-400 hover:text-white">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button type="submit" disabled={loading} className="w-full px-4 py-3 mt-4 text-white bg-button-light-color rounded-lg">
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-sm text-center text-gray-400 mt-5">
              Don't have an account yet?{" "}
              <Link to="/register" className="hover:underline text-button-light-color font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
