'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var mongo = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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

  var bugsCollection = db.collection('bugs');

  app.get('/api/bugs', function(req, res) {
    var filter = {};
    req.query.priority ? filter.priority = req.query.priority : '';
    req.query.status ? filter.status = req.query.status : '';

    bugsCollection.find(filter).toArray(function(err, docs){
      if (err) console.error(err);
      res.json(docs);
    });
  });

  app.get('/api/bug/:id', function(req, res) {
    bugsCollection.find({'_id': ObjectId(req.params.id)}).nextObject(function(err, doc) {
        if (err) console.error(err);
        res.json(doc);
      }
    );
  });

  app.put('/api/bug/:id', function(req, res) {
    bugsCollection.updateOne({'_id': ObjectId(req.params.id)}, req.body, {}, function(err, doc) {
      if (err) console.error(err);
      bugsCollection.find({'_id': ObjectId(req.params.id)}).nextObject(function(err, doc) {
          if (err) console.error(err);
          res.json(doc);
        }
      );
    });
  });

  app.post('/api/bugs/', function(req, res) {
    var bug = req.body;
    bugsCollection.insertOne(bug, function(err, result){
      if (err) console.error(err);
      var id = result.insertedId;
      bugsCollection.find({_id: id}).limit(1).next(function(err, doc) {
        if (err) console.error(err);
        res.json(doc);
      });
    });
  });

  app.listen(3000, function() {
    console.log('Express app is listening on port 3000...');
  });
});
