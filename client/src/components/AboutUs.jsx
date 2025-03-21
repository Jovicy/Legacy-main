import React from "react";
import AboutOne from "../assets/about-one.jfif";
import AboutTwo from "../assets/about-two.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <section className="py-20">
      <div className="custom-container flex md:flex-row-reverse flex-col-reverse gap-10 justify-between items-center">
        {/* About Briefing */}
        <div className="md:w-1/2 w-full flex flex-col gap-6 md:text-left text-center">
          {/* Heading Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl font-bold">
              About <span className="text-button-light-color">Us</span>
            </h1>
          </motion.div>

          {/* Paragraph Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ staggerChildren: 0.3 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-col gap-3"
          >
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              Legacy Finance Strategy is a global financial company offering
              diverse investment opportunities, with a primary focus on
              cryptocurrency. Our experienced team combines extensive knowledge
              of financial markets and blockchain technology to deliver
              consistent, reliable results.
            </motion.p>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              Our mission is to provide secure and profitable investment options
              while minimizing risks and maintaining transparency. We simplify
              the investment process, fostering strong relationships between
              investors and our expert team. At Legacy Finance Strategy, we are
              dedicated to helping you achieve your financial goals through
              innovative and proven strategies.
            </motion.p>
          </motion.div>

          {/* Button Animation */}
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Link to={"/about"} className="py-3 px-6 bg-button-light-color rounded-md uppercase font-semibold">
              More Info
            </Link>
          </motion.div>
        </div>

        {/* About Image with Zoom-in Animation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="md:w-1/2 w-full"
        >
          <img
            src={AboutTwo}
            alt="about-img"
            className="rounded-2xl border-8 border-button-light-color"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
