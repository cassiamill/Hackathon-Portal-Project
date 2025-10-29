const express = require('express');
const cors = require('cors');
const { isAllowedOrigin } = require('./utils/cors');

// Add your dev/prod frontend URLs here
const allowedOrigins = ['http://localhost:5173'];

const app = express();

// Global middleware
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = isAllowedOrigin(origin, allowedOrigins);
      callback(null, allowed);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Health endpoint for tests/monitoring
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Mount your existing routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const fileRoutes = require('./routes/files');

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/files', fileRoutes);

// 404 handler (keep last before error handler)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;