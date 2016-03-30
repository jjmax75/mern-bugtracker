'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/bugs';

var app = express();

mongo.connect(mongoURL, function(err, db) {
  if (err) {
    throw new Error('DB failed to connect');
  } else {
    console.log('Mongo DB successfuly connected on port 27017');
  }

  app.use(express.static(__dirname + '/static'));
  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('index.html');
  });

  app.get('/api/bugs', function(req, res) {
    db.collection('bugs').find().toArray(function(err, docs){
      res.json(docs);
    });
  });

  app.post('/api/bugs/', function(req, res) {
    var bug = req.body;
    var id = bugsData.length + 1;
    bug.id = id;
    res.json(req.body);
  });

  app.listen(3000, function() {
    console.log('Express app is listening on port 3000...');
  });
});
