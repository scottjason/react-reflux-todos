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

userSchema.pre('save', function(cb) {
  
  this.createdAt = (this.createdAt) ? this.createdAt : Date.now();
  this.updatedAt = Date.now();

  if (this.password) {
    var _this = this;
    if (!_this.isModified('password')) return cb();
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return cb(err);
      bcrypt.hash(_this.password, salt, null, function(err, hash) {
        if (err) return cb(err);
        _this.password = hash;
        return cb();
      });
    });
  } else {
    cb();
  }
});

userSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);