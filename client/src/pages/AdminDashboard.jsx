import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaHome, FaWallet, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const MIN_WITHDRAWAL_AMOUNT = 100; // Minimum balance required for withdrawal

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      storedUser = {
        name: "User",
        balance: 50,
        transactions: [],
        hasReceivedBonus: false,
      };
      localStorage.setItem("user", JSON.stringify(storedUser));
    }

    setUser(storedUser);
    setBalance(storedUser.balance);
    setTransactions(storedUser.transactions);

    if (!storedUser.hasReceivedBonus) {
      Swal.fire({
        title: "Congratulations!",
        text: `You've been awarded a welcome bonus of $50!`,
        icon: "success",
        confirmButtonText: "OK",
      });

      const newBalance = 50;
      const transactionHistory = [
        {
          date: new Date().toLocaleDateString(),
          transactionId: "WELCOME-BONUS",
          amount: 50,
          details: "Welcome Bonus",
          postBalance: newBalance,
        },
      ];

      const updatedUser = {
        ...storedUser,
        balance: newBalance,
        transactions: transactionHistory,
        hasReceivedBonus: true,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setBalance(newBalance);
      setTransactions(transactionHistory);
    }
  }, []);

  const handleWithdrawal = () => {
    if (balance < MIN_WITHDRAWAL_AMOUNT) {
      Swal.fire({
        title: "Insufficient Balance",
        text: `You need at least $${MIN_WITHDRAWAL_AMOUNT} to withdraw.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    Swal.fire({
      title: "Withdrawal Request",
      text: "Your withdrawal request has been received. Processing may take 24-48 hours.",
      icon: "success",
      confirmButtonText: "OK",
    });

    const newBalance = balance - MIN_WITHDRAWAL_AMOUNT;
    const newTransaction = {
      date: new Date().toLocaleDateString(),
      transactionId: "WITHDRAW-REQ",
      amount: -MIN_WITHDRAWAL_AMOUNT,
      details: "Withdrawal Request",
      postBalance: newBalance,
    };

    const updatedUser = {
      ...user,
      balance: newBalance,
      transactions: [...transactions, newTransaction],
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setBalance(newBalance);
    setTransactions(updatedUser.transactions);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navigation handleLogout={handleLogout} />

      {/* Dashboard Header */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-[50vh] bg-header-bg bg-cover bg-center flex items-center"
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-6xl font-bold">
            Welcome back, {user?.name || "User"}!
          </h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Dashboard
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Dashboard */}
      <section className="py-20 bg-black">
        <div className="custom-container flex flex-col gap-20">
          {/* Balance and Withdrawal Section */}
          <div className="flex flex-wrap justify-between items-center gap-y-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-30s w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Total Balance</h3>
                <p>${balance}</p>
              </div>
              <div className="bg-black h-full p-4 rounded-md">
                <FaWallet />
              </div>
            </motion.div>

            {/* Withdrawal Option */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-30s w-full bg-gray-900 p-6 rounded-2xl shadow-lg text-white flex flex-col items-center gap-4"
            >
              {/* Wallet Icon and Title */}
              <div className="flex items-center gap-3">
                <FaMoneyBillWave className="text-green-400 text-3xl" />
                <h3 className="text-lg font-semibold">Withdraw Funds</h3>
              </div>

              {/* Withdrawal Amount & Balance Info */}
              <div className="text-center">
                <p className="text-sm text-gray-300">Available Balance:</p>
                <p className="text-2xl font-bold text-green-400">${balance}</p>
              </div>

              {/* Withdrawal Button */}
              <button
                onClick={handleWithdrawal}
                disabled={balance < MIN_WITHDRAWAL_AMOUNT}
                className={`w-full px-5 py-3 rounded-lg font-semibold text-white transition ${
                  balance < MIN_WITHDRAWAL_AMOUNT
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                Withdraw $50
              </button>

              {/* Note About Withdrawal Requirement */}
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <FaInfoCircle className="text-yellow-400" />
                <span>
                  * Minimum balance of ${MIN_WITHDRAWAL_AMOUNT} required to
                  make withdrawal.
                </span>
              </div>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <table className="w-full rounded-lg shadow-button-light-color shadow-md overflow-x-auto">
              <thead className="bg-button-light-color">
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-4 rounded-tl-lg">Date</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 rounded-tr-lg">Post Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 border border-button-light-color text-sm">
                        {transaction.date}
                      </td>
                      <td className="px-6 py-4 border border-button-light-color text-sm text-button-light-color">
                        {transaction.transactionId}
                      </td>
                      <td className="px-6 py-4 border border-button-light-color text-sm">
                        ${transaction.amount}
                      </td>
                      <td className="px-6 py-4 border border-button-light-color text-sm">
                        {transaction.details}
                      </td>
                      <td className="px-6 py-4 border border-button-light-color text-sm">
                        ${transaction.postBalance}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AdminDashboard;
