
const mongoose = require('mongoose');
const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['not-started','in-progress','completed','on-hold'], default: 'not-started' },
  progress: { type: Number, min: 0, max: 100, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Goal', GoalSchema);
