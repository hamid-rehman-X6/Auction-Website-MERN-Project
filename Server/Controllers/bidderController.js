const Seller = require("../Models/Seller");
const Bidder = require("../Models/Bidder");

exports.registerBidder = async (req, res) => {
    try {
        const existingSellerCNIC = await Seller.findOne({ CNIC: req.body.CNIC });
        const existingBidderCNIC = await Bidder.findOne({ CNIC: req.body.CNIC });

        if (existingSellerCNIC || existingBidderCNIC) {
            return res.status(400).json({ error: "CNIC already in use!" });
        }
        const newBidder = await Bidder.create(req.body);
        return res
            .status(201)
            .json({ msg: "Bidder Registered Successfully", Data: newBidder });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ msg: false, error: "Internal  Server Error!" });
    }
};

exports.getAllBidders = async (req, res) => {
    try {
        const getAllBidders = await Bidder.find();
        return res
            .status(201)
            .json({ message: "All Bidders Record", Data: getAllBidders });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
