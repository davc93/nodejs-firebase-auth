const dotenv = require('dotenv')

dotenv.config()

const config = {
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  port: process.env.PORT,
};

module.exports = config;
