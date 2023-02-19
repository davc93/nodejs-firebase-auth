import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  
  signInWithPopup
  
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
const getUserInfo = () => {
  
  if ((document.querySelector('#profile__user-data')?.children.length == 0) && globalUser.isVerified ) {
  
    const container = document.createElement('div')
    const email = document.createElement('h2')
    email.textContent = globalUser.email
    container.append(email)
    document.querySelector('#profile__user-data')?.append(container)    
  }

}

const google = async () => {
  try {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    const {user} = result
    const userCredentials = GoogleAuthProvider.credentialFromResult(result)
    globalUser.email = user.email as string;
    globalUser.token = userCredentials?.accessToken as string
    globalUser.isVerified = true;
    console.log(user)
    
    
  } catch (error) {
    console.error(error)
  }

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
      getUserInfo()
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
