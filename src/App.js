var React = require('react');
var ReactDOM = require('react-dom');

var BugList = require('./BugList.js');
var Error404 = require('./Error404.js');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path='/bugs' component={BugList} />
      <Redirect from='/' to='/bugs' />
      <Route path='*' component={Error404} />
    </Router>
  ), document.getElementById('main')
);
