const Seller = require("../Models/Seller");
const Bidder = require("../Models/Bidder");

exports.registerSeller = async (req, res) => {
    try {
        const existingSellerCNIC = await Seller.findOne({ CNIC: req.body.CNIC });
        const existingBidderCNIC = await Bidder.findOne({ CNIC: req.body.CNIC });

        if (existingSellerCNIC || existingBidderCNIC) {
            return res.status(400).json({ error: "CNIC already in use!" });
        }

        const newSeller = await Seller.create(req.body);
        return res
            .status(201)
            .json({ msg: "Seller Registered Successfully", Data: newSeller });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ msg: false, error: "Internal Server Error!" });
    }
};

exports.getAllSellers = async (req, res) => {
    try {
        const getAllSellers = await Seller.find();
        return res
            .status(201)
            .json({ message: "All Sellers Record", Data: getAllSellers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
