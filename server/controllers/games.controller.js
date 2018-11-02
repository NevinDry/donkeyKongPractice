var gameWorker = require('../workers/games.worker');
var HttpResponses = require('../models/HttpResponses');

module.exports.create = function (req, res, next) {
  var game = req.body;
  game.user = req.user._id

  gameWorker.create(game)
    .then(function () {
      next(new HttpResponses.HttpSucces(true, 200, 'Game added', null));
    })
    .catch(function (err) {
      next(new HttpResponses.HttpError('Error creating game', err, 500));
    });
};


module.exports.getAll = function getAll(req, res, next) {
  gameWorker.getAll(req.date)
    .then(function (games) {
      console.log(games);
      next(new HttpResponses.HttpSucces(true, 200,'Games harvested', games));
    })
    .catch(function (err) {
        next(new HttpResponses.HttpError('Error getting games', err, 500));
    });
}