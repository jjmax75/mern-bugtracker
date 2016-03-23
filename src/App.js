var bugsData = [
  {
    id: "1",
    status: "pending",
    priority: "manyana",
    owner: "Sean",
    title: "testy bug 1"
  },
  {
    id: "2",
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
      <form className="bugAdd">
        <p>
          <label htmlFor="status">Status</label>
          <input type="text" id="status" />
        </p>
        <p>
          <label htmlFor="priority">Priority</label>
          <input type="text" id="priority" />
        </p>
        <p>
          <label htmlFor="owner">Owner</label>
          <input type="text" id="owner" />
        </p>
        <p>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </p>
      </form>
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
        <tbody>
          {bugRows}
        </tbody>
      </table>
    );
  }
});

var BugList = React.createClass({
  getInitialState: function() {
    return {bugs: bugsData};
  },

  handleClick: function() {
    let addedBugData = {id: "3", status: "pending", priority: "manyana", owner: "Sean", title: "testy bug 3"};
    this.addBug(addedBugData);
  },

  addBug: function(bug) {
    let bugs = this.state.bugs.slice(); // make a copy of the bugs, don't modify state
    bugs.push(bug);
    this.setState({bugs: bugs});
  },

  render: function() {
    return (
      <div className="bugList">
        <h2>Bug Tracker</h2>
        <BugFilter />
        <hr />
        <BugTable bugs={this.state.bugs} />
        <hr />
        <BugAdd />
        <hr />
        <button onClick={this.handleClick}>Add a Bug</button>
      </div>
    );
  }
});

ReactDOM.render(
  <BugList bugs={bugsData} />,
  document.getElementById('main')
);
