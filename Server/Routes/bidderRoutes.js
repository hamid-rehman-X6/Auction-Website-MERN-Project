const express = require("express");
const router = express.Router();
const bidderController = require("../Controllers/bidderController");

router.post("/bidder", bidderController.registerBidder);
router.get("/getallbidders", bidderController.getAllBidders);

module.exports = router;
