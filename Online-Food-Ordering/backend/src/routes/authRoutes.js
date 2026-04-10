// src/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/User');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route to get user details
router.get('/user/:id', async (req, res) => {
    console.log('GET /user/:id called with ID:', req.params.id);
    try {
        const user = await User.findById(req.params.id).select('-password');
        console.log('User found:', user);
        if (!user) {
            console.log('User not found, returning 404');
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;