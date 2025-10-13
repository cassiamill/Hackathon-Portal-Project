// Main entry point of the backend server for the Hackathon Portal.
// Sets up Express, connects to MongoDB, and loads routes for authentication, projects, and file uploads.

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARES =====
// Enables CORS for cross-origin requests and parses JSON request bodies
app.use(cors());
app.use(express.json());

// ===== ROUTE IMPORTS =====
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const fileRoutes = require('./routes/files');

// ===== ROUTE DEFINITIONS =====
// Handles user authentication (register/login)
app.use('/auth', authRoutes);
// Handles project submissions
app.use('/projects', projectRoutes);
// Handles file uploads to Cloudinary
app.use('/files', fileRoutes);

// ===== TEST ROUTE =====
// Simple route to check if the API is running
app.get('/', (req, res) => {
  res.send('🚀 API Hackathon Portal is running successfully!');
});

// ===== DATABASE CONNECTION =====
// Connects to MongoDB Atlas and starts the server if successful
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ Error connecting to MongoDB:', err);
});
