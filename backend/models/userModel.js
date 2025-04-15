const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    totalTransactionAmount: {
      type: Number,
      default: 0,
    },
    firstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", function (next) {
  if (this.role === "admin") {
    this.transactions = undefined;
    this.totalTransactionAmount = undefined;
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  if (user.role === "admin") {
    delete user.transactions;
    delete user.totalTransactionAmount;
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
