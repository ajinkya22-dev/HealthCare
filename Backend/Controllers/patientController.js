const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const Review = require('../Models/Review');

// Get assigned doctor info and reviews
exports.getDashboard = async (req, res) => {
    const patient = await Patient.findOne({ userId: req.user.id }).populate({
        path: 'doctor',
        populate: { path: 'userId', select: 'name email' }
    });

    const reviews = await Review.find({ doctor: patient.doctor._id });
    res.json({ doctor: patient.doctor, reviews });
};

exports.assignDoctor = async (req, res) => {
    const { doctorId } = req.body;

    const patient = await Patient.findOne({ userId: req.user.id });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient.doctor = doctorId;
    await patient.save();

    res.json({ message: "Doctor assigned successfully", doctor: patient.doctor });
};
