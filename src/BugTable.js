var React = require('react');
var BugRow = require('./BugRow.js');
var Panel = require('react-bootstrap').Panel;
var Table = require('react-bootstrap').Table;

var BugTable = React.createClass({
  render: function() {
    var bugRows = this.props.bugs.map(function(bug) {
      return (
        <BugRow key={bug._id} bug={bug} />
      );
    });

    return (
      <Panel>
        <Table striped bordered className="bugTable">
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
        </Table>
      </Panel>
    );
  }
});

module.exports = BugTable;
