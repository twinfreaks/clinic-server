var express = require('express');
var router = express.Router();
var Meeting = require('../models/meeting');

module.exports = function (router) {
  
  router.get('/', function (req, res) {
    if (req.query.doctorId !== undefined) {
      Meeting.find({
               doctorId: req.query.doctorId
             })
             .populate('doctor').populate('patient')
             .exec(function (err, meeting) {
               res.send(meeting);
             });
    } else if (req.query.patientId !== undefined) {
      Meeting.find({
        patientId: req.query.patientId
      })
          .populate('doctor').populate('patient')
          .exec(function (err, meeting) {
            res.send(meeting);
          })
    } else {
      Meeting.find().populate('doctor').populate('patient').exec(function (err, meeting) {
        res.send(meeting);
      });
    }
  });
  
  router.get('/:id', function (req, res) {
    Meeting.findById(req.params.id).populate('doctor').populate('patient').exec(function (err, meeting) {
      res.send(meeting);
    });
  });
  
  router.post('/', function (req, res) {
    var newMeeting;
      newMeeting = new Meeting({
        patient: req.body.patient,
        doctor: req.body.doctor,
        date: req.body.date,
        slot: req.body.slot,
        patientId: req.body.patientId,
        doctorId: req.body.doctorId
      });
      newMeeting.save(function (err, meeting) {
        if (err) {
          res.send(err);
        } else {
          res.send(meeting);
        }
      });
  });
};

