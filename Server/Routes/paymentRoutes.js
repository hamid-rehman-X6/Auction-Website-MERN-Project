const express = require("express");
const route = express.Router();
const PaymentController = require("../Controllers/paymentController");
const { protect } = require("../Middleware/authMiddleWare");


route.post('/savePaymentInfo', protect, PaymentController.createPayment);

route.get('/checkPaymentInfo', protect, PaymentController.getPayment);


module.exports = route;