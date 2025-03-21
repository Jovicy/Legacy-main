import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Forbidden = () => {
  return (
    <section className="h-screen bg-gradient-to-r from-black/70 to-transparent bg-no-repeat bg-cover bg-center flex justify-center items-center">
      {/* title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="uppercase flex justify-center items-center flex-col gap-5"
      >
        <h1 className="font-black">404</h1>
        <h1 className="font-black text-button-light-color text-8xl">
          Page Not Found
        </h1>
        <Link to="/" className="border-2 border-button-light-color rounded-md p-1">
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.9 }}
            className="py-3 px-6 bg-button-light-color border-2 border-white uppercase font-semibold tracking-wider rounded-md"
          >
            Homepage
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default Forbidden;
