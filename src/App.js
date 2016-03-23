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
    var bugRows = this.props.bugs.map(function(bug) {
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

  addBug: function(bug) {
    var bugs = this.state.bugs.slice(); // make a copy of the bugs, don't modify state
    bug.id = this.state.bugs.length + 1;
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
        <BugAdd addBug={this.addBug} />
      </div>
    );
  }
});

ReactDOM.render(
  <BugList bugs={bugsData} />,
  document.getElementById('main')
);
