const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// get all notes
router.get('/', async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: 'desc' }
  });
  res.json(notes);
});

// create a new note
router.post('/', async (req, res) => {
  const { content, takenAt } = req.body;
  try {
    const note = await prisma.note.create({
      data: {
        content,
        takenAt: new Date(takenAt),
        userId: req.user.id
      }
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Note creation failed', error: err.message });
  }
});

router.get('/', async (req, res) => {
  const notes = await prisma.note.findMany({
    where: { userId: req.user.id },
    orderBy: { takenAt: 'desc' }
  });
  res.json(notes);
});