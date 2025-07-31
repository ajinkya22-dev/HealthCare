const express = require('express');
const router = express.Router();
const { createAppointment, getDoctorAppointments, getPatientAppointments } = require('../Controllers/appointmentController');

router.post('/', createAppointment);
router.get('/doctor/:doctorId', getDoctorAppointments);
router.get('/patient/:patientId', getPatientAppointments);

module.exports = router;
