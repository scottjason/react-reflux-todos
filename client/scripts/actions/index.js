var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'isAuthenticated',
  'setUser',
  'getTodos',
  'toggleLanding',	
  'getLoginForm',
  'getSignupForm',
  'signup',
  'login',
  'logout'
]);
