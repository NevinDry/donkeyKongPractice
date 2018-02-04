var config = require('../config.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
  native_parser: true
});
db.bind('games');

var service = {};

service.create = create;
service.getAll = getAll;

module.exports = service;

function create(game, userId) {
  var deferred = Q.defer();
  game.user = userId;
  db.games.insert(
    game,
    function (err, doc) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      console.log("Game Created");
      console.log(doc);
      deferred.resolve();
    });
  return deferred.promise;
};

function getAll(fromDate) {
  var deferred = Q.defer();
  db.games.find().toArray(function (err, games) {
    if (err) deferred.reject(err.name + ': ' + err.message);
    deferred.resolve(games);
  });
  return deferred.promise;
};
