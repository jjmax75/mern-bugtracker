var React = require('react');
var ReactDOM = require('react-dom');
var BugList = require('./BugList.js');

ReactDOM.render(
  <BugList url='/api/bugs' />,
  document.getElementById('main')
);
