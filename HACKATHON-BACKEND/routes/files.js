// Handles file uploads from users and stores them on Cloudinary using Multer.
// Supports images and PDFs for the hackathon project submissions.

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// ===== CLOUDINARY CONFIGURATION =====
// Connects the app to your Cloudinary account using credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

// ===== MULTER STORAGE SETUP =====
// Defines how files are stored in Cloudinary (folder and allowed formats)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hackathon-projects',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf']
  }
});
const upload = multer({ storage });

// ===== FILE UPLOAD ROUTE =====
// Receives a file from the client and uploads it to Cloudinary
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Responds with the file URL after successful upload
    res.json({ fileUrl: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Upload failed' });
  }
});

module.exports = router;
