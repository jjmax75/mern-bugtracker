var bugs = [
  {
    id: "23401",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 1"
  },
  {
    id: "23696",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 2"
  }
];

var BugFilter = React.createClass({
  render: function() {
    return (
      <div className="bugFilter">
        Section for the filter component
      </div>
    );
  }
});

var BugAdd = React.createClass({
  render: function() {
    return (
      <div className="bugAdd">
        A form to add new bugs
      </div>
    );
  }
});

var BugRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td>{this.props.bug.id}</td>
        <td>{this.props.bug.status}</td>
        <td>{this.props.bug.priority}</td>
        <td>{this.props.bug.owner}</td>
        <td>{this.props.bug.title}</td>
      </tr>
    );
  }
});

var BugTable = React.createClass({
  render: function() {
    var bugRows = this.props.bugs.map((bug) => {
      return (
        <BugRow key={bug.id} bug={bug} />
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

        {bugRows}
      </table>
    );
  }
});

var BugList = React.createClass({
  render: function() {
    return (
      <div className="bugList">
        <h2>Bug Tracker</h2>
        <BugFilter />
        <hr />
        <BugTable bugs={this.props.bugs} />
        <hr />
        <BugAdd />
      </div>
    );
  }
});

ReactDOM.render(
  <BugList bugs={bugs} />,
  document.getElementById('main')
);
