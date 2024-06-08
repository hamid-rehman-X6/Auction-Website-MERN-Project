const Seller = require("../Models/Seller");
const Bidder = require("../Models/Bidder");
const UserModel = require("../Models/Users");


// -------------------------------------  REGISTER-SELLER-FORM API   -----------------------------------------

exports.registerSeller = async (req, res) => {
    const { firstName, lastName, businessName, address, phoneNumber, postalCode, CNIC, companyDescription } = req.body;

    const userId = req.user._id; // Extract userId from req.user

    // Ensure userId is not null and is a string
    if (!userId) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }

    const userIdString = userId.toString();
    try {
        const existingSellerCNIC = await Seller.findOne({ CNIC: req.body.CNIC });
        const existingBidderCNIC = await Bidder.findOne({ CNIC: req.body.CNIC });

        if (existingSellerCNIC || existingBidderCNIC) {
            return res.status(400).json({ error: "CNIC already in use!" });
        }

        // Remove any existing seller document with null user field
        await Seller.deleteMany({ user: null });

        // Ensure unique index on user field
        await Seller.collection.createIndex({ user: 1 }, { unique: true });

        const newSeller = await Seller.create({
            firstName,
            lastName,
            businessName,
            address,
            phoneNumber,
            postalCode,
            CNIC,
            companyDescription,
            user: userIdString,
        });

        await UserModel.findByIdAndUpdate(userId, { isSellerRegistered: true });
        res.status(201).json({ msg: "Seller Registered Successfully", Data: newSeller });

    } catch (error) {
        console.error("Error in registerSeller:", error);
        return res
            .status(500)
            .json({ msg: false, error: "Internal Server Error!" });
    }
};


// -------------------------------------  CHECK-SELLER-STATUS API   ---------------------------------------

exports.checkSellerStatus = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await UserModel.findById(userId);
        res.status(200).json({ isSellerRegistered: user.isSellerRegistered });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
};

// -------------------------------------  GET-ALL-SELLERS API   -----------------------------------------


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
