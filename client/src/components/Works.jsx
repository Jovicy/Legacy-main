import React from "react";
import { motion } from "framer-motion";
import { FaRegUser, FaHandHoldingUsd, FaWallet } from "react-icons/fa";

const steps = [
  { id: 1, icon: <FaRegUser className="h-8 w-8 text-button-light-color" />, title: "Create Account" },
  { id: 2, icon: <FaHandHoldingUsd className="h-8 w-8 text-button-light-color" />, title: "Invest To Plan" },
  { id: 3, icon: <FaWallet className="h-8 w-8 text-button-light-color" />, title: "Get Profit" },
];

const Works = () => {
  return (
    <motion.section
      className="py-20 bg-works-bg bg-cover bg-no-repeat"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="custom-container flex flex-col gap-20">
        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold leading-snug">
            How{" "}
            <span className="text-button-light-color">
              Legacy Financial Strategy
            </span>{" "}
            <br /> Works
          </h1>
          <p>
            Get involved in our tremendous platform and Invest. <br /> We will utilize
            your money and give you profit in your wallet automatically.
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="flex justify-evenly items-center md:flex-row flex-col md:gap-0 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-black w-28 h-28 rounded-full border-4 border-button-light-color flex justify-center items-center relative"
                whileHover={{ scale: 1.1 }}
              >
                {step.icon}
                <p className="h-8 w-8 flex justify-center items-center rounded-full bg-black text-white absolute top-0 right-0 border-4 border-button-light-color text-xs">
                  0{step.id}
                </p>
              </motion.div>
              <h3 className="font-bold text-2xl">{step.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Works;
