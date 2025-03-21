import React from "react";
import { plansContent } from "../data/data";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const PlansPage = () => {
  return (
    <>
      <section className="py-20 bg-black/60">
        <div className="custom-container flex flex-col gap-10">
          {/* Title Animation */}
          <motion.div
            className="text-center flex flex-col gap-2"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="text-button-light-color font-semibold">Invest</p>
            <h1 className="text-5xl font-bold mb-7">
              All your investments. <br />
              <span className="text-3xl">All on LFStrategies.</span>
            </h1>
          </motion.div>

          {/* Investment Plans */}
          <motion.div
            className="flex flex-wrap gap-y-10 justify-between"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {plansContent.length > 0 ? (
              plansContent.map((plan) => (
                <motion.div
                  key={plan.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="md:w-30s w-full"
                >
                  <Link
                    to="/payment"
                    className="flex flex-col gap-12 bg-subBlack rounded-lg pb-0 hover:text-button-light-color cursor-pointer"
                  >
                    <div className="flex flex-col gap-2 p-6">
                      <h2 className="text-3xl font-black">{plan.title}</h2>
                      <p>{plan.paragraph}</p>
                    </div>
                    {/* Image Animation */}
                    <motion.img
                      src={plan.image}
                      alt="investment-plans-illustration"
                      className="max-h-[241px]"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                No investment plans available.
              </p>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PlansPage;
