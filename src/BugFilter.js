var React = require('react');

var BugFilter = React.createClass({

  getInitialState: function() {
    return {
      priority: this.props.location.priority,
      status: this.props.location.status
    };
  },

  handlePriorityChange: function(event) {
    this.setState({priority: event.target.value});
  },

  handleStatusChange: function(event) {
    this.setState({status: event.target.value});
  },

  handleClick: function() {
    this.props.handleSubmit({status: this.state.status, priority: this.state.priority});
  },

  render: function() {
    return (
      <div className="bugFilter">
        <select name="priority" value={this.state.priority} onChange={this.handlePriorityChange}>
          <option value="">Filter by Priority...</option>
          <option value="manyana">Manyana</option>
          <option value="urgent">Urgent</option>
        </select>
        <select name="status" value={this.state.status} onChange={this.handleStatusChange}>
          <option value="">Filter by Status...</option>
          <option value="closed">Closed</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="uclosed">UClosed?</option>
        </select>
        <button onClick={this.handleClick}>Filter</button>
      </div>
    );
  }
});

module.exports = BugFilter;
