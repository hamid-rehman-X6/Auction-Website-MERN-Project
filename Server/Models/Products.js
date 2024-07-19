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

    // auctionEndDate: {
    //     type: Date,
    //     required: true,
    //     validate: {
    //         validator: function (value) {
    //             const startDate = new Date(this.auctionStartDate);
    //             startDate.setDate(startDate.getDate() + 7); // Minimum auction duration of 7 days
    //             const endDate = new Date(value);
    //             return endDate <= startDate.setDate(startDate.getDate() + 7); // Maximum auction duration of 14 days
    //         },
    //         message: 'Auction duration must be between 7 and 14 days.'
    //     }
    // },
    auctionEndDate: {
        type: Date,
        required: true,
        // validate: {
        //     validator: function (value) {
        //         const startDate = new Date(this.auctionStartDate);
        //         const endDate = new Date(value);
        //         const timeDiff = endDate.getTime() - startDate.getTime();
        //         const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
        //         return daysDiff >= 0 && daysDiff <= 14; // Ensure auction duration is between 0 and 14 days
        //     },
        //     message: 'Auction duration must be between 0 and 14 days.'
        // }
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
        type: String,
        // ref: 'Users',
        default: null
    },
    isAuctioned: {
        type: Boolean,
        default: false
    },
    winner: {
        type: String,
        default: null
    }
});


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
