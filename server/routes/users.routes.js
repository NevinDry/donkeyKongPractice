var config = require('../config.json');
var express = require('express');
var router = express.Router();

var userController = require('../controllers/users.controller');

// routes
router.post('/authenticate', userController.authenticate);
router.post('/register', userController.register);
router.get('/current', userController.getCurrent);

module.exports = router;

