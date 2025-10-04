const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { name, password } = req.body;
//   res.send('API en développement');
//   const hashed = await bcrypt.hash(password, 10);
//   await User.create({ name, password: hashed });
//   res.status(201).json({ message: 'User registered' });
// });

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, password: hashed });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ name }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;