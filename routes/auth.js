const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Auth routes
router.post('/register', authController.register);  // Register a new user
router.post('/login', authController.login);        // Login and get a token

module.exports = router;
