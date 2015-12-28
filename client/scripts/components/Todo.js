'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');
var Navigation = require('react-router').Navigation;

var Header = require('../components/Header.js');
var TodoStore = require('../stores/TodoStore.js');
var Navbar = require('../components/Navbar.js');

var _ = require('lodash');
var actions = require('../actions');

module.exports = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],  
  getInitialState: function() {
    return { userId: this.props.params.userId, token: this.props.params.token };
  },  
  componentDidMount: function() {
    this.listenTo(TodoStore, this.handleStateChange);
    actions.getTodos();
  },  
  handleStateChange: function(func, data) {
    var cb = this[func];
    if (typeof cb === 'function') {
      cb(data);
    }
  },
  todosReceived: function(todos) {
    this.setState({ todos: todos });
  },
  redirectOnLogout: function() {
    localStorage.clear();
    window.location.href = (window.location.href.indexOf("localhost") > -1) ? 'http://localhost:3000/' : 'https://react-reflux-todos.herokuapp.com/';
  },
  render: function() {
    return ( 
    <div styles={styles.wrapper}>
      <Navbar />
      <div styles={styles.container}>
        <Header />
      </div>
    </div>
    )
  }
});

var styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%'
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 180,
    margin: 'auto',
    width: '450px',
    height: '250px',
    textAlign: 'center',
  } 
});