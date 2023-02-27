const admin = require('firebase-admin')

class UserService {
  async getUsers() {
    const users = await admin.auth().listUsers()
    return users
  }

}

module.exports = {
  UserService
};
