var React = require('react');
var $ = require('jquery');

var BugFilter = require('./BugFilter.js');
var BugTable = require('./BugTable.js');
var BugAdd = require('./BugAdd.js');

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({bugs: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  addBug: function(bug) {
    $.ajax({
      url: '/api/bugs/',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(bug),
      success: function(data) {
        var bugsModified = this.state.bugs.concat(data);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/bugs/', status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="bugList">
        <h2>Bug Tracker</h2>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <BugAdd addBug={this.addBug} />
      </div>
    );
  }
});

module.exports = BugList;
