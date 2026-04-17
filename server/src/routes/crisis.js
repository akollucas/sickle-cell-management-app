const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CrisisLog = require('../models/CrisisLog');

// @route   GET /api/crisis
router.get('/', auth, async (req, res) => {
  try {
    const logs = await CrisisLog.find({ patient: { $in: req.user.patients } }).sort({ date: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/crisis
router.post('/', auth, async (req, res) => {
  try {
    const log = new CrisisLog({ ...req.body, reportedBy: req.user._id });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   GET /api/crisis/recent
router.get('/recent', auth, async (req, res) => {
  try {
    const recent = await CrisisLog.findOne({ patient: { $in: req.user.patients } })
      .sort({ date: -1 });
    res.json(recent || { painLevel: 0, sleepHours: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;