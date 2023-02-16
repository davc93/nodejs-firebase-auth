require("dotenv").config();
import { applicationDefault, initializeApp} from 'firebase-admin/app'
const initFirebase = () => {
  initializeApp({
    credential: applicationDefault()
})  
}

export {
  initFirebase
}
