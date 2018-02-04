var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
  native_parser: true
});
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;

module.exports = service;

function authenticate(name, password) {
  var deferred = Q.defer();
  db.users.findOne({
    name: name
  }, function (err, user) {
    if (err) deferred.reject(err.name + ': ' + err.message);

    if (user && bcrypt.compareSync(password, user.hash)) {
      // authentication successful
      var date = new Date();
      date.setMonth(date.getMonth() + 1);
      deferred.resolve({
        _id: user._id,
        name: user.name,
        exp: date.getTime(),
        token: jwt.sign({
          _id: user._id,
          name: user.name,
        }, config.secret, {
          expiresIn: 60 * 43800
        })
      });
    } else {
      // authentication failed
      deferred.resolve();
    }
  });

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
      email: userParam.email
    },
    function (err, user) {
      if (err) deferred.reject(err.email + ': ' + err.message);

      if (user) {
        // username already exists
        deferred.reject('Email "' + userParam.email + '" is already taken');
      } else {
        createUser();
      }
    });

  function createUser() {
    // set user object to userParam without the cleartext password
    var user = _.omit(userParam, 'password');
    var user = _.omit(userParam, 'passwordConfirm');
    // add hashed password to user object
    user.hash = bcrypt.hashSync(userParam.password, 10);

    db.users.insert(
      user,
      function (err, doc) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        console.log("User Created");
        console.log(doc);
        deferred.resolve();
      });
  }

  return deferred.promise;
}
