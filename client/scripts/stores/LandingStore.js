var Reflux = require('reflux');
var Api = require('../api/');
var actions = require('../actions');

module.exports = Reflux.createStore({
  init: function() {
    this.listenTo(actions.isAuthenticated, this.isAuthenticated);    
    this.listenTo(actions.toggleLanding, this.toggleLanding);    
    this.listenTo(actions.getLoginForm, this.getLoginForm);
    this.listenTo(actions.getSignupForm, this.getSignupForm);
    this.listenTo(actions.signup, this.signup);
  },
  isAuthenticated: function(userId, token) {
    var url = '/isAuthenticated/' + userId + '/' + token;
    Api.get(url, function(err, response){
      this.trigger('handleAuthResponse', response);
    }.bind(this));
  },
  toggleLanding: function() {
    this.trigger('toggleLandingOpt', {});
  },
  getEmail: function() {
    return document.getElementById('email').value;
  },
  getPassword: function() {
    return document.getElementById('password').value;
  },
  isEmailValid: function(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  },
  isPasswordValid: function(password) {
    return (password && password.length >= 4 && password.length <= 12);
  },
  getLoginForm: function() {
    var opts = {};
    opts.email = this.getEmail();
    opts.password = this.getPassword();
    opts.isEmailValid = (opts.email.length) ? this.isEmailValid(opts.email) : false;
    opts.isPasswordValid = (opts.password.length) ? this.isPasswordValid(opts.password) : false;
    this.trigger('handleLogin', opts);
  },
  getSignupForm: function() {
    var opts = {};
    opts.email = this.getEmail();
    opts.password = this.getPassword();
    opts.isEmailValid = (opts.email.length) ? this.isEmailValid(opts.email) : false;
    opts.isPasswordValid = (opts.password.length) ? this.isPasswordValid(opts.password) : false;
    this.trigger('handleSignup', opts);
  },
  signup: function(opts) {
    Api.post(opts, function(err, response){
      this.trigger('handleSignupResponse', response);
    }.bind(this));
  }
});
