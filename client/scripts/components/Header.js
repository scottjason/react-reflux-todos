'use strict';

var StyleSheet = require('react-style');

module.exports = React.createClass({
  render: function() {
    return (
      <div styles={styles.container}>
        <p styles={styles.title}>React Todos</p>        
        <p styles={styles.subtitle}>React + Reflux, Todos and Authentication</p>        
        <div styles={styles.divider}></div> 	                	
      </div>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '450px',
    margin: 0,
    padding: 0
  },
  title: {
    position: 'relative',
    fontSize: '48px',
    margin: 0,
    color: '#fff',
    fontWeight: 300
  },
  subtitle: {
    position: 'relative',
    fontSize: '18px',
    margin: 0,
    color: '#fff'
  },
  divider: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: '450px',
    height: '1px',
    backgroundColor: 'rgba(225, 225, 225, .6)',
    margin: 'auto',
    marginTop: 10,
  }
});