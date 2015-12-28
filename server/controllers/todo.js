var User = require('../models/user');
var async = require('async');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

exports.isAuthenticated = function(req, res, next) {
  jwt.verify(req.params.token, req.params.userId, function(err, decoded) {
    if (err) return res.redirect('/');
    next();
  });
};

exports.create = function(req, res, next) {
  async.waterfall([
    function(cb) {
      User.findById(req.body._id).exec(cb);
    },
    function(user, cb) {
      if (!user) {
        res.redirect('/');
      } else {
        user.todos.push(req.body.todo);
        user.save(cb)
      }
    },
  ], function(err, user) {
    if (err) return next(err);
    user.password = undefined;
    res.status(200).send(user);
  });
};

exports.update = function(req, res, next) {
  async.waterfall([
    function(cb) {
      User.findById(req.body._id).exec(cb);
    },
    function(user, cb) {
      if (!user) {
        res.redirect('/');
      } else {
        _.forEach(user.todos, function(todo, i) {
          var isMatch = todo.id === req.body.todo.id;
          if (isMatch) {
            user.todos[i] = req.body.todo;
          }
        });
        user.save(cb)
      }
    },
  ], function(err, user) {
    if (err) return next(err);
    user.password = undefined;
    res.status(200).send(user);
  });
};

exports.delete = function(req, res, next) {
  async.waterfall([
    function(cb) {
      User.findById(req.body._id).exec(cb);
    },
    function(user, cb) {
      if (!user) {
        res.redirect('/');
      } else {
        _.forEach(user.todos, function(todo, i) {
          var isMatch = todo.id === req.body.todo.id;
          if (isMatch) {
            user.todos.splice(i, 1);
          }
        });
        user.save(cb)
      }
    },
  ], function(err, user) {
    if (err) return next(err);
    user.password = undefined;
    res.status(200).send(user);
  });
};
