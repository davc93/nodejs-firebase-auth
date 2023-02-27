## Usage 

Init firebase service 

```js
// src/firebase/init

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
```

Verify id Token and if you want set custom data to the user like role, addresss, phone, etc..

```js
const admin = require('firebase-admin')

async function verifyIdToken(idToken) {
    
    const user = await admin.auth().verifyIdToken(idToken)
    return user
}

async function setRole(uid,role) {
    admin.auth().setCustomUserClaims(uid,{role})
}

```

To Crud operation see src/services/profile.js

```js

const admin = require('firebase-admin')

class ProfileService {
  async getProfile(uid) {
    const user = await admin.auth().getUser(uid)
    return user
  }

  async updateInfo(uid, data) {
    await admin.auth().setCustomUserClaims(uid,{
      ...data
    })


  }

  async deleteProfile(uid) {
    await admin.auth().deleteUser(uid)
  }
}


```