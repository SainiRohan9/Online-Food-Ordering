const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
            name: String,
            price: Number,
            quantity: { type: Number, default: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Out for Delivery, Delivered
    address: { type: String, required: true },
    paymentMethod: { type: String, default: 'COD' } // COD, UPI, Card
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
