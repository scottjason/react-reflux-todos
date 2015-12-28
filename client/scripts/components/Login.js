'use strict';

var StyleSheet = require('react-style');
var actions = require('../actions');

module.exports = React.createClass({
  render: function() {
    return (        
    <div styles={styles.formContainer}>
      <input id='email' styles={[styles.input, styles.firstInput]} type='text' placeholder='ENTER EMAIL' />
      <input id='password' styles={styles.input} type='password' placeholder='ENTER PASSWORD' />
      <div styles={styles.button} onClick={actions.getLoginForm}>
        <p styles={styles.loginCopy}>LOGIN</p>
      </div>
      <p styles={styles.signupOpt} onClick={actions.toggleLanding}>need an account?</p>               
    </div>
    )
  }
});

var styles = StyleSheet.create({
  formContainer: {
    position: 'relative',
    margin: 'auto',
    marginTop: 25,
    width: 250,
    height: 65
  },
  input: {
  	position: 'relative',
    width: 250,
    height: 30,
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(225, 225, 225, .6)',
    padding: 7,
    outline: 0,
    color: 'rgba(225, 225, 225, 1)',
    fontSize: 13
  },
  firstInput: {
    marginBottom: 5,
    marginTop: 10
  },
  button: {
    position: 'relative',
    margin: 'auto',
    marginBottom: 0,
    textAlign: 'center',
    backgroundColor: 'transparent',
    height: 40,
    width: 200,
    marginTop: 36,
    borderRadius: 5,
    border: '1px solid rgba(225, 225, 225, .9)',
    cursor: 'pointer'
  },
  loginCopy: {
    position: 'relative',
    color: 'rgba(225, 225, 225, .9)',
    fontSize: 18,
    marginTop: 7.4,
    marginBottom: 0
  },
  signupOpt: {
  	position: 'relative',
  	color: 'rgba(225, 225, 225, .9)',
  	cursor: 'pointer'
  }
});