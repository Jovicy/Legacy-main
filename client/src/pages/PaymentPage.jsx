import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Footer from "../components/Footer";
import paymentBg from "../assets/payment-image.jpg";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Modal = ({ isOpen, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const fileInput = form.querySelector('input[name="proof"]');
    const file = fileInput?.files?.[0];

    if (file) {
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > 1000) {
        Swal.fire({
          title: "File Too Large",
          text: "Please upload a file less than 1 MB",
          icon: "warning",
        });
        return;
      }
    }

    Swal.fire({
      title: "Submitting...",
      text: "Please wait while we process your form",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Let form submit natively (so file upload works)
    setTimeout(() => {
      Swal.close();
      form.submit();
    }, 1000);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("submitted") === "true") {
      Swal.fire({
        title: "Thank You!",
        html: `Your proof of payment has been submitted successfully. <br /><br />
               For faster processing or further assistance, please do well to reach out to the <a href="https://t.me/legacyfinancialstrategies" target="_blank" style="color: #3085d6; text-decoration: underline;">Management Team</a>.`,
        icon: "success",
      });
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-subBlack p-6 rounded-md shadow-md w-11/12 md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Verify Payment</h2>
        <form
          action="https://formsubmit.co/legacyfinancialstrategy@gmail.com"
          method="POST"
          encType="multipart/form-data"
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="_next"
            value="http://localhost:5173/payment?submitted=true"
          />
          <input
            type="hidden"
            name="_subject"
            value="New Payment Verification Submission"
          />
          <input type="hidden" name="_template" value="box" />

          <div className="flex flex-col mb-2 gap-1">
            <label>Transaction ID:</label>
            <input
              type="text"
              className="border-button-light-color border-2 rounded-lg p-2 w-full bg-black"
              name="transaction_id"
              required
            />
          </div>

          <div className="flex flex-col mb-2 gap-1">
            <label>Amount Sent:</label>
            <input
              type="number"
              className="border-button-light-color border-2 rounded-lg p-2 w-full bg-black"
              name="amount"
              required
            />
          </div>

          <div className="flex flex-col mb-2 gap-1">
            <label>Upload Proof of Payment:</label>
            <input
              type="file"
              accept="image/*"
              className="border-button-light-color border-2 rounded-lg p-2 w-full bg-black"
              name="proof"
              required
            />
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-black text-white py-2 px-4 rounded-md mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-button-light-color text-white py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentPage = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("BTC");
  const [showQR, setShowQR] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const walletAddresses = {
    BTC: "bc1qauymew6lx8hehh6lvy497lktc8hvhw7xq4ds7w",
    ETH: "0x78f673272f80e0db1628f4653De38B2F6C0a6773",
    BNB: "0x78f673272f80e0db1628f4653De38B2F6C0a6773",
    USDT_TRC20: "TGxDYBd6noQXJ1PMNYWeJrjr9HUQcFjP9x",
  };

  const qrImages = {
    BTC: "/bitcoin.JPG",
    ETH: "/ethereum.JPG",
    BNB: "/bnbs.JPG",
    USDT_TRC20: "/tron.JPG",
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
        className="h-[50vh] bg-payment-bg bg-cover bg-center flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-5xl font-bold">Payment Gateway</h1>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
            Payment Gateway
          </motion.h2>

          <div className="flex md:flex-row flex-col-reverse justify-between items-start gap-5">
            <div className="text-white md:w-1/2 w-full">
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <span className="text-green-400 text-xl">💰</span>
                  <p>
                    <strong>Select your cryptocurrency:</strong> Choose the
                    correct coin and network (e.g., Bitcoin - BTC, Ethereum -
                    ERC20, USDT - TRC20).
                  </p>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <span className="text-blue-400 text-xl">📲</span>
                  <p>
                    <strong>Scan the QR Code:</strong> Open your crypto wallet
                    app and use the scanner to capture the QR code.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <span className="text-yellow-400 text-xl">✍️</span>
                  <p>
                    <strong>Enter the exact amount:</strong> Ensure the correct
                    amount is entered to avoid transaction issues.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <span className="text-red-400 text-xl">⚡</span>
                  <p>
                    <strong>Confirm and send:</strong> Double-check all details,
                    approve the transaction, and send the funds.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-4">
                  <span className="text-green-300 text-xl">🔗</span>
                  <p>
                    <strong>Wait for blockchain confirmation:</strong> Payments
                    are confirmed after a few network validations.
                  </p>
                </div>
              </div>
            </div>

            <motion.div
              className="md:w-1/2 w-full bg-subBlack p-8 rounded-md shadow-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.form
                onSubmit={handlePayment}
                className="flex flex-col gap-4"
              >
                <label className="font-bold text-lg">
                  Select Cryptocurrency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="p-2 border rounded-md bg-subBlack"
                >
                  <option value="BTC">Bitcoin (BTC)</option>
                  <option value="ETH">Ethereum (ETH)</option>
                  <option value="BNB">Binance Coin (BNB)</option>
                  <option value="USDT_TRC20">
                    Tether USD (USDT) - TRC20 Network
                  </option>
                </select>

                <label className="font-bold text-lg">Enter Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="p-2 border rounded-md bg-subBlack"
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
                <motion.div className="mt-8 text-center flex flex-col items-center justify-center">
                  <p className="font-bold text-lg mb-2">
                    Scan QR Code or Use Wallet Address for {currency}
                  </p>
                  <img
                    src={qrImages[currency]}
                    alt={`${currency} QR Code`}
                    className="w-full h-full rounded-3xl"
                  />
                  <p className="mt-4 font-mono text-sm bg-gray-100 p-2 rounded-md">
                    {walletAddresses[currency]}
                  </p>
                  <p className="text-xs text-gray-600 mt-2">
                    Ensure you send exactly {amount} {currency}.
                  </p>
                  <div className="mt-2">
                    <button
                      className="bg-button-light-color py-2 px-4 rounded-lg font-bold"
                      onClick={() => setIsModalOpen(true)} // Open modal on click
                    >
                      Verify Payment
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="bg-subBlack py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="custom-container flex md:flex-row flex-col justify-between gap-5">
          <div className="w-full h-auto md:w-1/2 bg-black p-5">
            <img src={paymentBg} className="h-full rounded-lg" />
          </div>
          <div className="w-full md:w-1/2">
            <motion.h2
              className="text-4xl font-bold md:text-left text-center mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              Payment Methods
            </motion.h2>

            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg md:text-left text-center">
                We accept various cryptocurrencies for payment. Please select
                your preferred method.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col gap-4 mt-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-black p-4 rounded-md shadow-md w-full text-wrap">
                <h3 className="text-xl font-bold">Bitcoin (BTC)</h3>
                <p className="text-gray-600">
                  Send BTC to the address provided below.
                </p>
                <p className="w-full break-all font-mono text-sm mt-2">
                  {walletAddresses.BTC}
                </p>
              </div>
              <div className="bg-black p-4 rounded-md shadow-md w-full md:text-nowrap text-wrap">
                <h3 className="text-xl font-bold">Ethereum (ETH)</h3>
                <p className="text-gray-600">
                  Send ETH to the address provided below.
                </p>
                <p className="w-full break-all font-mono text-sm mt-2">
                  {walletAddresses.ETH}
                </p>
              </div>
              <div className="bg-black p-4 rounded-md shadow-md w-full md:text-nowrap text-wrap">
                <h3 className="text-xl font-bold">Binance Coin (BNB)</h3>
                <p className="text-gray-600">
                  Send BNB to the address provided below.
                </p>
                <p className="w-full break-all font-mono text-sm mt-2">
                  {walletAddresses.BNB}
                </p>
              </div>
              <div className="bg-black p-4 rounded-md shadow-md w-full md:text-nowrap text-wrap">
                <h3 className="text-xl font-bold">
                  Tether USD (USDT) - TRC20 Network
                </h3>
                <p className="text-gray-600">
                  Send Tether USD (USDT) to the address provided below.
                </p>
                <p className="w-full break-all font-mono text-sm mt-2">
                  {walletAddresses.USDT_TRC20}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
};

export default PaymentPage;
