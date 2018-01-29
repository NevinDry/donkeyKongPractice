var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var MongoDB = require("../db");

MongoDB.OpenConnection(
  function (db) {
    db.getCollection('users').find({})
      .then(function (doc) {
        db.close();
        console.log("doc");
      })
      .catch(function (err) {
        db.close();
        console.log(err);
      });
  });


var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;

module.exports = service;

function authenticate(username, password) {
  //var deferred = Q.defer();

  db.collection('users').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  // console.log("coucou");
  // db.users.findOne({ username: username }, function (err, user) {
  //     if (err) deferred.reject(err.name + ': ' + err.message);

  //     if (user && bcrypt.compareSync(password, user.hash)) {
  //         // authentication successful
  //         deferred.resolve({
  //             _id: user._id,
  //             username: user.username,
  //             firstName: user.firstName,
  //             lastName: user.lastName,
  //             token: jwt.sign({ sub: user._id }, config.secret)
  //         });
  //     } else {
  //         console.log("fu");
  //         // authentication failed
  //         deferred.resolve();
  //     }
  // });

  return deferred.promise;
}

function getAll() {
  var deferred = Q.defer();

  db.users.find().toArray(function (err, users) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    // return users (without hashed passwords)
    users = _.map(users, function (user) {
      return _.omit(user, 'hash');
    });

    deferred.resolve(users);
  });

  return deferred.promise;
}

function getById(_id) {
  var deferred = Q.defer();

  db.users.findById(_id, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user) {
      // return user (without hashed password)
      deferred.resolve(_.omit(user, 'hash'));
    } else {
      // user not found
      deferred.resolve();
    }
  });

  return deferred.promise;
}

function create(userParam) {
  var deferred = Q.defer();

  // validation
  db.users.findOne({
      username: userParam.username
    },
    function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user) {
        // username already exists
        deferred.reject('Username "' + userParam.username + '" is already taken');
      } else {
        createUser();
      }
    });

  function createUser() {
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');

    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    db.users.insert(
      user,
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        deferred.resolve();
      });
  }

  return deferred.promise;
}
