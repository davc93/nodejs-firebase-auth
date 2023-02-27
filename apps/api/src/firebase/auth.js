const admin = require('firebase-admin')

async function verifyIdToken(idToken) {
    
    const user = await admin.auth().verifyIdToken(idToken)
    return user
}

async function setRole(uid,role) {
    admin.auth().setCustomUserClaims(uid,{role})
}

module.exports = {
    verifyIdToken,
    setRole
}