const app = require('./app');
const CONFIG = require('./config');
const Mongo = require('./mongo');

let mongoUrl = `mongodb://${CONFIG.MONGODB.S_LOGIN}:${CONFIG.MONGODB.S_PASSWORD}@${CONFIG.MONGODB.URL}`;

Mongo.connect(mongoUrl, () => {
  console.log('MondoDB connected')

  app.listen(3000, () => {
    console.log('Listening on port 3000...')
  });
});