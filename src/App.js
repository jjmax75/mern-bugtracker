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
        <td>{this.props.bug._id}</td>
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
    return {bugs: []};
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({bugs: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  addBug: function(bug) {
    $.ajax({
      url: '/api/bugs/',
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(bug),
      success: function(data) {
        var bugsModified = this.state.bugs.concat(data);
        this.setState({bugs: bugsModified});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error('/api/bugs/', status, err.toString());
      }.bind(this)
    });
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
  <BugList url='/api/bugs' />,
  document.getElementById('main')
);
