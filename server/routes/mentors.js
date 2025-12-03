
const express = require('express');
const router = express.Router();
const Mentor = require('../models/Mentor');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

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

module.exports = router;
