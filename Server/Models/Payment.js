const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentInfoSchema = new Schema({
    bidderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
});

module.exports = mongoose.model('PaymentInfo', PaymentInfoSchema);