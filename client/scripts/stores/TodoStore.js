var Reflux = require('reflux');
var Api = require('../api/');
var actions = require('../actions');

module.exports = Reflux.createStore({
  state: {},
  init: function() {
    this.listenTo(actions.setUser, this.setUser);
    this.listenTo(actions.getItems, this.getItems);
  },
  setUser: function(user) {
    this.state.user = user;
  },
  getItems: function() {
    this.trigger('itemsReceived', this.state.user.items);
  }
});
