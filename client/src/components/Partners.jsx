import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { partners } from "../data/data";

const Partners = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? partners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000);
    return () => clearInterval(interval);
  }, []);

  // Get the indices for three visible images
  const getVisibleImages = () => {
    return [
      partners[currentIndex],
      partners[(currentIndex + 1) % partners.length],
      partners[(currentIndex + 2) % partners.length],
    ];
  };

  return (
    <section className="bg-black/50 py-10">
      <div className="custom-container flex flex-col gap-12 justify-center items-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold mb-2">
            Our <span className="text-button-light-color">Partners</span>
          </h1>
          <p>Trusted by world-class investment and research teams</p>
        </motion.div>

        <div className="relative w-full max-w-6xl">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 w-full -translate-y-1/2 px-4 flex justify-between">
            <motion.button
              onClick={handlePrevious}
              className="text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2x" />
            </motion.button>
            <motion.button
              onClick={handleNext}
              className="text-white"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FontAwesomeIcon icon={faChevronRight} size="2x" />
            </motion.button>
          </div>

          {/* Carousel */}
          <div className="flex justify-center gap-12 transition-transform duration-500 bg-white/45 rounded-xl">
            <AnimatePresence mode="popLayout">
              {getVisibleImages().map((partner, index) => (
                <motion.div
                  key={index}
                  className="w-52 h-52 rounded-full overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={partner.image}
                    alt={`Partner ${index + 1}`}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
