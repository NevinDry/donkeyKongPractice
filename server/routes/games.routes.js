var config = require('../config.json');
var express = require('express');
var router = express.Router();
 
var gameWorker = require('../workers/games.worker');

// routes
router.post('/create', create);
router.get('/getAll', getAll);
 
module.exports = router;
 
function create(req, res) {
    gameWorker.create(req.body, req.user._id)
    .then(function () {
      res.status(200).send({
        success: true,
        message: 'Game added'
      });
    })
    .catch(function (err) {
      return res.status(500).send({
        success: false,
        message: err
      });
    });
}

function getAll(req, res) {
    gameWorker.getAll(req.date)
    .then(function (games) {
      console.log(games);
      res.status(200).send({
        success: true,
        message: 'Games harvested',
        data: games 
      });
    })
    .catch(function (err) {
      return res.status(500).send({
        success: false,
        message: err
      });
    });
}