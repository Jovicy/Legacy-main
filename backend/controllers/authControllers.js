const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError"); // Fixed class name
require("dotenv").config(); // Load environment variables

const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret"; // Fallback for testing

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "90d" });
};

// Register Users
exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return next(new AppError("All fields are required!", 400));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    // Create new user (password hashing handled in userModel.js)
    const newUser = await User.create({ name, email, password });

    // Generate Token
    const token = generateToken(newUser._id);

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login Users
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return next(new AppError("Please provide email and password!", 400));
    }

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) return next(new AppError("User not found!", 400));

    // Validate password using the method in userModel.js
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 400));
    }

    // Generate Token
    const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
