// controllers/AuctionController.js
const Product = require('../Models/Products');
const Bid = require('../Models/Bid');
const User = require('../Models/Users');

exports.startAuction = async (req, res) => {
    const { productId } = req.params;
    const { sellerId, auctionDuration } = req.body;

    try {
        const product = await Product.findById(productId);
        console.log("Product: ", product);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.sellerId.toString() !== sellerId) {
            return res.status(403).json({ error: 'Only the seller can start the auction' });
        }

        product.auctionStatus = 'ONGOING';
        product.auctionEndDate = new Date(Date.now() + auctionDuration * 60000); // auctionDuration in minutes
        await product.save();

        return res.json({ message: 'Auction started', auctionEndDate: product.auctionEndDate });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.placeBid = async (req, res) => {
    const { productId } = req.params;
    const { bidderId, bidAmount } = req.body;

    try {
        const product = await Product.findById(productId);
        console.log(product);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.auctionStatus !== 'ONGOING') {
            return res.status(400).json({ error: 'Auction is not ongoing' });
        }

        if (bidAmount <= product.currentPrice) {
            return res.status(400).json({ error: 'Bid amount must be higher than current price' });
        }

        const bid = new Bid({
            amount: bidAmount,
            bidder: bidderId,
            product: productId
        });

        await bid.save();

        product.currentPrice = bidAmount;
        product.highestBidder = bidderId;
        await product.save();

        return res.json({ message: 'Bid placed', currentPrice: product.currentPrice, highestBidder: product.highestBidder });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.getAuctionStatus = async (req, res) => {
    const { productId } = req.params;
    console.log(productId);

    try {
        const product = await Product.findById(productId).populate('highestBidder', 'username');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.json({
            currentPrice: product.currentPrice,
            highestBidder: product.highestBidder ? product.highestBidder.username : null,
            auctionStatus: product.auctionStatus,
            auctionEndTime: product.auctionEndDate
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
