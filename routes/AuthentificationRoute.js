const express = require('express');
const router = express.Router();
const { signin } = require('../controllers/userController');

// Signin route
router.post('/signin', signin);

module.exports = router;
