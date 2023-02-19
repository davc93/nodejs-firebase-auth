import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "./firebase";
import { setElements } from "./navigation";
import { globalUser } from "./main";

const signUpEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};
const sendVerificationEmail = (user:any) => {
  return sendEmailVerification(user)
}

const logout = async () => {
  
  return signOut(auth);
  
};

const google = () => {
  new GoogleAuthProvider();
};
const facebook = () => {};
const authObserver = () => {
  onAuthStateChanged(auth, (user:any) => {
    if(user?.emailVerified){
      const {accessToken,email} = user
      globalUser.email = email
      globalUser.token = accessToken
      globalUser.isVerified = true
      setElements(globalUser)
      console.log(`Logged ${email}`)
      console.log(globalUser)
    }
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      

      
      // ...
     else {
      // User is signed out
      // ...
      setElements(globalUser)
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
  sendVerificationEmail
};
