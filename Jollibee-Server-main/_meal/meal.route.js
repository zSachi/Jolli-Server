const express = require('express');
const router = express.Router();
const mealController = require('./meal.controller');

// Get all meals
router.get('/', mealController.getMeals);

// Get meals by category
router.get('/category/:categoryId', mealController.getMealsByCategory);

// Get single meal
router.get('/:id', mealController.getMeal);

// Create meal
router.post('/', mealController.createMeal);

// Update meal
router.put('/:id', mealController.updateMeal);

// Soft delete meal - must come before /:id route to avoid conflict
router.delete('/soft/:id', mealController.softDeleteMeal);

// Hard delete meal - must come before /:id route to avoid conflict
router.delete('/hard/:id', mealController.hardDeleteMeal);

module.exports = router;