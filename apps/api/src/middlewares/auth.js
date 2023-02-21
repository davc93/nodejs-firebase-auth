import { getAuth } from 'firebase-admin/auth';

export function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    getAuth()
      .verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
        next();
      });
  } else {
    throw new Error('Necesita autenticacion');
  }
}
