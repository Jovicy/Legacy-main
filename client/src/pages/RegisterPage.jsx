import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/user-dashboard");
    }
  }, [navigate]);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(`/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data) {
        toast.success(response.data.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred. Please try again!");
    }

    setLoading(false);
  };

  return (
    <section className="py-20 flex justify-center items-center bg-works-bg">
      <ToastContainer />
      <div className="custom-container flex flex-col justify-center items-center">
        <div className="md:w-[40%] w-full">
          {/* Header */}
          <div className="w-full bg-works-gradient rounded-t-lg p-10 bg-cover bg-center text-center">
            <h2 className="text-3xl font-bold text-white">Welcome to LFStrategies</h2>
          </div>

          {/* Registration Form */}
          <div className="w-full bg-subBlack rounded-b-lg p-10 shadow-button-light-color shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-6 py-3 text-sm border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-6 py-3 text-sm border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                />
              </div>

              {/* Password with Toggle */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-normal">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="8+ Characters"
                    className="w-full px-6 py-3 text-sm border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-4 top-3 text-gray-400 hover:text-white">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password with Toggle */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-normal">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm your password"
                    className="w-full px-6 py-3 text-sm border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
                  />
                  <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-4 top-3 text-gray-400 hover:text-white">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Register Button */}
              <button type="submit" disabled={loading} className="w-full px-4 py-3 mt-4 text-white bg-button-light-color rounded-lg">
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-400 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="hover:underline text-button-light-color font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
