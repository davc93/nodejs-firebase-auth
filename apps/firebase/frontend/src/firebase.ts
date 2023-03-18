// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { config } from './config'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: config.firebaseApiKey,
  authDomain: "fir-auth-nodejs-6d763.firebaseapp.com",
  projectId: "fir-auth-nodejs-6d763",
  storageBucket: "fir-auth-nodejs-6d763.appspot.com",
  messagingSenderId: "730822438451",
  appId: "1:730822438451:web:5b896173d84ba173f93d46"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
