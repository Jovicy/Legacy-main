require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRoute");
const cors = require("cors");

const app = express();

// Fix for Mongoose Deprecation Warning
mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure MONGO_URI is loaded
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process if DB connection fails
  });

// Routes
app.use("/api/auth", authRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Something went wrong!",
  });
});

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
