var React = require('react');

var Error404 = React.createClass({
  render: function(){
    return(
      <div className="Error404">
        <h1>Page not found</h1>
      </div>
    );
  }
});

module.exports = Error404;
