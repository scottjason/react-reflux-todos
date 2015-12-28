var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');
var userCtrl = require('../controllers/user');
var todoCtrl = require('../controllers/todo');

module.exports = function(app) {

  router.get('/', indexCtrl.render);  
  router.get('/isAuthenticated/:userId/:token', userCtrl.isAuthenticated);  

  router.post('/signup', userCtrl.signup);
  router.post('/login', userCtrl.login);

  router.post('/create', todoCtrl.isAuthenticated, todoCtrl.create);
  router.post('/update', todoCtrl.isAuthenticated, todoCtrl.update);
  router.post('/delete', todoCtrl.isAuthenticated, todoCtrl.delete);

  router.get('/*', indexCtrl.redirect);

  app.use(router);
};
