const express = require('express');
const router = express.Router();
const { addFood, getMenu, addFoodReview } = require('../controllers/foodController');

router.post('/add', addFood);
router.get('/menu', getMenu);
router.post('/:id/reviews', addFoodReview);

module.exports = router;