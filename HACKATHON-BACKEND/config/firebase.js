// Initializes Firebase Admin SDK to let the backend verify user tokens
// and communicate securely with Firebase Authentication.

const admin = require('firebase-admin');
const serviceAccount = require('./hackathonaut-firebase-adminsdk-fbsvc-836b4cc6b2.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
