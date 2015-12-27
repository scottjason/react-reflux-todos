'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');
var actions = require('../actions');
var Header = require('../components/Header.js');
var Navigation = require('react-router').Navigation;

var TodoStore = require('../stores/TodoStore.js');

module.exports = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin],  
  getInitialState: function() {
    return { items: [], userId: this.props.params.userId, token: this.props.params.token };
  },  
  componentDidMount: function() {
    this.listenTo(TodoStore, this.handleStateChange);
    actions.getItems();
  },  
  handleStateChange: function(func, data) {
    var cb = this[func];
    if (typeof cb === 'function') {
      cb(data);
    }
  },
  itemsReceived: function(items) {
    this.setState({ items: items });
    console.log("items receieved", this.state.items);
  },
  render: function() {
    return ( 
    <div styles={styles.container}>
      <Header />
    </div>
    )
  }
});

var styles = StyleSheet.create({
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