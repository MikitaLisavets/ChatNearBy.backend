const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const CONFIG = require('./config');

let mongoUrl = `mongodb://${CONFIG.MONGODB.S_LOGIN}:${CONFIG.MONGODB.S_PASSWORD}@${CONFIG.MONGODB.URL}`;
let state = {};

connect(mongoUrl, function() {

  app.get('/getChats', function (req, res) {
    let db = get();
    let chats = db.collection('chats').find().toArray(function(err, docs) {
      res.json(docs);
    })
  })


  app.listen(3000, function() {
    console.log('Listening on port 3000...')
  })

});


function connect(url, done) {
  if (state.db) return done()

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err)
    state.db = db
    done()
  })
};

function get() {
  return state.db
};

function close(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      if (err) return done(err);
      state.db = null
      done()
    })
  } else {
    done();
  }
};