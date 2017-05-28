var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var config = require('../config');

module.exports = function (router) {
  router.get('/', function (req, res) {
    User.find(function (err, users) {
      res.send(users);
    });
  });

  router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, users) {
      res.send(users);
    });
  });

  router.post('/', function (req, res) {

    var newUser;

    if (req.query.doctor) {
      newUser = new User({
        username: req.body.username,
        password: passwordHash.generate(req.body.password, {
          algorithm: config.hashAlgorithm
        }),
        photoUrl: req.body.photoUrl,
        name: {
          first: req.body.firstName,
          last: req.body.lastName,
          patronymic: req.body.patronymic
        },
        dateOfBirth: req.body.dateOfBirth,
        doctorData: {
          doctorType: req.body.doctorType,
          bio: req.body.bio
        }
      });
      newUser.save(function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    } else if (req.query.patient) {
      newUser = new User({
        username: req.body.username,
        password: passwordHash.generate(req.body.password, {
          algorithm: config.hashAlgorithm
        }),
        photoUrl: req.body.photoUrl,
        name: {
          first: req.body.firstName,
          last: req.body.lastName,
          patronymic: req.body.patronymic
        },
        dateOfBirth: req.body.dateOfBirth,
        patientData: {
          contacts: {
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
          },
          address: {
            street: req.body.street,
            building: req.body.building,
            appartment: req.body.appartment
          }
        }
      });
      newUser.save(function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    } else if (req.query.admin) {
      newUser = new User({
        username: req.body.username,
        password: passwordHash.generate(req.body.password, {
          algorithm: config.hashAlgorithm
        }),
        photoUrl: req.body.photoUrl,
        name: {
          first: req.body.firstName,
          last: req.body.lastName,
          patronymic: req.body.patronymic
        },
        dateOfBirth: req.body.dateOfBirth,
        adminData: req.body.adminData
      });
      newUser.save(function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.send(user);
        }
      });
    } else {
      res.send('must define role!');
    }

  });
}