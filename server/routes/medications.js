const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MedicationLog = require('../models/MedicationLog');

// @route   GET /api/medications
router.get('/', auth, async (req, res) => {
  try {
    const logs = await MedicationLog.find({ patient: { $in: req.user.patients } });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/medications
router.post('/', auth, async (req, res) => {
  try {
    const log = new MedicationLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;