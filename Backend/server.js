const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes');
const doctorRoutes = require('./Routes/doctorRoutes');
const patientRoutes = require('./Routes/patientRoutes');
const appointmentRoutes = require('./Routes/appointmentRoutes');
const reviewRoutes = require('./Routes/reviewRoutes');
const { errorHandler } = require('./Middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // your frontend
    credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
