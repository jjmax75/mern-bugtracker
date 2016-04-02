var React = require('react');

var BugAdd = React.createClass({

  getInitialState: function() {
    return {status: '', priority:'', owner: '', title: ''};
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var newBug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    };

    this.props.addBug(newBug);

    this.setState({status: '', priority: '', owner: '', title: ''});
  },

  handleStatusChange: function(e) {
    this.setState({status: e.target.value});
  },

  handlePriorityChange: function(e) {
    this.setState({priority: e.target.value});
  },

  handleOwnerChange: function(e) {
    this.setState({owner: e.target.value});
  },

  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },

  render: function() {
    return (
      <form className="bugAdd">
        <p>
          <label htmlFor="status">Status</label>
          <input type="text" id="status" value={this.state.status} onChange={this.handleStatusChange} />
        </p>
        <p>
          <label htmlFor="priority">Priority</label>
          <input type="text" id="priority" value={this.state.priority} onChange={this.handlePriorityChange} />
        </p>
        <p>
          <label htmlFor="owner">Owner</label>
          <input type="text" id="owner" value={this.state.owner} onChange={this.handleOwnerChange} />
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" value={this.state.title} onChange={this.handleTitleChange} />
        </p>
        <p><button onClick={this.handleSubmit}>Add Bug</button></p>
      </form>
    );
  }
});

module.exports = BugAdd;
