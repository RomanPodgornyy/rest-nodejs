const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const config = require('./config');

const userModule = require('./modules/auth');
const infoModule = require('./modules/info');
const logoutModule = require('./modules/logout');
const fileModule = require('./modules/file');

const dbService = require('./services/database');
const middlewares = require('./middlewares');

function App() {
  dbService.connect((error) => {
    if (error) {
      throw error;
    }

    console.log('DB Connected!');
  });

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use('/', userModule);
  app.use(middlewares.authenticateToken);
  app.use('/info', infoModule);
  app.use('/logout', logoutModule);
  app.use('/file', fileModule);

  return app;
}

if (!module.parent) {
  App().listen(config.port);
}

module.exports = App;
