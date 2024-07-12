const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bidder',
        required: true,
    },
    bidValue: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
