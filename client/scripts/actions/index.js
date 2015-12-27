var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'isAuthenticated',
  'setUser',
  'getItems',
  'toggleLanding',	
  'getLoginForm',
  'getSignupForm',
  'signup',
  'login',
  'logout'
]);
