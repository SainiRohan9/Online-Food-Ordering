require('dotenv').config();
const mongoose = require('mongoose');
const Food = require('./models/Food');

const sampleFoods = [
    {
        name: "Margherita Pizza",
        description: "Classic pizza with fresh tomatoes, mozzarella, and basil",
        price: 299,
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
        category: "Pizza",
        rating: 4.5,
        numReviews: 10
    },
    {
        name: "Pepperoni Pizza",
        description: "Loaded with pepperoni and extra cheese",
        price: 349,
        image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
        category: "Pizza",
        rating: 4.7,
        numReviews: 15
    },
    {
        name: "Classic Burger",
        description: "Juicy beef patty with lettuce, tomato, and special sauce",
        price: 199,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
        category: "Burger",
        rating: 4.3,
        numReviews: 20
    },
    {
        name: "Cheese Burger",
        description: "Double cheese with crispy bacon",
        price: 249,
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500",
        category: "Burger",
        rating: 4.6,
        numReviews: 12
    },
    {
        name: "Spring Rolls",
        description: "Crispy vegetable spring rolls with sweet chili sauce",
        price: 149,
        image: "https://images.unsplash.com/photo-1606525437629-5d8e0df19d0f?w=500",
        category: "Chinese",
        rating: 4.2,
        numReviews: 8
    },
    {
        name: "Fried Rice",
        description: "Vegetable fried rice with soy sauce",
        price: 179,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500",
        category: "Chinese",
        rating: 4.4,
        numReviews: 14
    },
    {
        name: "Dhokla",
        description: "Soft and spongy steamed gram flour cakes",
        price: 99,
        image: "https://images.unsplash.com/photo-1626132647523-66f4bf3ebdc5?w=500",
        category: "Gujarati",
        rating: 4.5,
        numReviews: 18
    },
    {
        name: "Khandvi",
        description: "Gram flour rolls tempered with mustard seeds and curry leaves",
        price: 119,
        image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
        category: "Gujarati",
        rating: 4.3,
        numReviews: 11
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        
        // Clear existing data
        await Food.deleteMany({});
        console.log('Cleared existing food items');
        
        // Insert sample data
        await Food.insertMany(sampleFoods);
        console.log('Sample food items added successfully');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
