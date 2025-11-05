// Safe firebase loader — does NOT crash if env vars are missing or invalid.
const admin = require('firebase-admin');

// 1) Allow skipping firebase during local tests
if (process.env.SKIP_FIREBASE === '1') {
  console.warn('⚠️ Firebase initialization skipped (SKIP_FIREBASE=1)');
  module.exports = null;
  return;
}

// 2) Ensure FIREBASE_CONFIG exists and is a valid JSON string
const raw = process.env.FIREBASE_CONFIG;
if (!raw || raw === 'undefined') {
  console.warn('⚠️ No FIREBASE_CONFIG found in env; skipping Firebase init.');
  module.exports = null;
  return;
}

let serviceAccount;
try {
  serviceAccount = JSON.parse(raw);
} catch (err) {
  console.warn('⚠️ FIREBASE_CONFIG exists but is not valid JSON. Skipping Firebase init.', err);
  module.exports = null;
  return;
}

try {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
  module.exports = admin;
} catch (err) {
  console.error('Failed to initialize Firebase admin:', err);
  module.exports = null;
}