const { verifyIdToken } = require("../firebase/auth");

async function checkAuth(req, res, next) {
  console.log(req.headers.authorization)
  if (!req.headers.authorization) {
    next(new Error("must be authenticate"));
  } else {
    try {
      const idToken = req.headers.authorization.replace("Bearer ","")
      const user = await verifyIdToken(idToken);
      req.user = user
      next()
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  checkAuth,
};
