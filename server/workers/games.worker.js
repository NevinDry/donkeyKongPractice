var Q = require('q');

var gameRepo = require('../repository/games.repository');


module.exports.create = function (game) {
  return new Promise(function (resolve, reject) {
    gameRepo.create(game)
      .then(function (result) {
        resolve(result);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};

module.exports.getAll = function (fromDate) {

  return new Promise(function (resolve, reject) {
    gameRepo.getAll(fromDate)
      .then(function (result) {
        resolve(result);
      })
      .catch(function (err) {
        reject(err);
      });
  });
};