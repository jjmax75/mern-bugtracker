var React = require('react');
var $ = require('jquery');
var Link = require('react-router').Link;
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;

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
        <Panel>
          <FormGroup>
            <ControlLabel htmlFor="status">Status</ControlLabel>
            <FormControl type="text" id="status" value={this.state.status} onChange={this.handleStatusChange}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="priority">Priority</ControlLabel>
            <FormControl type="text" id="priority" value={this.state.priority} onChange={this.handlePriorityChange}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="owner">Owner</ControlLabel>
            <FormControl type="text" id="owner" value={this.state.owner} onChange={this.handleOwnerChange}></FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel htmlFor="title">Title</ControlLabel>
            <FormControl type="text" id="title" value={this.state.title} onChange={this.handleTitleChange}></FormControl>
          </FormGroup>
          <p><Button bsStyle="primary" onClick={this.handleSubmit}>Edit Bug</Button> | <Link to="/bugs">Back</Link></p>
        </Panel>
      </form>
    );
  }
});

module.exports = BugEdit;
