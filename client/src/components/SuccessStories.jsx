import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { stories } from "../data/data";
import { motion } from "framer-motion";

const SuccessStories = () => {
  return (
    <section className="bg-black py-16">
      <div className="custom-container">
        {/* Heading Animation */}
        <motion.h2
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Success Stories
        </motion.h2>

        {/* Grid Container with Staggered Animations */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="bg-subBlack p-6 rounded-md shadow-md hover:shadow-xl transition-shadow duration-300"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon Animation */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              >
                <FaCheckCircle className="text-green-500 text-3xl mb-4" />
              </motion.div>

              <h3 className="text-xl font-bold mb-2">{story.title}</h3>
              <p className="text-gray-600 text-sm">{story.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
