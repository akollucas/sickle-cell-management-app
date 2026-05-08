const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const NutritionLog = require('../models/NutritionLog');

// @route   GET /api/nutrition/today
router.get('/today', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const log = await NutritionLog.findOne({
      patient: { $in: req.user.patients },
      date: { $gte: today }
    });
    res.json(log || { waterIntake: 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/nutrition
router.post('/', auth, async (req, res) => {
  try {
    const log = new NutritionLog({ ...req.body, date: new Date() });
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;