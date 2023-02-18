const {googleApplicationCredentials} = require('../config')
const { applicationDefault, initializeApp} = require('firebase-admin/app')
const initFirebase = () => {
  initializeApp({
    credential: applicationDefault()
})  
}

initFirebase()
export {
  initFirebase
}
