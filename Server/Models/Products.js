const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    images: [{
        type: String,
        required: true,
    }],

    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    startingPrice: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return value >= 1000 && value <= 100000;
            },
            message: 'Starting price must be between 1000 and 1 lakh.'
        }
    },

    auctionStartDate: {
        type: Date,
        required: true,
    },

    auctionEndDate: {
        type: Date,
        required: true,
    },

    sellerName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users' // Reference to the User model
    },

    currentPrice: {
        type: Number,
        default: 0
    },
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        default: null
    },
    auctionStatus: {
        type: String,
        enum: ['NOT_STARTED', 'ONGOING', 'ENDED'],
        default: 'NOT_STARTED'
    },
    isAuctioned: {
        type: Boolean,
        default: false
    }
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
