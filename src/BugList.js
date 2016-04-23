var React = require('react');
var $ = require('jquery');

var BugFilter = require('./BugFilter.js');
var BugTable = require('./BugTable.js');
var BugAdd = require('./BugAdd.js');

var BugList = React.createClass({
  contextTypes: function() {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {bugs: []};
  },

  componentDidMount: function() {
    this.loadData({});
  },

  componentDidUpdate: function(oldProps) {
    var oldQuery = oldProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority && oldQuery.status === newQuery.status) {
      return;
    } else {
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, status: query.status};

    $.ajax({
      url: '/api/bugs/',
      data: filter,
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

  changeFilter: function(filter) {
    this.context.router.push({search: '?' + $.param(filter)});
    this.loadData(filter);
  },

  render: function() {
    return (
      <div className="bugList">
        <h2>Bug Tracker</h2>
        <BugFilter handleSubmit={this.changeFilter} location={this.props.location.query} />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <BugAdd addBug={this.addBug} />
      </div>
    );
  }
});

module.exports = BugList;
