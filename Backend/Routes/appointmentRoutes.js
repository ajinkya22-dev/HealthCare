const express = require('express');
const router = express.Router();
const { protect } = require('../Middleware/authMiddleware');
const {
    createAppointment,
    getDoctorAppointments,
    getPatientAppointments,
    getMyAppointments,
    getMyAppointmentsForPatient,
    testPatientData
} = require('../Controllers/appointmentController');

// Test endpoint to debug patient data
router.get('/test-patient-data', testPatientData);

// Create appointment
router.post('/', protect, createAppointment);

// Get appointments for logged-in doctor
router.get('/my-appointments', protect, getMyAppointments);

// Get appointments for logged-in patient
router.get('/my-patient-appointments', protect, getMyAppointmentsForPatient);

// Get appointments by doctor ID
router.get('/doctor/:doctorId', protect, getDoctorAppointments);

// Get appointments by patient ID
router.get('/patient/:patientId', protect, getPatientAppointments);

module.exports = router;
