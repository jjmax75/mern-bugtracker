'use strict';

var express = require('express');

var app = express();

app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.send('index.html');
});

app.listen(3000, function() {
  console.log('Express app is listening on port 3000...');
});
