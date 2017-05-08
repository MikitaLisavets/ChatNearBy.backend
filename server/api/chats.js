const Mongo = require('../mongo');
const CONFIG = require('../config');

class Chats {
  constructor() {
    this.GET_CHATS = '/getChats'
    this.ADD_CHAT = '/addChat'
    this.UPDATE_CHAT = '/updateChat'
    this.FIND_CHAT = '/findChat/:id'
    this.REMOVE_CHAT = '/removeChat'
  }

  getChats(req, res) {
    Mongo.db.collection('chats').find().toArray((err, result) => {
      res.json(result);
    });
  }

  addChat(req, res) {
    let params = req.body;
    let cookies = req.cookies;
    let now = Date.now();

    if ( !cookies || !cookies[CONFIG.AUTH_COOKIE]) {
      res.status(401).end();
    } else if (!params) {
      res.status(500).end();
    }

    Mongo.db.collection('chats').insert({
      title: params.title,
      lat: params.lat,
      lng: params.lng,
      owner: cookies[CONFIG.AUTH_COOKIE],
      createdAt: now,
      updatedAt: now,
      history: []
    }, (err, data) => {
      res.json(data.result);
    });
  }

  updateChat(req, res) {
    let params = req.body;
    let cookies = req.cookies;
    let now = Date.now();

    if ( !cookies || !cookies[CONFIG.AUTH_COOKIE]) {
      res.status(401).end();
    } else if (!params) {
      res.status(500).end();
    }

    Mongo.db.collection('chats').update({
      _id: Mongo.ObjectId(params.id)
    }, {
      $set: {
        updatedAt: now,
        history: params.history
      }
    }, (err, data) => {
      res.json(data.result);
    })
  }

  findChat(req, res) {
    let params = req.params;
    if (!params) {
      res.status(500).end();
    }
    Mongo.db.collection('chats').findOne({"_id": Mongo.ObjectId(params.id)}, (err, result) => {
      res.json(result);
    });
  }

  removeChat(req, res) {
    let params = req.body;
    let cookies = req.cookies;

    if ( !cookies || !cookies[CONFIG.AUTH_COOKIE]) {
      res.status(401).end();
    } else if (!params) {
      res.status(500).end();
    }

    Mongo.db.collection('chats').remove({
      _id: Mongo.ObjectId(params.id)
    }, (err, data) => {
      res.json(data.result);
    });
  }
};

module.exports = new Chats();