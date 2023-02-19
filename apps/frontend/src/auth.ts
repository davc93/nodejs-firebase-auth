import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";

const signUpEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
  
  return signOut(auth);
  
};

const google = () => {
  new GoogleAuthProvider();
};
const facebook = () => {};
const authObserver = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(`Logged ${uid}`)
      
      // ...
    } else {
      // User is signed out
      // ...
      console.log('you have to login')
      
    }
  });
};

export default {
  google,
  facebook,
  loginEmailAndPassword,
  signUpEmailAndPassword,
  logout,
  authObserver,
};
