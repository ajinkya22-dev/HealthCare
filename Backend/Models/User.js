const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['doctor', 'patient'], required: true },
    profileImage: { type: String, default: 'default.png' },
    phoneNo: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    address: { type: String }
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
