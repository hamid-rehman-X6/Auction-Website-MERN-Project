// models/Bid.js
const mongoose = require('mongoose');


const BidSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    bidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Bid = mongoose.model('Bid', BidSchema);

module.exports = Bid;
