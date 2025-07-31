const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    appointmentDate: Date,
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    description: String
}, { timestamps: true });

module.exports = mongoose.models.Appointments ||mongoose.model('Appointment', appointmentSchema);
