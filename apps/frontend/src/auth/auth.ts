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
  const { user } = result
  
  if (!user) {
    throw new Error('No te has autenticado')
  }
  const userCredentials = GoogleAuthProvider.credentialFromResult(result)
  globalUser.email = user.email as string
  globalUser.token = userCredentials?.accessToken as string
  
  globalUser.isVerified = true
  console.log('login succesfull')
  
}
const facebook = () => {}
const authObserver = (callback: any) => {
  onAuthStateChanged(auth, callback)
}

export default {
  google,
  facebook,
  loginEmailAndPassword,
  signUpEmailAndPassword,
  logout,
  authObserver,
  sendVerificationEmail
}
