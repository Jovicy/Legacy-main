import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <section className="bg-header-bg bg-fixed bg-center bg-no-repeat bg-cover h-auto relative">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="flex flex-col relative z-10">
        <Navigation />
        <div className="py-32 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="custom-container flex flex-col gap-5 text-center"
          >
            {/* Title Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h1 className="font-bold capitalize">
                Take Your <br />
                <b className="text-button-light-color">Investment Strategy</b> <br />
                to the next level
              </h1>
            </motion.div>

            {/* Subtitle Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <p>
                Unlock New Opportunities with Cryptocurrency Investments,
                Stocks, Real Estate, Mutual Funds, ETFs, Bonds, and Commodities
                to Secure Your Financial Future.
              </p>
            </motion.div>

            {/* Button Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to={"/register"} className="py-3 px-6 bg-button-light-color rounded-full uppercase font-semibold">
                Get Started Now!
              </Link >
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Header;
