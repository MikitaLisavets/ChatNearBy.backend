const Mongo = require('../mongo');
const passwordHash = require('password-hash');
const CONFIG = require('../config');

class Users {
  constructor() {
    this.IS_LOGGED = '/isLogged'
    this.LOGIN = '/login'
    this.LOGOUT = '/logout'
    this.SIGNUP = '/signup'
  }

  isLogged(req, res) {
    let cookies = req.cookies;

    console.log(cookies);

    if ( !cookies || !cookies[CONFIG.AUTH_COOKIE]) {
      res.status(401).end();
    }

    Mongo.db.collection('users').findOne({"_id": Mongo.ObjectId(cookies[CONFIG.AUTH_COOKIE])}, (err, result) => {
      if (result) {
        res.json(result);
      } else {
        res.clearCookie(CONFIG.AUTH_COOKIE);
        res.status(401).end();
      }
    });
  }

  login(req, res) {
    let params = req.body;

    if (!params) {
      res.status(500).end();
    }

    let password = passwordHash.generate(params.password);

    Mongo.db.collection('users').findOne({"password": password}, (err, result) => {
      if (result) {
        res.cookie(CONFIG.AUTH_COOKIE, result._id);
        res.json(result);
      } else {
        res.status(401).end();
      }
    });
  }

  logout(req, res) {
    res.clearCookie(CONFIG.AUTH_COOKIE);
    res.status(200).end();
  }

  signup(req, res) {
    let params = req.body;

    if (!params) {
      res.status(500).end();
    }

    let password = passwordHash.generate(params.password);

    Mongo.db.collection('users').findOne({"password": password}, (err, result) => {
      if (result) {
        res.status(500).end();
      }

      Mongo.db.collection('users').insert({
        login: params.login,
        password: password
      }, (err, data) => {
        res.cookie(CONFIG.AUTH_COOKIE, result._id);
        res.json(data.result);
      });
    });

  }

};

module.exports = new Users();