const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/appError"); // Fixed class name
const Transaction = require("../models/transactionModel");
require("dotenv").config(); // Load environment variables

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15min" } // Access token expires in 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" } // Refresh token expires in 7 days
  );

  return { accessToken, refreshToken };
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

    let userRole = "user";
    const adminEmails = "admin@legacyfinancestrategies.com";
    if (adminEmails === email) {
      userRole = "admin";
    }

    // Create new user (password hashing handled in userModel.js)
    const newUser = await User.create({ name, email, password, role: userRole });

    res.status(201).json({
      status: "success",
      message: "User Registered Successfully",
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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // // Generate a JWT token
    const { accessToken, refreshToken } = generateTokens(user);

    res.status(200).json({
      status: "success",
      message: "User Logged In Successfully",
      token: accessToken,
      refreshToken: refreshToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        firstLogin: user.firstLogin,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select("-password"); // Exclude password field & admins

    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.addTransaction = async (req, res, next) => {
  try {
    const { userId, amount, type, description } = req.body;

    const transactionAmount = Number(amount);
    if (!transactionAmount || transactionAmount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin") {
      return res.status(403).json({ message: "Admins cannot perform transactions" });
    }

    if (type === "debit" && user.totalTransactionAmount < transactionAmount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    const transaction = await Transaction.create({
      user: userId,
      amount: type === "debit" ? -Math.abs(transactionAmount) : Math.abs(transactionAmount), // Store debit as negative
      type,
      description,
    });

    user.totalTransactionAmount = Number(user.totalTransactionAmount) + transaction.amount;
    user.transactions.push(transaction._id);
    await user.save();

    res.status(201).json({ status: "success", data: transaction });
  } catch (error) {
    next(error);
  }
};

exports.getUserTransactions = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Fetch user and populate transactions
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "transactions",
        options: { sort: { createdAt: -1 } }, // Sort transactions by latest
      });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      user: user,
    });

    if (user.firstLogin) {
      user.firstLogin = false;
      await user.save();
    }
  } catch (error) {
    next(error);
  }
};

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to request

    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
};

exports.checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      status: "fail",
      message: "Access denied. Admins only.",
    });
  }
  next();
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(currentUser);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    next(error);
  }
};
