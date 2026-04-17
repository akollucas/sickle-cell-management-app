const mongoose = require('mongoose');

const NutritionLogSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, default: Date.now },
  waterIntake: { type: Number, default: 0 }, // glasses
  meals: [{
    type: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'] },
    description: String,
    notes: String
  }]
});

module.exports = mongoose.model('NutritionLog', NutritionLogSchema);