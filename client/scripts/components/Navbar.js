'use strict';

var StyleSheet = require('react-style');
var actions = require('../actions');

module.exports = React.createClass({ 
  render: function() {
    return (
      <div styles={styles.container}>
        <p styles={styles.logout} onClick={actions.logout}>LOGOUT</p>
      </div>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 60,
    top: 0,
    left: 0,
    padding: 0,    
    margin: 'auto',
    marginTop: 49,
    textAlign: 'right',
    zIndex: 3
  },
  logout: {
    position: 'relative',
    color: 'white',
    marginRight: 80,
    marginTop: 20,
    cursor: 'pointer'
  }
});