
const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// Seed default mentors if collection is empty
async function ensureDefaultMentors() {
  const count = await Mentor.countDocuments();
  if (count > 0) return;

  const defaultMentors = [
    {
      name: 'Aarav Mehta',
      bio: 'Full-stack engineer focused on modern web development and scalable frontend architectures.',
      skills: ['Web Development', 'HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      experienceYears: 5,
      rating: 4.7,
    },
    {
      name: 'Ishaan Verma',
      bio: 'Competitive programmer and problem-solving mentor specialising in data structures and algorithms.',
      skills: ['DSA', 'Algorithms', 'Data Structures', 'Problem Solving', 'C++'],
      experienceYears: 4,
      rating: 4.8,
    },
    {
      name: 'Kavya Iyer',
      bio: 'Backend engineer designing high-traffic systems and robust APIs.',
      skills: ['Backend', 'Node.js', 'Express', 'Microservices', 'REST APIs'],
      experienceYears: 6,
      rating: 4.9,
    },
    {
      name: 'Rohan Deshpande',
      bio: 'System design mentor with experience building distributed systems at scale.',
      skills: ['System Design', 'Distributed Systems', 'Scalability', 'High Availability'],
      experienceYears: 5,
      rating: 4.85,
    },
    {
      name: 'Sneha Nair',
      bio: 'Frontend specialist helping engineers craft pixel-perfect and accessible UIs.',
      skills: ['Frontend', 'React', 'TypeScript', 'CSS', 'Tailwind', 'UI/UX'],
      experienceYears: 3,
      rating: 4.6,
    },
    {
      name: 'Aditya Sharma',
      bio: 'Database engineer with a focus on schema design, indexing, and query optimisation.',
      skills: ['DBMS', 'SQL', 'MongoDB', 'PostgreSQL', 'Database Design'],
      experienceYears: 4,
      rating: 4.75,
    },
    {
      name: 'Priya Joshi',
      bio: 'AI/ML engineer working on applied machine learning and MLOps.',
      skills: ['AI/ML', 'Python', 'TensorFlow', 'PyTorch', 'ML Ops'],
      experienceYears: 5,
      rating: 4.9,
    },
    {
      name: 'Varun Singh',
      bio: 'Software engineer mentoring on object-oriented design and clean architecture.',
      skills: ['OOP', 'Design Patterns', 'Java', 'Clean Code'],
      experienceYears: 3,
      rating: 4.5,
    },
    {
      name: 'Neha Gupta',
      bio: 'Engineer with a strong foundation in core mathematics for computer science.',
      skills: ['Mathematics', 'Discrete Maths', 'Probability', 'Linear Algebra'],
      experienceYears: 4,
      rating: 4.65,
    },
    {
      name: 'Siddharth Rao',
      bio: 'Mentor focused on backend systems, APIs, and career guidance for software engineers.',
      skills: ['Backend', 'System Design', 'Career Guidance', 'APIs'],
      experienceYears: 6,
      rating: 4.95,
    },
  ];

  await Mentor.insertMany(defaultMentors);
}

// Create mentor (kept for potential admin use, but not exposed in UI)
router.post('/', auth, async (req, res) => {
  try {
    const { name, bio, skills, rating, experienceYears } = req.body;
    if (!name) return res.status(400).json({ msg: 'Name is required' });
    const mentor = new Mentor({
      name,
      bio,
      skills: Array.isArray(skills) ? skills : skills ? skills.split(',').map((s) => s.trim()) : [],
      rating,
      experienceYears,
    });
    await mentor.save();
    res.status(201).json(mentor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Read mentors list (public)
router.get('/', async (req, res) => {
  try {
    await ensureDefaultMentors();
    const mentors = await Mentor.find().sort({ rating: -1, createdAt: -1 }).limit(100);
    res.json(mentors);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Read single mentor
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const mentor = await Mentor.findById(id);
    if (!mentor) return res.status(404).json({ msg: 'Mentor not found' });
    res.json(mentor);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Update mentor (protected)
router.put('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = (({ name, bio, skills, rating }) => ({ name, bio, skills, rating }))(req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const mentor = await Mentor.findById(id);
    if (!mentor) return res.status(404).json({ msg: 'Mentor not found' });
    if (updates.skills && !Array.isArray(updates.skills)) {
      updates.skills = updates.skills.split(',').map(s=>s.trim());
    }
    Object.assign(mentor, updates);
    await mentor.save();
    res.json(mentor);
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// Delete mentor (protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: 'Invalid id' });
    const mentor = await Mentor.findById(id);
    if (!mentor) return res.status(404).json({ msg: 'Mentor not found' });
    await mentor.deleteOne();
    res.json({ msg: 'Mentor deleted' });
  } catch (err) {
    console.error(err); res.status(500).send('Server error');
  }
});

module.exports = router;
