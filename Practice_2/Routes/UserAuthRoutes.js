const express = require('express');
const authController = require('../Controller/UserAuthController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;

