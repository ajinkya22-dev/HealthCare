const Appointment = require('../Models/Appointments');
const Doctor = require('../Models/Doctor');
const mongoose = require("mongoose");
const Patient = require('../Models/Patient');
// Create appointment

exports.createAppointment = async (req, res) => {
    try {
        const { doctorId, patientId, appointmentDate, description } = req.body;

        const appointment = await Appointment.create({
            doctor: new mongoose.Types.ObjectId(doctorId),
            patient: new mongoose.Types.ObjectId(patientId),
            appointmentDate,
            description
        });

        res.status(201).json({
            doctorId: appointment.doctor,
            patientId: appointment.patient,
            appointmentDate: appointment.appointmentDate,
            description: appointment.description
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to create appointment", error: err.message });
    }
};

// Doctor's appointments
exports.getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.params.doctorId.trim();
        const appointments = await Appointment.find({ doctor: doctorId }).populate('patient');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch doctor's appointments", error: err.message });
    }
};

// Patient's appointments
exports.getPatientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.params.patientId })
            .populate({
                path: 'doctor',
                populate: {
                    path: 'userId',
                    select: 'name email'
                }
            });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("❌ Error fetching patient appointments:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Get appointments for logged-in doctor
exports.getMyAppointments = async (req, res) => {
    try {
        console.log('getMyAppointments called, user:', req.user);
        
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        const doctor = await Doctor.findOne({ userId: req.user._id });
        console.log('Doctor found:', doctor ? 'Yes' : 'No');
        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        
        const appointments = await Appointment.find({ doctor: doctor._id }).populate('patient');
        console.log('Appointments found:', appointments.length);
        res.json(appointments);
    } catch (err) {
        console.error('getMyAppointments error:', err);
        res.status(500).json({ message: "Failed to fetch appointments", error: err.message });
    }
};

exports.getMyAppointmentsForPatient = async (req, res) => {
    try {
        const patient = await Patient.findOne({ userId: req.user.id });
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        const appointments = await Appointment.find({ patient: patient._id })
            .populate({
                path: 'doctor',
                populate: {
                    path: 'userId',
                    select: 'name email'
                }
            });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments for patient:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};