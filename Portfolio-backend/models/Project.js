const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true },
    description: { type: String, required: true },
    techStack:   [String],
    liveUrl:     { type: String, default: '' },
    githubUrl:   { type: String, default: '' },
    icon:        { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);