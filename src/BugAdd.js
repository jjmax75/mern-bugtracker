var React = require('react');
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var FormControl = require('react-bootstrap').FormControl;
var FormGroup = require('react-bootstrap').FormGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;

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
          <p><Button bsStyle="primary" onClick={this.handleSubmit}>Add Bug</Button></p>
        </Panel>
      </form>
    );
  }
});

module.exports = BugAdd;
