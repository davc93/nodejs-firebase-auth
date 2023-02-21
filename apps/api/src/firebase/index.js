const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { googleApplicationCredentials } = require('../config');

const initFirebase = () => {
  initializeApp({
    credential: applicationDefault(),
  });
};

initFirebase();
export {
  initFirebase,
};
