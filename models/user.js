var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  photoUrl: String,
  name: {
    first: String,
    last: String,
    patronymic: String
  },
  dateOfBirth: Date,
  patientData: {
    type: {
      contacts: {
        email: {
          type: String,
          unique: true
        },
        phoneNumber: {
          type: String,
          unique: true
        }
      },
      address: {
        street: String,
        building: String,
        appartment: String
      }
    },
    default: null
  },
  doctorData: {
    type: {
      doctorType: [{
        name: String,
        description: String
      }],
      bio: String,
      available: [{
        day: Number,
        slot: [Number]
      }],
      specialDays: [{
        date: Date,
        slot: [Number]
      }],
      isDeleted: {
        type: Boolean,
        default: false
      }
    },
    default: null
  },
  adminData: {
    type: {
      admin: Boolean
    },
    default: null
  }
});

module.exports = mongoose.model('user', UserSchema);