import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
  signInWithPopup
} from 'firebase/auth'
import { auth } from '../firebase'
import { globalUser } from '../main'

const signUpEmailAndPassword = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

const loginEmailAndPassword = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}
const sendVerificationEmail = async (user: any) => {
  await sendEmailVerification(user)
}

const logout = async () => {
  globalUser.email = null
  globalUser.isVerified = false
  globalUser.token = null
  await signOut(auth)
}

const google = async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  const { user }:any = result
  
  if (!user) {
    throw new Error('No te has autenticado')
  }
  globalUser.email = user.email as string
  globalUser.token = user.accessToken
  globalUser.isVerified = true
  console.log("user",globalUser)
  console.log('login succesfull')
  
}
const authObserver = (callback: any) => {
  onAuthStateChanged(auth, callback)
}

export default {
  google,
  loginEmailAndPassword,
  signUpEmailAndPassword,
  logout,
  authObserver,
  sendVerificationEmail
}
