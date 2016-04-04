var React = require('react');

var BugFilter = React.createClass({
  handleClick: function() {
    this.props.handleSubmit({status: 'open'});
  },

  render: function() {
    return (
      <div className="bugFilter">
        <button onClick={this.handleClick}>Filter</button>
      </div>
    );
  }
});

module.exports = BugFilter;
