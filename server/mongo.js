const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

class Mongo {
  constructor() {
    this.ObjectId = ObjectId;
  }
  connect(url, done) {
    if (this.db) return done();

    MongoClient.connect(url, (err, db) => {
      if (err) return done(err);
      this.db = db;
      done();
    })
  }
};

module.exports = new Mongo();