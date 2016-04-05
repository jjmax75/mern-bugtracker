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

  app.get('/api/bugs', function(req, res) {
    var filter = {};
    req.query.priority ? filter.priority = req.query.priority : '';
    req.query.status ? filter.status = req.query.status : '';

    db.collection('bugs').find(filter).toArray(function(err, docs){
      if (err) console.error(err);
      res.json(docs);
    });
  });

  app.post('/api/bugs/', function(req, res) {
    var bug = req.body;
    db.collection('bugs').insertOne(bug, function(err, result){
      if (err) console.error(err);
      var id = result.insertedId;
      db.collection('bugs').find({_id: id}).limit(1).next(function(err, doc) {
        if (err) console.error(err);
        res.json(doc);
      });
    });
  });

  app.listen(3000, function() {
    console.log('Express app is listening on port 3000...');
  });
});
