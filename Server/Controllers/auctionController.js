// controllers/AuctionController.js
const Product = require('../Models/Products');
const Bidder = require("../Models/Bidder");
const Bid = require("../Models/Bid");

exports.placeBid = async (req, res) => {

    const { productId, bidValue } = req.body;
    const userID = req.user._id;
    // console.log("UserID: ", userID);


    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Product not found.");
        }

        if (bidValue <= product.currentPrice) {
            return res.status(400).send("Bid value must be higher than the current price.");
        }

        // Retrieve bidder's information
        const bidder = await Bidder.findOne({ user: userID });
        // console.log(bidder);
        if (!bidder) {
            console.log("Bidder Not Found")
            return res.status(404).send("Bidder not found.");
        }


        // Create a new bid entry
        const newBid = new Bid({
            productId,
            bidderId: bidder._id,
            bidValue,
        });
        await newBid.save();


        // Update the product's current price and highest bidder
        product.currentPrice = bidValue;
        product.highestBidder = `${bidder.firstName} ${bidder.lastName}`;
        product.highestBidderId = userID; // Store the ID of the highest bidder
        await product.save();

        res.json({ message: "Bid placed successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error placing bid.");
    }

};


exports.auctionEnded = async (req, res) => {
    const productId = req.params.productId;
    // console.log(productId)

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update winner only if there is at least one bid
        // if (product.currentPrice > 0) {
        //     product.winner = product.highestBidder;
        //     await product.save();
        // }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error updating product winner:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
