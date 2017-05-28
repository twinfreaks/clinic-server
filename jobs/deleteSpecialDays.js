var mongoose = require('mongoose'),
    User = require('../models/user'),
    config = require('../config'),
    Agenda = require('agenda'),
    agenda = new Agenda({db: {address: config.db}}),
    _ = require('lodash'),
    moment = require('moment');

agenda.define('delete special dates', function (job, done) {

    console.log("******* scheduler DELETE PAST SPECIAL DATE " + new Date() + " *******");

    User.find({doctorData: {$ne: null}}, function (err, doctors) {
        var newSpec = [];
        _.forEach(doctors, function(doctor, index){
            if(typeof doctor.doctorData.specialDays != 'undefined'){      
                newSpec[index] = _.filter(doctor.doctorData.specialDays, function(date){        
                    if(moment(date.date).format() < moment().format()){
                        console.log('******* update doctor, date  - ' + doctor.username + ', ' + date.date + " *******");
                    }
                    return moment(date.date).format() > moment().format();
                });
            }
            User.update({_id: doctor._id}, {$set: {"doctorData.specialDays": newSpec[index]}}, function(err){
                if(err){
                    console.log(err);
                }
            });
      });
    })
    .then(function(){
        done();
    })  
});

agenda.on('ready', function () {
    agenda.every('1 week', 'delete special dates');
    agenda.start();
});

agenda.on('error', function (err) {
    console.log(err.toString());
});

module.exports = agenda;
