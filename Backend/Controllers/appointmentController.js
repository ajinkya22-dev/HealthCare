const Appointment = require('../Models/Appointments');
const mongoose = require("mongoose");
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
    const appointments = await Appointment.find({ patient: req.params.patientId }).populate('doctor');
    res.json(appointments);
};

