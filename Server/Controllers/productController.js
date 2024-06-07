const Product = require("../Models/Products");

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            startingPrice,
            auctionStartDate,
            auctionEndDate,
            sellerName,
            images,
            sellerId,
        } = req.body;

        const newProductData = new Product({
            title,
            description,
            category,
            startingPrice,
            auctionStartDate,
            auctionEndDate,
            sellerName,
            images,
            sellerId,
        });
        console.log(newProductData);
        await newProductData.save();

        res
            .status(201)
            .json({ message: "Product Listed Successfully", data: newProductData });
    } catch (error) {
        console.error(error);
        // Check if the error is a validation error
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message });
        }
        res
            .status(500)
            .json({ message: "An error occurred while listing the product." });
    }
}

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getbyId = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Product.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(201).json({ message: "Product Deleted", Data: deleteProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getProductsBySellerId = async (req, res) => {
    try {
        const { sellerId } = req.params;
        console.log("Seller ID: ", sellerId);


        const products = await Product.find({ sellerId });
        // console.log("Products: ", products);


        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
