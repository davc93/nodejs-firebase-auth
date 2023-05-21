const { applicationDefault, initializeApp } = require("firebase-admin/app");
const { googleApplicationCredentials } = require("../config");

const initFirebase = () => {
  initializeApp({
    credential: applicationDefault(),
  });
  console.log("[firebase-admin]: firebase init succesfull");
};

module.exports = {
  initFirebase,
};
