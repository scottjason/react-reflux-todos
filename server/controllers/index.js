var User = require('../models/user');
var async = require('async');
var jwt = require('jsonwebtoken');

exports.render = function(req, res, next) {
  res.render('index');
};

exports.redirect = function(req, res, next) {
  res.redirect('/');
};

exports.isAuthenticated = function(req, res, next) {
  jwt.verify(req.params.token, req.params.userId, function(err, decoded) {
  	if (err) return res.status(401).send();
  	res.status(200).send();
  });
};

exports.login = function(req, res, next) {

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
  	var token = jwt.sign({ userId: user._id.toString() }, user._id.toString(), { expiresIn: 300 } );  	
  	user.password = undefined;
    res.status(200).send({ user: user, token: token });
  });
};

exports.createItem = function(req, res, next) {

};

exports.getItems = function(req, res, next) {

};


exports.updateItem = function(req, res, next) {

};

exports.deleteItem = function(req, res, next) {

};
