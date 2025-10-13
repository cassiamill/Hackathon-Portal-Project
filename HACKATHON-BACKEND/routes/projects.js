// Handles project submissions from authenticated users.
// Verifies Firebase tokens to ensure the user is logged in before saving a project.

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const admin = require('../config/firebase');

// ===== FIREBASE TOKEN VERIFICATION MIDDLEWARE =====
// Checks if the request has a valid Firebase authentication token
async function verifyFirebaseToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the Firebase token and decode the user information
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: 'Invalid Firebase token.' });
  }
}

// ===== CREATE NEW PROJECT ROUTE =====
// Allows authenticated users to submit a new project
router.post('/', verifyFirebaseToken, async (req, res) => {
  const { title, description } = req.body;

  try {
    // Create a new project associated with the authenticated Firebase user
    const project = new Project({
      user: req.user.uid,
      title,
      description
    });

    await project.save();
    res.status(201).json({ message: 'Project submitted successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
