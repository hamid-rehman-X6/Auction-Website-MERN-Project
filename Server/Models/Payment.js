const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentInfoSchema = new Schema({
    bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardNumber: { type: String, },
    expiryDate: { type: String, },
    cvv: { type: String, },
});

module.exports = mongoose.model('PaymentInfo', PaymentInfoSchema);