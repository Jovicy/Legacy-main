import React from "react";
import { reasons } from "../data/data";
import { motion } from "framer-motion";

const Reason = () => {
  return (
    <section className="py-20">
      <div className="custom-container flex flex-col gap-20">
        {/* Title Animation */}
        <motion.div
          className="text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold mb-7">
            Why Choose{" "}
            <span className="text-button-light-color">LFStrategies</span>
          </h1>
          <p className="w-3/4">
            Our goal is to provide our investors with a reliable source of high
            income while minimizing risks and ensuring sustainable growth
            through diverse investment opportunities.
          </p>
        </motion.div>

        {/* Content with Staggered Animation */}
        <motion.div
          className="flex justify-between flex-wrap gap-y-8 gap-5"
          initial="hidden"
          whileInView="visible"
          transition={{ staggerChildren: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {reasons.map((res) => {
            const IconComponent = res.fontAwesomeIcon;
            return (
              <motion.div
                key={res.id}
                className="md:w-30s w-full p-6 rounded-lg bg-black/60 backdrop-blur-md flex flex-col gap-4"
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon Animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: res.id * 0.1 }}
                  className="flex items-center gap-3 text-button-light-color"
                >
                  <span>
                    <IconComponent className="text-button-light-color text-2xl" />
                  </span>
                  <span>
                    <h2 className="text-xl font-semibold">{res.title}</h2>
                  </span>
                </motion.div>

                <div>
                  <p>{res.content}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Reason;
