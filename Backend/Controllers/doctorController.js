const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Review = require('../Models/Review');
const multer = require('multer');

// Get all patients assigned to doctor
exports.getMyPatients = async (req, res) => {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    const patients = await Patient.find({ doctor: doctor._id }).populate('userId', 'name email');
    res.json(patients);
};

// Get reviews for logged-in doctor
exports.getMyReviews = async (req, res) => {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    const reviews = await Review.find({ doctor: doctor._id }).populate('patient');
    res.json(reviews);
};

// Upload profile image
exports.uploadProfileImage = async (req, res) => {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    doctor.profileImage = req.file.path;
    await doctor.save();
    res.json({ message: "Profile image uploaded", path: doctor.profileImage });
};
