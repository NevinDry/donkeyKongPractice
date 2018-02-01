var config = require('../config.json');
var express = require('express');
var router = express.Router();
var userService = require('../services/users.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/current', getCurrent);

module.exports = router;

function authenticate(req, res) {
  userService.authenticate(req.body.name, req.body.password)
    .then(function (user) {
      if (user) {
        // authentication successful
        res.status(200).send({
          success: true,
          message: 'Login Success',
          data: user
        });
      } else {
        // authentication failed
        res.status(500).send({
          success: false,
          message: 'Username or password is incorrect'
        });
      }
    })
    .catch(function (err) {
      res.status(500).send({
          success: false,
          message: err
        });
    });
}

function register(req, res) {
  userService.create(req.body)
    .then(function () {
      res.status(200).send({
        success: true,
        message: 'Registration successful, Sign in now !'
      });
    })
    .catch(function (err) {
      return res.status(500).send({
        success: false,
        message: err
      });
    });
}


function getCurrent(req, res) {
  userService.getById(req.user.sub)
    .then(function (user) {
      if (user) {
        res.send(user);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(function (err) {
      res.status(400).send(err);
    });
}
