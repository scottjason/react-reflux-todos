var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var toLower = function toLower(str) {
  return str.toLowerCase();
};

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    set: toLower
  },
  password: {
    type: String
  },
  items: {
    default: [],
    type: Array
  },
  createdAt: {
    type: Number
  },
  updatedAt: {
    type: Number
  }
});

module.exports = mongoose.model('User', userSchema);