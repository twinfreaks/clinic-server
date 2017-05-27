var express = require('express');
var router = express.Router();
var User = require('../models/user');

module.exports = function(router){
    router.get('/', function (req, res) {
        User.find({patientData: { $ne: null }},function(err, doctor){
            res.send(doctor);
        });
    });
}

