const express = require('express');
const cors = require('cors');

const { initFirebase } = require('./firebase/init');
const { errorHandler } = require('./middlewares/error');
const profile = require('./routes/profile');
const recovery = require('./routes/recovery');

const createApp = () => {
  initFirebase()
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api/profile', profile);
  app.use('/api/recovery', recovery);
  app.use(errorHandler);
  return app;
};

module.exports = {
  createApp,
};
