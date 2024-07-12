// routes/auction.js
const express = require('express');
const router = express.Router();
const AuctionController = require('../Controllers/auctionController');
const { protect } = require('../Middleware/authMiddleWare');

// Route to start an auction
// router.post('/start/:productId', AuctionController.startAuction);

// Route to place a bid
// router.post('/bid/:productId', AuctionController.placeBid);
router.post('/placeBid', protect, AuctionController.placeBid);

// Route to get the auction status
// router.get('/status/:productId', AuctionController.getAuctionStatus);

module.exports = router;
