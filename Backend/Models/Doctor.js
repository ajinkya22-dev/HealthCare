const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    specialization: String,
    profileImage: { type: String, default: 'default.png' }
});

module.exports = mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);
