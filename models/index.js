var mongoose = require('mongoose'),
    User = require('./user'),
    Meeting = require('./meeting');
    config = require('../config'),
    passwordHash = require('password-hash');

module.exports = function () {
    'use strict';

    mongoose.connect(config.db);

    User.find().exec(function(err, users){
        if(users.length === 0){
            var patientId, doctorId;
            var userPatient = new User({
                username: 'patient',
                password: passwordHash.generate('patient', {algorithm: config.hashAlgorithm}),
                name: {
                    first: 'patient',
                    last: 'patient',
                    patronymic: 'patient'
                },
                dateOfBirth: new Date(),
                patientData: {
                    contacts: {
                        email: 'user@mail.com',
                        phoneNumber: '000000000'
                    },
                    address: {
                        street: 'street',
                        building: '1',
                        appartment: '1'
                    }
                }
            });

            var userDoctor = new User({
                username: 'doctor',
                password: passwordHash.generate('doctor', {algorithm: config.hashAlgorithm}),
                name: {
                    first: 'doctor',
                    last: 'doctor',
                    patronymic: 'doctor'
                },
                dateOfBirth: new Date(),
                doctorData: {
                    doctorType: [{
                        name: 'Therapist',
                        description: ''
                    }],
                    bio: 'doctor'
                }
            });

            var userAdmin = new User({
                username: 'admin',
                password: passwordHash.generate('admin', {algorithm: config.hashAlgorithm}),
                name: {
                    first: 'admin',
                    last: 'admin',
                    patronymic: 'admin'
                },
                dateOfBirth: new Date(),
                adminData: {admin: true}
            });

            userPatient.save(function(err, user){
                if(err){
                    console.log(err);
                } else {
                    patientId = user._id;
                    userDoctor.save(function(err, user){
                        if(err){
                            console.log(err);
                        } else {
                            doctorId = user._id;
                            var meeting = new Meeting({
                                doctor: doctorId,
                                patient: patientId,
                                date: new Date(),
                                slot: 1
                            });
                            meeting.save(function(err, m){
                                if(err){
                                    console.log(err);
                                }
                            });
                            userAdmin.save(function(err){
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    });
                }
            });     
        } 
    });  
};