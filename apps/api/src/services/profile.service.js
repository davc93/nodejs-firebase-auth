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

module.exports = {
  ProfileService,
};
