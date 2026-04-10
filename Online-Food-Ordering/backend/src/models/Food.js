const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL or file path
    category: { type: String, required: true }, // e.g., Burgers, Pizza, Drinks
    reviews: [ReviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);