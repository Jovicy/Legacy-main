import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { FaHome, FaWallet, FaMoneyBillWave, FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const MIN_WITHDRAWAL_AMOUNT = 100; // Minimum balance required for withdrawal

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

      try {
        if (storedUser && storedUser._id && storedUser.role === "user") {
          const response = await api.get(`/user/${storedUser._id}`);
          setUser(response.data.user);
          setBalance(response.data.user.totalTransactionAmount);
          setTransactions(response.data.user.transactions || []);

          if (response.data.user.firstLogin) {
            Swal.fire({
              title: "Congratulations!",
              text: `You've been awarded a welcome bonus of $50!`,
              icon: "success",
              confirmButtonText: "OK",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user", error);
        localStorage.clear();
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleWithdrawal = async () => {
    if (balance < MIN_WITHDRAWAL_AMOUNT) {
      Swal.fire({
        title: "Insufficient Balance",
        text: `You need at least $${MIN_WITHDRAWAL_AMOUNT} to withdraw.`,
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await api.post(`/transaction/add`, {
        userId: user._id,
        amount: withdrawAmount,
        type: "debit",
        description: "withdrawal",
      });

      if (response.data.status === "success") {
        Swal.fire({
          title: "Withdrawal Request",
          html: `Your withdrawal request has been received. Processing may take 24-48 hours.
             For faster processing, please reach out to the
             <a href="https://t.me/legacyfinancialstrategies" target="_blank" style="color: #3085d6; text-decoration: none;">management team</a>
             or an <a href="https://t.me/legacyfinancialstrategies" target="_blank" style="color: #3085d6; text-decoration: none;">administrator</a>.`,
          icon: "success",
          confirmButtonText: "OK",
        });

        setTransactions((prevTransactions) => [
          response.data.data, // Add the new transaction at the top
          ...prevTransactions,
        ]);

        setBalance(user.totalTransactionAmount - withdrawAmount);
        setWithdrawAmount(0);
      } else {
        toast.error("Failed to withdraw transaction.");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const generateMiningProfit = () => {
    const profitAmount = parseFloat((Math.random() * 0.001).toFixed(6)); // Random profit
    const currentTime = new Date().toLocaleTimeString();

    // Ensure transactions array is not empty
    if (transactions.length === 0) return;

    // Get the last transaction
    const latestTransaction = transactions[transactions.length - 1];

    // Ensure `miningProfits` exists
    if (!latestTransaction.miningProfits) {
      latestTransaction.miningProfits = [];
    }

    // Add new mining profit
    latestTransaction.miningProfits.push({
      time: currentTime,
      amount: profitAmount,
    });
  };

  // Run mining profit update every 2 hours (change 5000 to 2 * 60 * 60 * 1000 in production)
  useEffect(() => {
    const interval = setInterval(generateMiningProfit, 6 * 60 * 60 * 1000); // Runs every 2 hours
    return () => clearInterval(interval);
  }, [transactions]);

  return (
    <>
      <Navigation handleLogout={handleLogout} />
      <ToastContainer />
      {/* Dashboard Header */}
      <motion.section initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="h-[50vh] bg-header-bg bg-cover bg-center flex items-center">
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-3xl md:text-6xl font-bold">Welcome back, {user?.name || "User"}!</h1>
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
              className="md:w-30s w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Total Balance</h3>
                <p>${balance}</p>
              </div>
              <div className="bg-black h-full p-4 rounded-md">
                <FaWallet />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-30s w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Withdraw Funds</h3>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold">${withdrawAmount}</p>
                  <span className="text-xs text-gray-400">(Selected)</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button key={percent} className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700" onClick={() => setWithdrawAmount(Math.floor((balance * percent) / 100))}>
                      {percent}%
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-500 flex items-start gap-1 mt-2">
                  <FaInfoCircle className="h-4 w-4" /> Minimum withdrawal is ${MIN_WITHDRAWAL_AMOUNT}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWithdrawal}
                  disabled={withdrawAmount < MIN_WITHDRAWAL_AMOUNT}
                  className={`px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2 transition ${
                    balance < MIN_WITHDRAWAL_AMOUNT ? "bg-gray-600 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
                  }`}>
                  <FaMoneyBillWave /> Withdraw
                </button>
              </div>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="w-full overflow-x-auto">
            <table className="w-full rounded-lg shadow-button-light-color shadow-md overflow-x-auto">
              <thead className="bg-button-light-color">
                <tr className="bg-gray-100 text-left">
                  <th className="px-6 py-4 rounded-tl-lg">Date</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Transaction Type</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 rounded-tr-lg"> Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  <>
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 border border-button-light-color text-sm">{new Date(transaction.createdAt).toLocaleDateString("en-US")}</td>
                        <td className="px-6 py-4 border border-button-light-color text-sm text-button-light-color">{transaction._id}</td>
                        <td className="px-6 py-4 border border-button-light-color text-sm ">{transaction.type}</td>
                        <td className="px-6 py-4 border border-button-light-color text-sm">{transaction.description}</td>
                        <td className="px-6 py-4 border border-button-light-color text-sm">${Math.abs(transaction.amount)}</td>
                      </tr>
                    ))}

                    {/* ✅ Only one Mining Profit row at the end */}
                    <tr className="bg-gray-50">
                      <td colSpan="5" className="px-6 py-4 text-sm text-center border border-button-light-color">
                        <strong>Bitcoin Mining Profit (Every 6 Hours):</strong>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                          {transactions.some((t) => t.miningProfits && t.miningProfits.length > 0) ? (
                            transactions
                              .flatMap((t) => t.miningProfits || [])
                              .map((profit, i) => (
                                <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs">
                                  {profit.time}: ${profit.amount} BTC
                                </span>
                              ))
                          ) : (
                            <span className="text-gray-500">No mining profit recorded for today yet.</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  </>
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

export default UserDashboard;
