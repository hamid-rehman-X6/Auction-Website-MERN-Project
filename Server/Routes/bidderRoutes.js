const express = require("express");
const router = express.Router();
const bidderController = require("../Controllers/bidderController");
const { protect } = require("../Middleware/authMiddleWare");

router.post("/bidder", protect, bidderController.registerBidder);
router.get("/getallbidders", bidderController.getAllBidders);

module.exports = router;
