import React, { useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaHome, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; // Importing UUID for unique transaction IDs
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = () => {
    setLoading(true);

    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = storedUsers.findIndex(
      (u) => u.email.trim() === email.trim()
    );

    console.log(userIndex);

    if (userIndex === -1) {
      setLoading(false);
      Swal.fire("Error", "User not found!", "error");
      return;
    }

    let user = storedUsers[userIndex];
    let transactionAmount = parseFloat(amount);

    if (isNaN(transactionAmount) || transactionAmount <= 0) {
      setLoading(false);
      Swal.fire("Error", "Invalid transaction amount!", "error");
      return;
    }

    let newTransaction = {
      date: new Date().toLocaleString(),
      transactionId: `TXN-${uuidv4()}`,
      amount: transactionAmount.toFixed(2),
      details: details.trim(),
      postBalance: (user.balance + transactionAmount).toFixed(2),
    };

    user.balance += transactionAmount;
    user.transactions.push(newTransaction);

    storedUsers[userIndex] = user;
    localStorage.setItem("users", JSON.stringify(storedUsers));

    setLoading(false);
    Swal.fire("Success", "Transaction added successfully!", "success");

    setEmail("");
    setAmount("");
    setDetails("");
  };

  return (
    <>
      <Navigation />

      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[50vh] bg-admin-bg bg-cover bg-center flex items-center"
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-3xl md:text-6xl font-bold">
            Welcome back, Admin!
          </h1>
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
          className="md:w-30s w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center mb-8"
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold">Total Users</h3>
            <p>100</p>
          </div>
          <div className="bg-black h-full p-4 rounded-md">
            <FaUsers />
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 bg-subBlack p-6 shadow-md rounded-lg">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            className="border p-2 rounded w-full text-button-light-color"
          />

          <input
            type="number"
            placeholder="Enter transaction amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value.trim())}
            className="border p-2 rounded w-full text-button-light-color"
          />

          <input
            type="text"
            placeholder="Enter transaction details"
            value={details}
            onChange={(e) => setDetails(e.target.value.trim())}
            className="border p-2 rounded w-full text-button-light-color"
          />

          <button
            onClick={handleAddTransaction}
            className={`p-2 rounded text-white bg-button-light-color w-full ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-button-light-color hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Processing..." : "Add Transaction"}
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AdminDashboard;
