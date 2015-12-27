var express = require('express');
var router = express.Router();
var controller = require('../controllers/')

module.exports = function(app) {
  router.get('/', controller.renderIndex);
  app.use(router);
};
