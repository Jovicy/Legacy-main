import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaCalendarAlt } from "react-icons/fa";
import { BlogDetails } from "../data/data";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const BlogDetailsPage = () => {
  const { blogId } = useParams();
  const blog = BlogDetails.find((item) => item.id === parseInt(blogId));

  if (!blog) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-red-500">Blog post not found.</h2>
        <Link
          to="/"
          className="mt-4 px-6 py-2 bg-button-light-color text-white font-semibold rounded-md shadow-md hover:bg-opacity-80 transition"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navigation />

      {/* Blog Details Header */}
      <section className="h-[50vh] bg-blog-bg bg-cover bg-center flex items-center">
        <motion.div
          className="custom-container flex flex-col gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-1">
            <FaHome />
            <p>
              <Link to="/" className="text-button-light-color font-semibold">
                Home
              </Link>{" "}
              - Blog - {blog.title}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Blog Content */}
      <section className="py-10">
        <div className="custom-container flex flex-col gap-6">
          <motion.div
            className="h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-md h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="md:text-lg text-base leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>{blog.fullContent}</p>
          </motion.div>
          <div className="flex justify-between text-sm mt-4">
            <div className="flex gap-1 items-center">
              <p>Posted By</p>
              <p className="font-bold text-button-light-color">{blog.postedBy}</p>
            </div>
            <div className="flex gap-1 items-center font-bold">
              <FaCalendarAlt className="text-button-light-color" />
              <p>{blog.Date}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetailsPage;
