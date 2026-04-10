const Food = require('../models/Food');

// 1. Add a New Food Item (Admin Task)
const addFood = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;
        const newFood = new Food({ name, description, price, image, category });
        await newFood.save();
        res.status(201).json({ message: "Food item added!", food: newFood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get All Food Items (For the Menu Page)
const getMenu = async (req, res) => {
    try {
        const menu = await Food.find();
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addFoodReview = async (req, res) => {
    const { rating, comment, username } = req.body;
    const food = await Food.findById(req.params.id);

    if (food) {
        const review = { username, rating: Number(rating), comment };
        food.reviews.push(review);
        food.numReviews = food.reviews.length;
        food.rating = food.reviews.reduce((acc, item) => item.rating + acc, 0) / food.reviews.length;

        await food.save();
        res.status(201).json({ message: 'Review added' });
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
};

module.exports = {
    addFood,
    getMenu,
    addFoodReview
};