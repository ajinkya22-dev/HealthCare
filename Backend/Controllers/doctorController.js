const Doctor = require('../Models/Doctor');
const Patient = require('../Models/Patient');
const Review = require('../Models/Review');
const User = require('../Models/User');
const multer = require('multer');

// Get all doctors (public route)
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate('userId', 'name email profileImage phoneNo gender address')
            .select('-__v');
        
        const doctorsWithUserData = doctors.map(doctor => ({
            _id: doctor._id,
            userId: doctor.userId,
            specialization: doctor.specialization,
            qualification: doctor.qualification,
            experiance: doctor.experience, // Fix field name
            licenceNo: doctor.licenceNo,
            HospitalName: doctor.hospitalName, // Fix field name
            fees: doctor.fees,
            profileImage: doctor.userId.profileImage,
            name: doctor.userId.name,
            email: doctor.userId.email,
            phoneNo: doctor.userId.phoneNo,
            gender: doctor.userId.gender,
            address: doctor.userId.address
        }));
        
        res.json(doctorsWithUserData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching doctors", error: error.message });
    }
};

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
// doctorController.js
exports.uploadProfileImage = async (req, res) => {
    const doctor = await Doctor.findOne({ userId: req.user.id });
    const imagePath = `uploads/doctor-profiles/${req.file.filename}`;

    doctor.profileImage = imagePath;
    await doctor.save();

    res.json({ message: "Profile image uploaded", path: imagePath });
};
