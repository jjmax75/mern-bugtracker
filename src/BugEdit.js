var React = require('react');
var $ = require('jquery');

var BugEdit = React.createClass({

  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this.loadData();
    }
  },

  loadData: function() {
    $.ajax({
      url: '/api/bug/' + this.props.params.id,
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var updatedBug = {
      status: this.state.status,
      priority: this.state.priority,
      owner: this.state.owner,
      title: this.state.title
    };

    $.ajax({
      url: '/api/bug/' + this.props.params.id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(updatedBug),
      dataType: 'json',
      success: function(data) {
        this.setState(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });

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
      <form className="bugEdit">
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
        <p><button onClick={this.handleSubmit}>Edit Bug</button></p>
      </form>
    );
  }
});

module.exports = BugEdit;
