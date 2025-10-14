// Defines the structure of a project document in MongoDB using Mongoose.
// Each project belongs to a specific user and includes title, description, and creation date.

const mongoose = require('mongoose');

// Create a schema for projects stored in the database
const ProjectSchema = new mongoose.Schema({
  // Reference to the user who submitted the project
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Title of the project
  title: { type: String, required: true, trim: true },
  // Description of the project
  description: { type: String, required: true },
  // Automatically stores the creation date
  createdAt: { type: Date, default: Date.now }
});

// Export the model so it can be used in other parts of the app
module.exports = mongoose.model('Project', ProjectSchema);
