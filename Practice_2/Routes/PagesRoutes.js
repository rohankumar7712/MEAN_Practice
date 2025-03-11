const express = require('express');
const pageController = require('../Controller/PageController');

const router = express.Router();

router.get('/', pageController.getPage('index'));
router.get('/index', pageController.getPage('index'));
router.get('/aboutus', pageController.getPage('aboutus'));
router.get('/contact', pageController.getPage('contact'));
router.get('/product', pageController.getPage('product'));
router.get('/services', pageController.getPage('services'));
router.get('/signup', pageController.getPage('signup'));
router.get('/login', pageController.getPage('login'));

module.exports = router;