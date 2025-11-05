// HACKATHON-BACKEND/index.js
// Paste/merge into your existing index.js (keeps connectMongo + routes logic).

const path = require('path');
const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '.env.development';
require('dotenv').config({ path: path.join(process.cwd(), envPath) });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// --- Keep your existing connectMongo implementation or paste below ---
const SKIP_MONGO = process.env.SKIP_MONGO === '1';
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || '';

async function connectMongo() {
  if (SKIP_MONGO) {
    console.warn('⚠️ Skipping MongoDB connection (SKIP_MONGO=1)');
    return;
  }

  if (!mongoUri) {
    console.warn('⚠️ MONGODB_URI not set – skipping MongoDB connection');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
  }
}
// ---------------------------------------------------------------------

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// --- CORS middleware (safe for tests) ---
// Behavior:
// - If NODE_ENV === 'test' or SKIP_CORS === '1' -> skip CORS handling so tests are unaffected.
// - If request has no Origin header -> allow (for curl/tests/server-to-server).
// - If Origin present -> check against CLIENT_ORIGINS, echo origin and allow credentials.
const DISABLE_CORS_IN_TEST = process.env.NODE_ENV === 'test' || process.env.SKIP_CORS === '1';
const rawOrigins = process.env.CLIENT_ORIGINS || 'http://localhost:3000';
const allowedOrigins = rawOrigins.split(',').map(s => s.trim()).filter(Boolean);

app.use((req, res, next) => {
  if (DISABLE_CORS_IN_TEST) {
    return next();
  }

  const origin = req.get('Origin');

  // allow if no origin (server-to-server or tests)
  if (!origin) {
    return next();
  }

  if (allowedOrigins.indexOf(origin) === -1) {
    res.status(403).send('CORS origin denied');
    return;
  }

  // echo origin — required when sending credentials
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
// --- end CORS middleware ---

// mount routes as before (adjust if your routes mounting differs)
try {
  const routes = require('./routes');
  if (routes && routes.stack) app.use('/', routes);
  else if (typeof routes === 'function') app.use('/', routes);
} catch (err) {
  // ignore if your routes are registered differently
}

// helpful health endpoint
app.get('/__health', (req, res) => res.status(200).json({ ok: true }));

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  (async () => {
    await connectMongo();
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
  })();
}

module.exports = app;