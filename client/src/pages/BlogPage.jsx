import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { BlogContent, FAQContent } from "../data/data";

const BlogPage = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  return (
    <>
      <Navigation />

      {/* Page Header */}
      <section className="h-[50vh] bg-blog-bg bg-cover bg-center flex items-center">
        <div className="custom-container flex flex-col gap-3">
          <h1 className="text-5xl font-bold">Our Blog</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Blog
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="custom-container flex flex-col gap-12 justify-center items-center">
          {/* Title */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-2">
              Our Latest <span className="text-button-light-color">News</span>
            </h1>
            <p className="text-sm">
              Stay informed with the latest updates, insights, and stories from
              our community.
            </p>
          </motion.div>

          {/* Blog Cards */}
          <div className="flex flex-wrap justify-center gap-10 w-full">
            {BlogContent.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="bg-black rounded-md p-4 md:w-1/3 w-full flex flex-col gap-4 cursor-pointer shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Link to={`/blog/${blog.id}`} className="flex flex-col gap-4">
                  <div className="h-56">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="rounded-md h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold capitalize text-xl">{blog.title}</h3>
                    <p className="text-xs">{blog.description}</p>
                  </div>
                  <div className="flex justify-between text-xs">
                    <p>
                      Posted By{" "}
                      <span className="font-bold text-button-light-color">
                        {blog.postedBy}
                      </span>
                    </p>
                    <div className="flex gap-1 items-center font-bold">
                      <FaCalendarAlt className="text-button-light-color" />
                      <p>{blog.Date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-black py-16">
        <div className="custom-container">
          <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-8">
            {FAQContent.map((faq) => (
              <motion.div
                key={faq.id}
                className="bg-subBlack p-6 rounded-md shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
              >
                <button
                  className="flex justify-between items-center w-full text-left cursor-pointer"
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <h3 className="font-bold md:text-lg text-sm mb-2">{faq.question}</h3>
                  <span className="text-xl font-bold">
                    {activeFAQ === faq.id ? "-" : "+"}
                  </span>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeFAQ === faq.id ? "auto" : 0,
                    opacity: activeFAQ === faq.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
