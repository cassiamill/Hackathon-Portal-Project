// src/config/corsConfig.js
const allowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

function buildCorsOptions(req, callback) {
  // During tests, skip CORS checks
  if (process.env.SKIP_CORS === '1') {
    return callback(null, { origin: true, credentials: true });
  }

  const origin = req.header('Origin');
  if (!origin) {
    // Allow Supertest or internal calls
    return callback(null, { origin: true });
  }

  const isAllowed = allowed.includes(origin);
  if (isAllowed) {
    callback(null, { origin: true, credentials: true });
  } else {
    callback(new Error('Not allowed by CORS'));
  }
}

module.exports = { buildCorsOptions };
