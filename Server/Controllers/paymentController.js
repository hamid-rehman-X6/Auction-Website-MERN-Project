
const PaymentInfo = require('../Models/Payment');

exports.createPayment = async (req, res) => {
    const { cardNumber, expiryDate, cvv } = req.body;
    const bidderId = req.user.id; // Assuming the user ID is stored in the auth middleware

    try {
        // Check if payment info already exists
        let paymentInfo = await PaymentInfo.findOne({ bidderId });

        if (paymentInfo) {
            // Update existing payment info
            paymentInfo.cardNumber = cardNumber;
            paymentInfo.expiryDate = expiryDate;
            paymentInfo.cvv = cvv;
        } else {
            // Create new payment info
            paymentInfo = new PaymentInfo({ bidderId, cardNumber, expiryDate, cvv });
        }

        await paymentInfo.save();
        res.status(200).json({ message: 'Payment information saved successfully' });
    } catch (error) {
        console.error('Error saving payment information:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.getPayment = async (req, res) => {
    const bidderId = req.user.id;

    try {
        const paymentInfo = await PaymentInfo.findOne({ bidderId });

        if (paymentInfo) {
            res.status(200).json({ paymentInfoProvided: true });
        } else {
            res.status(200).json({ paymentInfoProvided: false });
        }
    } catch (error) {
        console.error('Error checking payment information:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


