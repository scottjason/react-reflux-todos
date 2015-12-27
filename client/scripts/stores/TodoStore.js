var Reflux = require('reflux');
var Api = require('../api/');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    this.listenTo(actions.setUser, this.setUser);
    this.listenTo(actions.getTodos, this.getTodos);
    this.listenTo(actions.logout, this.logout);
  },
  setUser: function(user) {
    this.state.user = user;
  },
  getTodos: function() {
    this.trigger('todosReceived', this.state.user.todos);
  },
  logout: function() {
    this.trigger('redirectOnLogout', {});
  }
});
