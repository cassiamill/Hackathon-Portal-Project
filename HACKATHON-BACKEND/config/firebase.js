// Initializes Firebase Admin SDK to let the backend verify user tokens
// and communicate securely with Firebase Authentication.

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
