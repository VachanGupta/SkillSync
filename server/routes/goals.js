
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Goal = require('../models/Goal');
const User = require('../models/User');
const mongoose = require('mongoose');

// Create goal (protected)
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ msg: 'Title is required' });
    const goal = new Goal({ title, description, owner: req.user.id });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Read all goals (protected, returns user's goals)
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Read single goal (protected)
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });
    if (goal.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });
    res.json(goal);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Update goal (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = (({ title, description, status, progress }) => ({ title, description, status, progress }))(req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });
    if (goal.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });
    Object.assign(goal, updates);
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Delete goal (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ msg: 'Goal not found' });
    if (goal.owner.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });
    await goal.deleteOne();
    res.json({ msg: 'Goal deleted' });
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
