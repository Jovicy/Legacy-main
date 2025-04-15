const express = require("express");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);
router.get("/users", authController.isLoggedIn, authController.checkAdmin, authController.getAllUsers);
router.post("/transaction/add", authController.isLoggedIn, authController.addTransaction);
router.get("/user/:userId", authController.getUserTransactions);
router.get("/test", (req, res) => {
  res.send("Test route is working!");
});

module.exports = router;
