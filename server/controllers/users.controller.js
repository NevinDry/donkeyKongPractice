var userWorker = require('../workers/users.worker');
var HttpResponses = require('../models/HttpResponses');


module.exports.authenticate = function (req, res, next) {
  userWorker.authenticate(req.body.name, req.body.password)
    .then(function (user) {
      if (user) {
        // authentication successful
        next(new HttpResponses.HttpSucces(true, 200, 'Login Success', user));
      } else {
        // authentication failed
        next(new HttpResponses.HttpError('Username or password is incorrect', null, 500));
      }
    })
    .catch(function (err) {
      next(new HttpResponses.HttpError('Error authenticating user', null, 500));
    });
}

module.exports.register = function (req, res, next) {
  userWorker.create(req.body)
    .then(function () {
      next(new HttpResponses.HttpSucces(true, 200, 'Registration successful, Sign in now !', null));
    })
    .catch(function (err) {
      next(new HttpResponses.HttpError('Error creating user', err, 500));
    });
}


module.exports.getCurrent = function (req, res, next) {
  userWorker.getById(req.user.sub)
    .then(function (user) {
      if (user) {
        next(new HttpResponses.HttpSucces(true, 200, 'Got user', user));
      } else {
        next(new HttpResponses.HttpError('Error getting user', null, 500));
      }
    })
    .catch(function (err) {
      next(new HttpResponses.HttpError('Error getting user', null, 500));
    });
}