'use strict';

var Reflux = require('reflux');
var StyleSheet = require('react-style');
var Navigation = require('react-router').Navigation;
var LocalStorageMixin = require('react-localstorage');

var Header = require('../components/Header.js');
var Login = require('../components/Login.js');
var Signup = require('../components/Signup.js');

var LandingStore = require('../stores/LandingStore.js');
var TodoStore = require('../stores/TodoStore.js');

var actions = require('../actions');

module.exports = React.createClass({
  mixins: [Navigation, Reflux.ListenerMixin, LocalStorageMixin],
  getInitialState: function() {
	 return { isAuthenticated: false, isToggled: false };
  },  
  componentDidMount: function() {
    this.listenTo(LandingStore, this.handleStateChange);
    var _this = this;    
    setTimeout(function(){
      _this.isSynced();
    }, 100);
  },
  isSynced: function() {
    if (this.state.user && typeof this.state.user === 'object' && this.state.user._id && this.state.token && typeof this.state.token === 'string') {
      actions.isAuthenticated(this.state.user._id, this.state.token);
    }
  },
  handleStateChange: function(func, data) {
  	var cb = this[func];
  	if (typeof cb === 'function') {
  	  cb(data);
  	}
  },
  toggleLandingOpt: function() {
    this.setState({ isToggled: !this.state.isToggled });
  },
  handleLogin: function(data) {
    console.log('handleLogin', data);
  },
  handleSignup: function(data) {
    var isValid = data.isEmailValid && data.isPasswordValid;
    if (isValid) {
      console.log('set state to creating account');
      data.url = '/signup';
      actions.signup(data);
    } else {
      console.log("set state to invalid form");
    }
  },
  handleAuthResponse: function(response) {
  if (response.status === 200) {
      actions.setUser(this.state.user);
      var url = '/todos/' + this.state.user._id + '/' + this.state.token;
      this.props.history.pushState(null, url);
    } else {
      console.log(401);
      this.setState({ user: null });
      this.setState({ token: null});
    }
  },
  handleLoginResponse: function(response) {
    var user = response.user;
    actions.isAuthenticated(user._id, response.token);
  },
  handleSignupResponse: function(response) {
    if (response.user && response.token) {
      this.setState({ user: response.user });
      this.setState({ token: response.token });
      var url = '/todos/' + this.state.user._id + '/' + this.state.token;
      this.props.history.pushState(null, url);
    } else {
      console.log("bad signup", response);
    }
  },
  render: function() {
    return (
      <div styles={styles.container}>
        <Header />
 		   { this.state.isToggled ? <Signup /> :  <Login /> }        	                	
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
    marginTop: 10
  }
});