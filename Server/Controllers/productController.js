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
            userId,
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
            userId,
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
        const { userId } = req.params;
        // console.log("User ID: ", userId);


        const products = await Product.find({ userId });
        // console.log("Products: ", products);


        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {

        const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
            new: true,
        })

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ product: updatedProduct });
    } catch {
        res.status(500).json({ message: 'Error updating product', error });

    }
}