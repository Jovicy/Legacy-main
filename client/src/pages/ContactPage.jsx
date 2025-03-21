import React from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { FaHome, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactImage from "../assets/contact-us-bg.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const ContactPage = () => {
  return (
    <>
      <Navigation />
      {/* Page Header */}
      <motion.section
        className="h-[50vh] bg-contact-bg bg-cover bg-center flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-5xl font-bold">How can we help you today?</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Contact
            </p>
          </div>
        </div>
      </motion.section>
      {/* Contact List */}
      <section className="py-20">
        <div className="custom-container flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-black">
              Quick <br /> Support.
            </h2>
            <p className="text-sm">You can get all information</p>
          </div>
          {/* Container Box */}
          <motion.div
            className="flex justify-between flex-wrap md:gap-0 gap-7"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-button-light-color md:w-30s w-full rounded-md p-5 flex flex-col gap-3 shadow-button-light-color shadow-md">
              <div>
                <FaPhoneAlt className="h-7 w-5" />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl">Call Us</h3>
                <div>
                  <p>+1 (339) 221-1218</p>
                </div>
              </div>
            </div>
            <div className="bg-button-light-color md:w-30s w-full rounded-md p-5 flex flex-col gap-3 shadow-button-light-color shadow-md">
              <div>
                <FaEnvelope className="h-7 w-5" />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl">Mail Us</h3>
                <div>
                  <p>legacyfinancialstrategy@gmail.com</p>
                </div>
              </div>
            </div>
            <div className="bg-button-light-color md:w-30s w-full rounded-md p-5 flex flex-col gap-3 shadow-button-light-color shadow-md">
              <div>
                <FaMapMarkerAlt className="h-7 w-5" />
              </div>
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl">Visit Us</h3>
                <div>
                  <p>
                    Legacy Strategy 4567 Oakridge Drive, Denver, Colorado, United States
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-10 bg-black">
        <div className="custom-container flex md:flex-row flex-col justify-between items-center gap-10">
          <motion.div
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={contactImage} alt="contact-img" className="rounded-lg" />
          </motion.div>
          <motion.form
            className="md:w-1/2 w-full flex flex-col gap-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black">
                Contact. <br className="block" />
                Get in touch.
              </h1>
              <p className="text-sm">Leave us a message</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex md:flex-row flex-col gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="outline-none w-full py-3 px-6 border-2 border-button-light-color rounded-md bg-subBlack"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="outline-none w-full py-3 px-6 border-2 border-button-light-color rounded-md bg-subBlack"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  className="outline-none w-full py-3 px-6 border-2 border-button-light-color rounded-md bg-subBlack"
                  rows={5}
                ></textarea>
              </div>
            </div>
            <div>
              <button className="py-3 px-6 bg-button-light-color rounded-md uppercase font-semibold">
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
