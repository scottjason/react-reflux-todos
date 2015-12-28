var User = require('../models/user');
var jwt = require('jsonwebtoken');
var async = require('async');
var bcrypt = require('bcrypt-nodejs');

var comparePassword = function(enteredPassword, hashedPassword, cb) {
  bcrypt.compare(enteredPassword, hashedPassword, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

exports.isAuthenticated = function(req, res, next) {
  jwt.verify(req.params.token, req.params.userId, function(err, decoded) {
    if (err) return res.status(401).send();
    res.status(200).send();
  });
};

exports.login = function(req, res, next) {
 async.waterfall([
    function(cb) {
      User.findOne({ email: req.body.email }).exec(cb);
    },
    function(user, cb) {
      if (!user) {
        res.status(401).send({ message: 'no user found' });
      } else {
        
        comparePassword(req.body.password, user.password, function(err, isMatch){
          if (err) return cb(err);
          if (!isMatch) return res.status(401).send({ message: 'invalid password'});
          cb(null, user);
        });
      }
    },
  ], function(err, user) {
    if (err) return next(err);
    var token = jwt.sign({ userId: user._id.toString() }, user._id.toString(), { expiresIn: 300 });
    user.password = undefined;
    res.status(200).send({ user: user, token: token });
  });
};

exports.signup = function(req, res, next) {
  async.waterfall([
    function(cb) {
      User.findOne({ email: req.body.email }).exec(cb);
    },
    function(user, cb) {
      if (user) {
        res.status(401).send({ message: 'exiting user' });
      } else {
        var user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.save(cb)
      }
    },
  ], function(err, user) {
    if (err) return next(err);
    var token = jwt.sign({ userId: user._id.toString() }, user._id.toString(), { expiresIn: 300 });
    user.password = undefined;
    res.status(200).send({ user: user, token: token });
  });
};