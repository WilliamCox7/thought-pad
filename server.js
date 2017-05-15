const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('mongodb');

const app = module.exports = express();
app.set('port', (process.env.PORT || 8080));
app.set('url', (process.env.MONGODB_URI || 'mongodb://localhost:27017/thoughtpad'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/getLiners', function(req, res) {
  MongoClient.connect(app.get('url'), function(err, db) {
    var liners = db.collection('liners').find();
    var data = [];
    liners.each(function(err, liner) {
      if (liner === null) {
        res.status(200).send(data);
        db.close();
      } else {
        data.push(liner);
      }
    });
  });
});

app.post('/setLiner', function(req, res) {
  MongoClient.connect(app.get('url'), function(err, db) {
    var liners = db.collection('liners');
    liners.insertOne(req.body, function(err, result) {
      res.status(200).send("Added Liner");
      db.close();
    });
  });
});

app.delete('/deleteLiner/:liner', function(req, res) {
  MongoClient.connect(app.get('url'), function(err, db) {
    var liners = db.collection('liners');
    liners.remove({liner: req.params.liner}, function(err, result) {
      res.status(200).send("Removed Liner");
      db.close();
    });
  });
});

app.listen(app.get('port'), function() {
  console.log('port ' + app.get('port') + ' is listening');
});
