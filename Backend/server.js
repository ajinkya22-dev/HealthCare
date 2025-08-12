const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const authRoutes = require('./Routes/authRoutes');
const doctorRoutes = require('./Routes/doctorRoutes');
const patientRoutes = require('./Routes/patientRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const { errorHandler } = require('./Middleware/errorMiddleware');

// Load env variables
dotenv.config();

// Connect to DB
connectDB();

// Create uploads directories if they don't exist
const createUploadDirectories = () => {
    const uploadsDir = path.join(__dirname, 'uploads');
    const doctorProfilesDir = path.join(uploadsDir, 'doctor-profiles');
    const patientProfilesDir = path.join(uploadsDir, 'patient-profiles');

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
        console.log('Created uploads directory');
    }

    if (!fs.existsSync(doctorProfilesDir)) {
        fs.mkdirSync(doctorProfilesDir, { recursive: true });
        console.log('Created doctor-profiles directory');
    }

    if (!fs.existsSync(patientProfilesDir)) {
        fs.mkdirSync(patientProfilesDir, { recursive: true });
        console.log('Created patient-profiles directory');
    }
};

createUploadDirectories();

// Initialize app
const app = express();

// ✅ Allowed origins
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5176',
    'http://localhost:5174',
    'https://health-care-sand-three.vercel.app',
    'https://healthcare-two-inky-55.vercel.app' // your prod frontend
];

// ✅ Apply CORS globally before anything else
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS blocked'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
}));

// ✅ Handle preflight requests for all routes
app.options('*', cors());

// Middleware
app.use(express.json());

// Static uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);

// Error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- POST /api/auth/login');
    console.log('- POST /api/auth/register');
    console.log('- GET /api/appointments/my-appointments');
    console.log('- GET /api/doctors');
    console.log('- GET /api/patients/dashboard');
});
