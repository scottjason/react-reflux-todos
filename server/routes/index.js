var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/index');
var todoCtrl = require('../controllers/todo');

module.exports = function(app) {

  router.get('/', indexCtrl.render);  
  router.get('/isAuthenticated/:userId/:token', indexCtrl.isAuthenticated);  

  router.post('/signup', indexCtrl.signup);
  router.post('/login', indexCtrl.login);

  router.post('/create', todoCtrl.isAuthenticated, todoCtrl.create);
  router.post('/update', todoCtrl.isAuthenticated, todoCtrl.update);
  router.post('/delete', todoCtrl.isAuthenticated, todoCtrl.delete);

  router.get('/*', indexCtrl.redirect);

  app.use(router);
};
