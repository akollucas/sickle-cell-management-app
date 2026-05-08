const mongoose = require('mongoose');

const MedicationLogSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  medicationName: { type: String, required: true },
  dosage: String,
  scheduledTime: Date,
  takenAt: Date,
  taken: { type: Boolean, default: false },
  notes: String
});

module.exports = mongoose.model('MedicationLog', MedicationLogSchema);