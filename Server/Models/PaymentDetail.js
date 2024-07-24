const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    postalCode: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    paymentMethod: { type: String, required: true }
});

const Payment = mongoose.model('PaymentDetail', paymentSchema);

module.exports = Payment;
