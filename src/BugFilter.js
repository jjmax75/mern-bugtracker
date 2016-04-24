var React = require('react');
var Button = require('react-bootstrap').Button;
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormControl = require('react-bootstrap').FormControl;

var BugFilter = React.createClass({

  getInitialState: function() {
    return {
      priority: this.props.location.priority,
      status: this.props.location.status,
      expanded: false
    };
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.location.status === this.state.status && newProps.location.priority === this.state.priority) {
      return;
    } else {
      this.setState({status: newProps.location.status, priority: newProps.location.priority});
    }
  },

  handlePriorityChange: function(event) {
    this.setState({priority: event.target.value});
  },

  handleStatusChange: function(event) {
    this.setState({status: event.target.value});
  },

  handleClick: function() {
    // this.props.handleSubmit({status: this.state.status, priority: this.state.priority});
    var filter = {};
    if (this.state.priority) filter.priority = this.state.priority;
    if (this.state.status) filter.status = this.state.status;
    this.props.handleSubmit(filter);
  },

  togglePanel: function() {
    this.setState({expanded: !this.state.expanded});
  },

  render: function() {
    return (
      <div className="bugFilter">
        <Panel header="Filters (click to expand...)" onClick={this.togglePanel}></Panel>
        <Panel collapsible expanded={this.state.expanded}>
          <Grid>
            <Row>
              <Col sm={12} md={3}>
                <FormControl componentClass="select" placeholder="select" name="priority" value={this.state.priority} onChange={this.handlePriorityChange}>
                  <option value="">Filter by Priority...</option>
                  <option value="manyana">Manyana</option>
                  <option value="urgent">Urgent</option>
                </FormControl>
              </Col>
              <Col sm={12} md={3}>
                <FormControl componentClass="select" placeholder="select" name="status" value={this.state.status} onChange={this.handleStatusChange}>
                  <option value="">Filter by Status...</option>
                  <option value="closed">Closed</option>
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="uclosed">UClosed?</option>
                </FormControl>
              </Col>
              <Col sm={12} md={3}>
                <Button bsStyle="primary" onClick={this.handleClick}>Filter</Button>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
});

module.exports = BugFilter;
