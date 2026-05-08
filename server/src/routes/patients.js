const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Patient = require('../models/Patient');

// @route   GET /api/patients
// @desc    Get all patients for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient.find({ _id: { $in: req.user.patients } });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /api/patients
// @desc    Add a new patient
router.post('/', auth, async (req, res) => {
  try {
    const patient = new Patient({ ...req.body, caregivers: [req.user._id] });
    await patient.save();
    // Add patient to user's list
    req.user.patients.push(patient._id);
    await req.user.save();
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;