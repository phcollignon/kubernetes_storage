var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var mongodb = require('mongodb');

var MONGODB_USERNAME = process.env["MONGODB_USERNAME"];
var MONGODB_PASSWORD = process.env["MONGODB_PASSWORD"];
var MONGODB_HOST = process.env["MONGODB_HOST"];
var MONGODB_DB_NAME = process.env["MONGODB_DB_NAME"];
var MONGODB_DB_PARAM = process.env["MONGODB_DB_PARAM"];

var mongodb_uri = "mongodb://"
if(MONGODB_USERNAME!="") { mongodb_uri = mongodb_uri + MONGODB_USERNAME +":"+ MONGODB_PASSWORD + "@" }
var MONGODB_DB_PARAM = process.env["MONGODB_DB_PARAM"];
mongodb_uri = mongodb_uri + MONGODB_HOST + "/" +  MONGODB_DB_NAME + "?" + MONGODB_DB_PARAM

var mongoClient = mongodb.MongoClient;


var collection;
var db = mongoClient.connect(mongodb_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function (err, db) {
  if (err)
    throw err;
  console.log("Connected to the mongoDB !");
  collection = db.db('guestbook').collection('greetings');
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.get('/guestbook', function (req, res) {
  collection.find().sort({ _id: -1 }).toArray((err, guestbook) => {
    res.send(guestbook);
  })
});

app.post('/guestbook', function (req, res) {
  if (!req.body) {
    res.statusCode = 400;
    return res.send('Error 400: Post syntax incorrect.');
  }
  var newGreeting = req.body;
  collection.insertOne(newGreeting, (err, greeting) => {
    if (err) console.log(err);
    res.send(greeting);
  })
});

app.listen(3000, function () {
  console.log('Guestbook API listening on port 3000!')
});
