var config = require('../config.json');
var express = require('express');
var router = express.Router();
 
var gameController = require('../controllers/games.controller');

// routes
router.post('/create', gameController.create);
router.get('/getAll', gameController.getAll);

module.exports = router;