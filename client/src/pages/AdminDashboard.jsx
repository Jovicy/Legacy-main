import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaHome, FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState(null);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get(`/users`);
      setTotalUsers(response.data.results);
      setUsers(response.data.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    if (storedUser && storedUser._id && storedUser.role === "admin") {
      fetchUsers();
    } else {
      localStorage.clear();
      navigate("/login");
    }
  }, [navigate, fetchUsers]);

  const handleAddTransaction = async () => {
    setLoading(true);

    if (!email) {
      toast.error("Please enter a valid email.");
      setLoading(false);
      return;
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      toast.error("User with email not found.");
      setLoading(false);
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      setLoading(false);
      return;
    }

    try {
      const transactionData = {
        userId: user._id,
        amount: amount,
        type: "credit",
        description: details,
      };

      const response = await api.post("/transaction/add", transactionData);

      if (response.status === 201) {
        toast.success("Transaction added successfully.");
      } else {
        toast.error("Failed to add transaction.");
      }
    } catch (error) {
      toast.error("Error adding transaction. Please try again.");
    } finally {
      setLoading(false);
      setEmail("");
      setAmount("");
      setDetails("");
    }
  };

  return (
    <>
      <Navigation />
      <ToastContainer />
      <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-[50vh] bg-admin-bg bg-cover bg-center flex items-center">
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-3xl md:text-6xl font-bold">Welcome back, Admin!</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Admin
            </p>
          </div>
        </div>
      </motion.section>

      <section className="p-6 bg-black">
        <div>
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-30s w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center mb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Total Users</h3>
            <p>{totalUsers}</p>
          </div>
          <div className="bg-black h-full p-4 rounded-md">
            <FaUsers />
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 bg-subBlack p-6 shadow-md rounded-lg mb-8">
          <h2>Credit Transaction</h2>

          <input type="email" placeholder="Enter user email" value={email} onChange={(e) => setEmail(e.target.value.trim())} className="border p-2 rounded w-full text-button-light-color" />

          <input type="number" placeholder="Enter transaction amount" value={amount} onChange={(e) => setAmount(e.target.value.trim())} className="border p-2 rounded w-full text-button-light-color" />

          <input
            type="text"
            placeholder="Enter transaction details"
            value={details}
            onChange={(e) => setDetails(e.target.value.trim())}
            className="border p-2 rounded w-full text-button-light-color"
          />

          <button
            onClick={handleAddTransaction}
            className={`p-2 rounded text-white bg-button-light-color w-full ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-button-light-color hover:bg-blue-600"}`}
            disabled={loading}>
            {loading ? "Processing..." : "Add Transaction"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminDashboard;
