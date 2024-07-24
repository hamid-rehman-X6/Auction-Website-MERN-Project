const express = require('express');
const router = express.Router();
const { createPayment, verifyWinningBidder } = require('../Controllers/paymentDetailController');
const User = require("../Models/Users");
// const Bidder = require("../Models/Bidder");



router.post('/payments', createPayment);
router.get('/verifyWinningBidder/:productId', verifyWinningBidder);

// Fetch notifications for a user
router.get('/:userId/notifications', async (req, res) => {
    const { userId } = req.params;
    console.log("USER-ID:", userId);

    try {
        const user = await User.findOne({ _id: userId }, 'notifications');
        console.log("User:", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ notifications: user.notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
