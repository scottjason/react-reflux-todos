var React = window.React = require('react');
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');
var Login = require('./components/Login.js');

window.debug = true;

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Login}></Route>
  </Router>
), document.getElementById('main'));