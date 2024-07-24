const Payment = require('../Models/PaymentDetail');
const Product = require("../Models/Products")
const jwt = require('jsonwebtoken');
const User = require("../Models/Users");

const createPayment = async (req, res) => {
    try {
        // Ensure authorization header is present
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Authorization header missing' });
        }

        // Ensure authorization header has the correct format
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Token not found in authorization header' });
        }

        const decodedToken = jwt.verify(token, "secret5575key5755");
        const userId = decodedToken.id;



        // Continue with payment processing
        const payment = new Payment(req.body);
        await payment.save();



        // Add a notification to the user's profile
        const notificationMessage = `Payment for Product 1 was successful. Thank you for your purchase!`;

        await User.findByIdAndUpdate(userId, {
            $push: {
                notifications: {
                    message: notificationMessage,
                    date: new Date(),
                    type: 'payment'
                }
            }
        });

        res.status(201).json({
            payment,
            message: "Payment successful and notification added to profile."
        });
    } catch (error) {
        console.error("Error in createPayment:", error);
        res.status(400).json({ error: error.message });
    }
};



const verifyWinningBidder = async (req, res) => {
    const { productId } = req.params;
    const token = req.headers.authorization.split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "secret5575key5755"); // Ensure you have the JWT_SECRET in your .env
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ error: 'Invalid token' });
    }

    try {
        const product = await Product.findById(productId).lean();
        if (!product) {
            console.error("Product not found");
            return res.status(404).json({ error: 'Product not found' });
        }

        const highestBidderId = (product.highestBidderId || "").toString().trim();
        const decodedId = (decodedToken.id || "").toString().trim();

        if (highestBidderId === decodedId) {
            return res.status(200).json({ isWinner: true });
        } else {
            return res.status(403).json({ isWinner: false });
        }
    } catch (error) {
        console.error("Error finding product or verifying winning bidder:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createPayment, verifyWinningBidder };
