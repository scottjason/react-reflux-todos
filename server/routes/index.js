var express = require('express');
var router = express.Router();
var controller = require('../controllers/')

module.exports = function(app) {
  
  router.post('/signup', controller.signup);
  router.post('/login', controller.login);

  router.get('/', controller.render);  
  router.get('/isAuthenticated/:userId/:token', controller.isAuthenticated);
  
  router.post('/create', controller.isAuthenticated, controller.createItem);
  router.get('/read', controller.isAuthenticated, controller.getItems);  
  router.post('/update', controller.isAuthenticated, controller.updateItem);
  router.get('/delete', controller.isAuthenticated, controller.deleteItem);

  router.get('/*', controller.redirect);

  app.use(router);
};
