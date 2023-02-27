## Usage

## init firebase service

```js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: '',
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)


```


## Create authentication function

```ts

const authObserver = (callback: any) => {
  onAuthStateChanged(auth, callback)
}

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
  await signOut(auth)
}

const google = async () => {
  const result = await signInWithPopup(auth, new GoogleAuthProvider())
  const { user }:any = result
  
  if (!user) {
    throw new Error('you're not auth')
  }
  console.log("user",user.accessToken)
  console.log('login succesfull')
  
}

```

## create functions for crud operations with the api

```ts
export default function profile () {
  async function getProfileInfo (token: string) {
    const response = await fetch(config.apiUri, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }

  async function updateInfo (token: string, data: any) {
    const response = await fetch(config.apiUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      },
      body: data
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }
  async function deleteProfile (token: string) {
    const response = await fetch(config.apiUri, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`

      }
    })
    const body = await response.json()
    if (body.error) {
      throw new Error(body.message)
    } else {
      return body
    }
  }

  return {
    getProfileInfo,
    updateInfo,
    deleteProfile
  }
}

```

### and that all
