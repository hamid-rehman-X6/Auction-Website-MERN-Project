const express = require("express");
const router = express.Router();
const sellerController = require("../Controllers/sellerController");
const { protect } = require("../Middleware/authMiddleWare");

router.post("/seller", protect, sellerController.registerSeller);
router.get("/getallsellers", sellerController.getAllSellers);
router.get("/status", protect, sellerController.checkSellerStatus)

module.exports = router;
