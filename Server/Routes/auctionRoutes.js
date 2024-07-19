// routes/auction.js
const express = require('express');
const router = express.Router();
const AuctionController = require('../Controllers/auctionController');
const { protect } = require('../Middleware/authMiddleWare');


router.post('/placeBid', protect, AuctionController.placeBid);
router.post('/auction-end/:productId', AuctionController.auctionEnded)



module.exports = router;
