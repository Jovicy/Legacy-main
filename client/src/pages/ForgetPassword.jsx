import React from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  return (
    <section className="py-20 h-screen flex justify-center items-center bg-works-bg bg-cover">
      <div className="custom-container flex flex-col justify-center items-center">
        <div className="md:w-[40%] w-full shadow-button-light-color shadow-lg rounded-lg">
          {/* Title */}
          <div className="w-full bg-works-gradient rounded-t-lg p-10 bg-cover bg-center text-center">
            <h2 className="text-3xl font-bold text-center text-white">
              Forget Password?
            </h2>
            <p>
              Enter the email address associated with your Legacy Finanacial
              Strategies account.
            </p>
          </div>
          {/* Form Content */}
          <div className="w-full bg-subBlack rounded-b-lg p-10 ">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-normal">Enter Email Adress</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-6 py-3 text-sm text-button-light-color border-2 border-button-light-color rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none bg-subBlack"
              />
            </div>
            <div className="flex flex-col gap-1">
                <button
                type="submit"
                className="w-full px-4 py-3 mt-4 text-white bg-button-light-color rounded-lg"
                >
                Send Code
                </button>
            </div>
            <div className="mt-3 border py-2 border-b-button-light-color border-subBlack">
              <p className="text-sm">
                Already have an account? <Link to="/login" className="text-button-light-color font-semibold">Sign In</Link>{" "}
              </p>
              <p className="text-sm">
                Create an account? <Link to="/register" className="text-button-light-color font-semibold">Sign Up</Link>
              </p>
            </div>
            <div className="mt-2">
                <p>You may contact <Link to="/contact" className="text-button-light-color font-semibold">Customer Service</Link> for help restoring access to your account.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
