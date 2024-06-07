const express = require("express");
const adminController = require("../Controllers/adminController")

const router = express.Router();

router.post("/admin", adminController.loginAdmin);

module.exports = router;
