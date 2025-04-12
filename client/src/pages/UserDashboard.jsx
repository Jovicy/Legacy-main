import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import {
  FaHome,
  FaWallet,
  FaMoneyBillWave,
  FaInfoCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  const MIN_WITHDRAWAL_AMOUNT = 100; // Minimum balance required for withdrawal

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      storedUser = {
        name: "User",
        balance: 0,
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

      const newBalance = 100;
      const transactionHistory = [
        {
          date: new Date().toLocaleDateString(),
          transactionId: "WELCOME-BONUS",
          amount: 100,
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
      html: `Your withdrawal request has been received and is now processing.<br/><br/>
            <small>For faster processing, please reach out to the 
            <a href="https://t.me/legacyfinancialstrategies" target="_blank" style="color: #3085d6; text-decoration: none;">management team</a>.</small>`,
      icon: "success",
      confirmButtonText: "OK",
    });

    const processingTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      transactionId: "WITHDRAW-REQ",
      amount: -MIN_WITHDRAWAL_AMOUNT,
      details: "Withdrawal Request - Processing",
      postBalance: balance,
      status: "processing", // new field
    };

    const updatedTransactions = [...transactions, processingTransaction];
    const updatedUser = {
      ...user,
      transactions: updatedTransactions,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setTransactions(updatedTransactions);

    // Simulate backend confirmation after 5 seconds
    setTimeout(() => {
      const confirmedTransactions = updatedTransactions.map((tx) =>
        tx.id === processingTransaction.id
          ? {
              ...tx,
              details: "Withdrawal Completed",
              postBalance: balance - MIN_WITHDRAWAL_AMOUNT,
              status: "completed",
            }
          : tx
      );

      const newBalance = balance - MIN_WITHDRAWAL_AMOUNT;

      const confirmedUser = {
        ...user,
        balance: newBalance,
        transactions: confirmedTransactions,
      };

      localStorage.setItem("user", JSON.stringify(confirmedUser));
      setUser(confirmedUser);
      setBalance(newBalance);
      setWithdrawAmount(0);
      setTransactions(confirmedTransactions);
    }, 5000); // Simulated 5 sec delay
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

    const updatedTransactions = [...transactions];
    const newBalance = balance + profitAmount;

    // Update user data in local storage
    const updatedUser = {
      ...user,
      balance: newBalance,
      transactions: updatedTransactions,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setBalance(newBalance);
    setTransactions(updatedTransactions);
  };

  // Run mining profit update every 2 hours (change 5000 to 2 * 60 * 60 * 1000 in production)
  useEffect(() => {
    const interval = setInterval(generateMiningProfit, 6 * 60 * 60 * 1000); // Runs every 2 hours
    return () => clearInterval(interval);
  }, [transactions]);

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
          <h1 className="text-3xl md:text-6xl font-bold">
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
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="md:w-2/5 w-full bg-button-light-color p-5 rounded-lg flex justify-between items-center"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold">Withdraw Funds</h3>
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold">${withdrawAmount}</p>
                  <span className="text-xs text-gray-400">(Selected)</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {[25, 50, 75, 100].map((percent) => (
                    <button
                      key={percent}
                      className="text-xs bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                      onClick={() =>
                        setWithdrawAmount(Math.floor((balance * percent) / 100))
                      }
                    >
                      {percent}%
                    </button>
                  ))}
                </div>

                <p className="text-xs text-gray-500 flex items-start gap-1 mt-2">
                  <FaInfoCircle className="h-4 w-4" /> Minimum withdrawal is $
                  {MIN_WITHDRAWAL_AMOUNT}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWithdrawal}
                  disabled={withdrawAmount < MIN_WITHDRAWAL_AMOUNT}                  
                  className={`px-4 py-2 rounded-lg font-semibold text-white flex items-center gap-2 transition ${
                    balance < MIN_WITHDRAWAL_AMOUNT
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-700"
                  }`}
                >
                  <FaMoneyBillWave /> Withdraw
                </button>
              </div>
            </motion.div>
          </div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full overflow-x-auto"
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
                  <>
                    {transactions.map((transaction, index) => (
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
                          {transaction.status === "processing" && (
                            <span className="ml-2 px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-800">
                              Processing
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 border border-button-light-color text-sm">
                          ${transaction.postBalance}
                        </td>
                      </tr>
                    ))}

                    {/* ✅ Only one Mining Profit row at the end */}
                    <tr className="bg-gray-50">
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-sm text-center border border-button-light-color"
                      >
                        <strong>Bitcoin Mining Profit (Every 6 Hours):</strong>
                        <div className="mt-2 flex flex-wrap gap-2 justify-center">
                          {transactions.some(
                            (t) => t.miningProfits && t.miningProfits.length > 0
                          ) ? (
                            transactions
                              .flatMap((t) => t.miningProfits || [])
                              .map((profit, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs"
                                >
                                  {profit.time}: ${profit.amount} BTC
                                </span>
                              ))
                          ) : (
                            <span className="text-gray-500">
                              No mining profit recorded for today yet.
                            </span>
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
