const Bid = require("../Models/Bid");

exports.getBidsProducts = async (req, res) => {
    try {
        const { bidderId } = req.params;
        const bids = await Bid.find({ bidderId }).populate('productId');
        const uniqueProducts = {};

        bids.forEach((bid) => {
            if (!uniqueProducts[bid.productId._id]) {
                uniqueProducts[bid.productId._id] = {
                    product: bid.productId,
                    bids: [],
                };
            }
            uniqueProducts[bid.productId._id].bids.push(bid);
        });

        const response = Object.values(uniqueProducts).map((entry) => ({
            product: entry.product,
            bids: entry.bids,
        }));

        res.status(200).json({ products: response });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: 'Error fetching bids', error });
    }
};
