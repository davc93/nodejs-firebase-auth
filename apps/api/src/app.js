const express = require('express');
const cors = require('cors');

const { initFirebase } = require('./firebase/');
const { errorHandler } = require('./middlewares/error.handler');
const profile = require('./routes/profile');
const recovery = require('./routes/recovery');

const users = require('./routes/users');
const { checkAuth } = require('./middlewares/auth.handler');

const createApp = () => {
  initFirebase()
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/profile',checkAuth, profile);
  app.use('/api/users',checkAuth, users);
  app.use('/api/recovery', recovery);

  app.use(errorHandler);
  return app;
};

module.exports = {
  createApp,
};
