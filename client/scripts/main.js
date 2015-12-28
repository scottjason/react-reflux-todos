var React = window.React = require('react');
var ReactDOM = require("react-dom");
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var Landing = require('./components/Landing');
var Todo = require('./components/Todo');

ReactDOM.render((
  <Router history={createBrowserHistory()}>
    <Route path='/' component={Landing}></Route>
    <Route path='/todos/:userId/:token' component={Todo}></Route>
  </Router>
), document.getElementById('main'));