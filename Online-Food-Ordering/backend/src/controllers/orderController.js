const Order = require('../models/Order');

const placeOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, address } = req.body;
        const newOrder = new Order({ user: userId, items, totalAmount, address });
        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully!", order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'username email').sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAdminStats = async (req, res) => {
    try {
        const orders = await Order.find();
        const totalOrders = orders.length;
        const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        
        // Count orders by status
        const statusCounts = {
            Pending: orders.filter(o => o.status === 'Pending').length,
            Delivered: orders.filter(o => o.status === 'Delivered').length
        };

        res.status(200).json({ totalOrders, totalEarnings, statusCounts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    placeOrder,
    getUserOrders,
    getAllOrders,
    getAdminStats
};
