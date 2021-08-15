const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth.js');

//import router controller
const usersController = require('../controllers/usersControllers');

//Login user route
router.post('/api/auth/login', usersController.loginUser);

router.get('/api/auth', auth, usersController.getLoggedInuser);
module.exports = router