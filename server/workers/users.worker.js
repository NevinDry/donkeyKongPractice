var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var userRepo = require('../repository/users.repository');

module.exports.authenticate = function (name, password) {
  return new Promise(function (resolve, reject) {
    userRepo.getOne(name)
      .then(function (user) {
        if (user && bcrypt.compareSync(password, user.hash)) {
          // authentication successful
          var date = new Date();
          date.setMonth(date.getMonth() + 1);
          resolve({
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
          resolve();
        }
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

module.exports.getById = function (id) {
  return new Promise(function (resolve, reject) {
    userRepo.getById(id)
      .then(function (user) {
        if (user) {
          // return user (without hashed password)
          resolve(_.omit(user, 'hash'));
        } else {
          // user not found
          resolve();
        }
      })
      .catch(function (err) {
        reject(err);
      });
  });
}

module.exports.create = function (user) {
  return new Promise(function (resolve, reject) {

    console.log(user);
    // validation
    if(user.password != user.passwordConfirm){
        reject('Password must match');
    }

    userRepo.getByEmail(user.email)
      .then(function (duplicateUser) {
        if (duplicateUser) {
          // username already exists
          reject('Email "' + user.email + '" is already taken');
        } else {
          // set user object to userParam without the cleartext password
          var cleanUser = user;
          _.omit(cleanUser, 'password');
          _.omit(cleanUser, 'passwordConfirm');
          // add hashed password to user object
          user.hash = bcrypt.hashSync(user.password, 10);
          userRepo.addUser(cleanUser).then(function (user) {
              resolve();
            })
            .catch(function (err) {
               reject(err);
            });
        }
      })
      .catch(function (err) {
        reject(err);
      });
  });
}