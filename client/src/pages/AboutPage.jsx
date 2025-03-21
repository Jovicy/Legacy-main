import React from "react";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Works from "../components/Works";
import AboutUs from "../components/AboutUs";
import Partners from "../components/Partners";
import { teams } from "../data/data";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <>
      <Navigation />

      {/* Page Header */}
      <motion.section
        className="h-[50vh] bg-about-bg bg-cover bg-center flex items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-5xl font-bold">About Us</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - About Us
            </p>
          </div>
        </div>
      </motion.section>

      <AboutUs />
      <Partners />

      {/* Our Expert Team Members */}
      <motion.section
        className="py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="custom-container flex flex-col gap-12">
          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl font-bold mb-2">
              Our Expert
              <span className="text-button-light-color"> Team Members</span>
            </h1>
            <p>Trusted by world-class investment and research teams</p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-between gap-y-5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2, duration: 0.5 },
              },
            }}
          >
            {teams.map((team) => (
              <motion.div
                key={team.id}
                className="md:w-[23%] w-full rounded-md bg-black p-5 flex flex-col gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: team.id * 0.1 }}
              >
                <div>
                  <img
                    src={team.image}
                    alt={team.name}
                    className="rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-2xl">{team.name}</h3>
                  <p className="text-sm">{team.position}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Works />

      {/* Get Started Section */}
      <motion.section
        className="py-20 bg-black"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="custom-container flex justify-center">
          <motion.div
            className="md:w-3/4 w-full bg-join-bg bg-cover bg-center bg-no-repeat p-10 rounded-lg text-center flex flex-col gap-5 shadow-button-light-color shadow"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-2">
              Get Started Today With Us
            </h1>
            <p className="text-sm">
              This is a Revolutionary Money Making Platform! Invest for Future
              in Stable Platform and Make Fast Money. Not only we guarantee the
              fastest and the most exciting returns on your investments, but we
              also guarantee the security of your investment.
            </p>
            <div>
              <Link to={"/register"}>
                <motion.button
                  className="py-3 px-6 bg-button-light-color rounded-md uppercase font-semibold"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default AboutPage;
