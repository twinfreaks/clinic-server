var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var config = require('../config');

module.exports = function (router) {
  router.post('/', function (req, res) {
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      if (!user) {
        res.send({
          error: "wrong username"
        });
      } else if (passwordHash.verify(req.body.password, user.password)) {
        res.send(user);
      } else {
        res.send({
          error: "wrong password"
        });
      }
    });
  });

}