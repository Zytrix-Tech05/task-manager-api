const express = require('express');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Every route below this line requires a valid token
router.use(authMiddleware);

// CREATE a task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      dueDate,
      owner: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all tasks belonging to the logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET a single task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE a task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;