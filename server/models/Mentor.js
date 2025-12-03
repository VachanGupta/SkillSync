
const mongoose = require('mongoose');

const MentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  skills: [{ type: String }],
  experienceYears: { type: Number, min: 0 },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mentor', MentorSchema);
