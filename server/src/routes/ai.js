const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { predictRisk } = require('../services/aiService');
const CrisisLog = require('../models/CrisisLog');
const NutritionLog = require('../models/NutritionLog');

// @route   GET /api/ai/predict-risk
// @desc    Get AI risk prediction for the logged-in user's patient
router.get('/predict-risk', auth, async (req, res) => {
  try {
    const patientId = req.user.patients[0]; // For simplicity, use first linked patient
    if (!patientId) {
      return res.status(400).json({ message: 'No patient linked to account' });
    }

    // Get recent data for prediction
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const recentCrisis = await CrisisLog.findOne({ patient: patientId })
      .sort({ date: -1 });
    const todayNutrition = await NutritionLog.findOne({ 
      patient: patientId, 
      date: { $gte: today }
    });

    // Prepare features for AI model
    const features = {
      hydration_level: todayNutrition?.waterIntake || 0,
      pain_level: recentCrisis?.painLevel || 0,
      sleep_hours: recentCrisis?.sleepHours || 7,
      activity_level: 2, // Default moderate
      previous_crisis_days: 30 // Days since last crisis (mock)
    };

    const prediction = await predictRisk(features);
    res.json(prediction);
  } catch (err) {
    console.error('AI prediction error:', err);
    res.status(500).json({ message: 'Error generating prediction' });
  }
});

module.exports = router;