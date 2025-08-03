

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }
});

module.exports = mongoose.models.Patient || mongoose.model('Patient', patientSchema);

