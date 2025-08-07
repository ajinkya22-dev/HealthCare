// Data integrity enforced: Appointment and patient creation require valid doctor and patient references.
const Appointment = require('../Models/Appointments');
const Doctor = require('../Models/Doctor');
const mongoose = require("mongoose");
const Patient = require('../Models/Patient');
const User = require('../Models/User');

// Test endpoint to debug patient data
exports.testPatientData = async (req, res) => {
    try {
        console.log('Testing patient data...');
        
        // Get all patients
        const patients = await Patient.find().populate('userId');
        console.log('All patients:', patients);
        
        // Get all appointments
        const appointments = await Appointment.find().populate({
            path: 'patient',
            populate: {
                path: 'userId',
                select: 'name email profileImage phoneNo gender address'
            }
        });
        console.log('All appointments with populated patient data:', appointments);
        
        res.json({
            patients: patients,
            appointments: appointments
        });
    } catch (err) {
        console.error('Test error:', err);
        res.status(500).json({ message: "Test failed", error: err.message });
    }
};

// Create appointment

exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, appointmentDate, description } = req.body;
    
    console.log('Creating appointment with data:', { doctorId, patientId, appointmentDate, description });

    // Validate doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({ message: "Invalid doctorId" });
    }

    // Validate patient - handle both Patient ID and User ID
    let patient;
    if (mongoose.Types.ObjectId.isValid(patientId)) {
      // Try to find by Patient ID first
      patient = await Patient.findById(patientId).populate('userId');
      if (!patient) {
        // If not found by Patient ID, try to find by User ID
        patient = await Patient.findOne({ userId: patientId }).populate('userId');
      }
    } else {
      return res.status(400).json({ message: "Invalid patientId format" });
    }

    if (!patient) {
      return res.status(400).json({ message: "Patient not found. Please ensure you have a patient profile." });
    }
    if (!patient.userId) {
      return res.status(400).json({ message: "Patient does not have a valid userId" });
    }

    // Create appointment
    const appointment = await Appointment.create({
      doctor: doctor._id,
      patient: patient._id,
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
        
        const appointments = await Appointment.find({ doctor: doctor._id })
            .populate({
                path: 'patient',
                populate: {
                    path: 'userId',
                    select: 'name email profileImage phoneNo gender address'
                }
            });
        console.log('Appointments found:', appointments.length);
        
        // Debug: Log each appointment's patient data
        appointments.forEach((appointment, index) => {
            console.log(`Appointment ${index}:`, {
                appointmentId: appointment._id,
                patient: appointment.patient,
                patientUserId: appointment.patient?.userId,
                patientName: appointment.patient?.userId?.name,
                patientEmail: appointment.patient?.userId?.email,
                fullPatient: appointment.patient
            });
        });
        
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

// PATCH: Update appointment status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowedStatuses = ['scheduled', 'completed', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update appointment status', error: err.message });
  }
};