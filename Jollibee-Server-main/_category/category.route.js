const express = require('express');
const router = express.Router();
const categoryController = require('./category.controller');

// Get all categories
router.get('/', categoryController.getCategories);

// Get single category
router.get('/:id', categoryController.getCategory);

// Create category
router.post('/', categoryController.createCategory);

// Update category
router.put('/:id', categoryController.updateCategory);

// Delete routes
router.delete('/soft/:id', categoryController.softDeleteCategory);
router.delete('/hard/:id', categoryController.hardDeleteCategory);

module.exports = router;