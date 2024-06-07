const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/getalluser", authController.getAllUsers);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:id/:token", authController.resetPassword);

module.exports = router;
