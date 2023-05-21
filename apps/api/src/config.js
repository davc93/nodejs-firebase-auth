const dotenv = require("dotenv");

const env = process.env.NODE_ENV ?? "dev";
const envs = {
  dev: ".env",
  e2e: ".env.e2e",
};

const options = {};

if (envs[env]) {
  options.path = envs[env];
}

dotenv.config(options);

const config = {
  env,
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  port: process.env.PORT ?? 3000,
  apikey:process.env.API_KEY
};
console.log(config);

module.exports = config;
