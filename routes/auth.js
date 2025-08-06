const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register); // ✅ New registration route
router.post('/login', authController.login);        // Existing login route

module.exports = router;
