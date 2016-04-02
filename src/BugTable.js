var React = require('react');
var BugRow = require('./BugRow.js');

var BugTable = React.createClass({
  render: function() {
    var bugRows = this.props.bugs.map(function(bug) {
      return (
        <BugRow key={bug._id} bug={bug} />
      );
    });

    return (
      <table className="bugTable">
        <thead>
          <tr>
            <th>id</th>
            <th>status</th>
            <th>priority</th>
            <th>owner</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {bugRows}
        </tbody>
      </table>
    );
  }
});

module.exports = BugTable;
