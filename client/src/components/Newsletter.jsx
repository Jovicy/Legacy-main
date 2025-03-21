import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <motion.section
      className="custom-container -mt-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="p-10 bg-button-light-color rounded-2xl w-full flex md:flex-row md:gap-0 gap-3 flex-col md:justify-between justify-center items-center">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="text-3xl md:text-left text-center font-bold">
            Subscribe to Our Newsletter
          </h1>
        </motion.div>

        {/* Form */}
        <motion.div
          className="flex md:flex-row flex-col gap-5"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex gap-2 items-center bg-transparent p-4 border-white border-2 rounded-xl">
            <FaEnvelope className="h-5 w-5" />
            <motion.input
              type="text"
              placeholder="Enter your email"
              className="h-full bg-button-light-color text-white outline-none"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            />
          </div>
          <motion.button
            className="py-2.5 px-6 bg-white text-button-light-color rounded-xl uppercase font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Subscribe
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
