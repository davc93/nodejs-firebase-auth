const { setRole, verifyIdToken } = require("../firebase/auth");

async function checkRole(req, res, next) {
  const user = req.user
  if(!user.role){
    await setRole(user.uid,'customer')
  }
  if(user.role !== 'admin'){
    next(new Error('Must be an admin to do this'))
  } else {
    next()
  }
}

module.exports = {
  checkAuth: checkRole,
};
