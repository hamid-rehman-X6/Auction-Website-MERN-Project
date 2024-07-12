const Bid = require("../Models/Bid");

exports.getBidsProducts = async (req, res) => {
    try {
        const { bidderId } = req.params;
        console.log(bidderId);
        const bids = await Bid.find({ bidderId }).populate('productId');
        console.log(bids);
        const products = bids.map(bid => bid.productId);
        console.log(products);
        res.status(200).json({ products });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error fetching bids', error });
    }
}