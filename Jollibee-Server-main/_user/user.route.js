const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Get all users
router.get('/', userController.getAllUsers);

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// Profile routes
router.get('/:id', userController.getProfile);
router.put('/:id', userController.updateProfile);

// Delete routes
router.delete('/soft/:id', userController.softDeleteUser);
router.delete('/hard/:id', userController.hardDeleteUser);

module.exports = router;