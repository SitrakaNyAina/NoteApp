const express = require('express');
const jwt = require('jsonwebtoken');
const Note = require('../models/Note');
const router = express.Router();

router.post('/', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const { name } = jwt.verify(token, process.env.JWT_SECRET);
    const { date, content } = req.body;
    await Note.create({ name, date, content });
    res.status(201).json({ message: 'Note added' });
  } catch {
    res.status(403).json({ message: 'Unauthorized' });
  }
});

module.exports = router;