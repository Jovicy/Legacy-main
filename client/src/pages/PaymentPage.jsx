import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Footer from "../components/Footer";

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BTC");
  const [showQR, setShowQR] = useState(false);

  const walletAddresses = {
    BTC: "bc1q9tcu5yth5dt5d9k8gkl7pypnkevsu98fvsvyf2",
    ETH: "0x8481e735686a8C59521D949AfF9b99DE48035865",
    BNB: "0x8481e735686a8C59521D949AfF9b99DE48035865",
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (amount > 0) {
      setShowQR(true);
    } else {
      alert("Please enter a valid amount.");
    }
  };

  return (
    <>
      <Navigation />
      
      {/* Page Header */}
      <motion.section
        className="h-[50vh] bg-blog-bg bg-cover bg-center flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-5xl font-bold">Payment Body</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Payment
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-black py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="custom-container">
          <motion.h2
            className="text-4xl font-bold text-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Payment Page
          </motion.h2>

          <motion.div
            className="max-w-md mx-auto bg-subBlack p-8 rounded-md shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.form
              onSubmit={handlePayment}
              className="flex flex-col gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <label className="font-bold text-lg">Select Cryptocurrency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 bg-subBlack"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BNB">Binance Coin (BNB)</option>
              </select>

              <label className="font-bold text-lg">Enter Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 bg-subBlack"
                placeholder="Enter amount"
              />

              <motion.button
                type="submit"
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Generate QR Code
              </motion.button>
            </motion.form>

            {showQR && (
              <motion.div
                className="mt-8 text-center flex flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-bold text-lg mb-2">
                  Scan QR Code or Use Wallet Address for {currency}
                </p>
                <QRCodeCanvas
                  value={`${currency.toLowerCase()}:${walletAddresses[currency]}?amount=${amount}`}
                  size={200}
                />
                <p className="mt-4 font-mono text-sm bg-gray-100 p-2 rounded-md">
                  {walletAddresses[currency]}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Ensure you send exactly {amount} {currency}.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default PaymentPage;
