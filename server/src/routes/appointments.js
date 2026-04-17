const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Appointment = require('../models/Appointment');

// @route   GET /api/appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: { $in: req.user.patients } });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/appointments
router.post('/', auth, async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;