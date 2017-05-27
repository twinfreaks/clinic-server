var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var config = require('../config');

module.exports = function (router) {
    router.get('/', function (req, res) {
        User.find({
            $and: [{
                doctorData: {
                    $ne: null
                }
            }, {
                "doctorData.isDeleted": {
                    $ne: true
                }
            }]
        }, { password: 0 }, function (err, doctor) {
            res.send(doctor);
        });
    });
    router.put('/:id', function (req, res) {

        if (typeof req.body.delete != 'undefined' && req.body.delete === true) {
            User.update({
                _id: req.params.id
            }, {
                    $set: {
                        "doctorData.isDeleted": true
                    }
                }, function (err, updatedDoctor) {
                    if (err) {
                        res.send(err);
                    }
                    res.send({
                        message: 'Deleted',
                        data: updatedDoctor
                    });
                });
        } else {
            User.findById(req.params.id, function (err, doctor) {
                if (err) {
                    res.send(err);
                }
                doctor.username = (req.body.username) ? req.body.username : doctor.username;
                doctor.password = (req.body.password) ? passwordHash.generate(req.body.password, {
                    algorithm: config.hashAlgorithm
                }) : doctor.password;
                doctor.name.first = (req.body.firstName) ? req.body.firstName : doctor.name.first;
                doctor.name.last = (req.body.lastName) ? req.body.lastName : doctor.name.last;
                doctor.name.patronymic = (req.body.patronymic) ? req.body.patronymic : doctor.name.patronymic;
                doctor.dateOfBirth = (req.body.dateOfBirth) ? req.body.dateOfBirth : doctor.dateOfBirth;
                doctor.photoUrl = (req.body.photoUrl) ? req.body.photoUrl : doctor.photoUrl;
                doctor.doctorData.bio = (req.body.bio) ? req.body.bio : doctor.doctorData.bio;
                doctor.doctorData.doctorType = (req.body.doctorType) ? req.body.doctorType : doctor.doctorData.doctorType;
                doctor.doctorData.available = (req.body.available) ? req.body.available : doctor.doctorData.available;

                User.update({
                    _id: req.params.id
                }, {
                        $set: {
                            "username": doctor.username,
                            "password": doctor.password,
                            "name.first": doctor.name.first,
                            "name.last": doctor.name.last,
                            "name.patronymic": doctor.name.patronymic,
                            "dateOfBirth": doctor.dateOfBirth,
                            "doctorData.bio": doctor.doctorData.bio,
                            "doctorData.doctorType": doctor.doctorData.doctorType,
                            "doctorData.available": doctor.doctorData.available,
                            "photoUrl": doctor.photoUrl
                        }
                    }, function (err) {
                        if (err) {
                            res.send(err);
                        }
                        User.findById(req.params.id, function (err, doctor) {
                            res.send(doctor);
                        });
                    });
            });
        }
    })
}