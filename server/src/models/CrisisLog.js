const mongoose = require('mongoose');

const CrisisLogSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, default: Date.now },
  painLevel: { type: Number, min: 0, max: 10, required: true },
  painLocation: [String],
  symptoms: [String],
  sleepHours: { type: Number, min: 0, max: 24 },
  medicationsTaken: [String],
  notes: String,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('CrisisLog', CrisisLogSchema);