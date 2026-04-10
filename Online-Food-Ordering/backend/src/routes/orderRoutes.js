const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAdminStats } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.get('/test', (req, res) => {
    res.json({ message: 'Order routes working!' });
});

router.get('/all', async (req, res) => {
    try {
        const Order = require('../models/Order');
        const orders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/place', protect, placeOrder);
router.get('/user/:userId', getUserOrders);
router.get('/admin/stats', getAdminStats);

// Delete/Cancel order route
const Order = require('../models/Order');
router.delete('/:id', async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to cancel order" });
    }
});

module.exports = router;
