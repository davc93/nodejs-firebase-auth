const { applicationDefault, initializeApp } = require('firebase-admin/app');
const { googleApplicationCredentials } = require('../config');

const initFirebase = () => {

  try {
    const response = initializeApp({
      credential: applicationDefault(),
    });
    console.log("[firebase-admin]: firebase init succesfull")
    console.log(response)    
  } catch (error) {
    console.error("[firebase-admin]",error)
  }

};

export {
  initFirebase,
};
