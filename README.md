# Health Management System

A comprehensive health management system with doctor-patient appointment booking, user authentication, and dashboard functionality.

## Features

- **User Authentication**: Login and registration for both doctors and patients
- **Doctor Dashboard**: View assigned patients, reviews, and manage appointments
- **Patient Dashboard**: View assigned doctor, book appointments, and track medical history
- **Appointment Booking**: Real-time appointment scheduling with doctors
- **Doctor Search**: Browse and filter doctors by specialization
- **Review System**: Patients can review their doctors
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **multer** for file uploads
- **cors** for cross-origin requests

### Frontend
- **React.js** with Vite
- **Axios** for API communication
- **React Router** for navigation
- **Tailwind CSS** for styling
- **React Icons** for icons

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd Hackathon_IEEE
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health_management
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## Running the Application

### 1. Start the Backend Server

```bash
cd Backend
npm start
```

The backend server will start on `http://localhost:5000`

### 2. Start the Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Doctors
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/patients` - Get doctor's patients (protected)
- `GET /api/doctors/reviews` - Get doctor's reviews (protected)

### Patients
- `GET /api/patients/dashboard` - Get patient dashboard (protected)
- `PATCH /api/patients/assignDoctor` - Assign doctor to patient (protected)

### Appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `GET /api/appointments/patient/:patientId` - Get patient's appointments

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/doctor/:doctorId` - Get doctor's reviews

## Usage

### For Patients
1. Register as a patient
2. Browse available doctors
3. Book appointments with preferred doctors
4. View appointment history and assigned doctor
5. Leave reviews for doctors

### For Doctors
1. Register as a doctor with specialization and credentials
2. View assigned patients
3. Check patient reviews
4. Manage appointment schedule

## Database Schema

### User Model
- name, email, password, role, profileImage, phoneNo, gender, address

### Doctor Model
- userId (ref to User), specialization, qualification, experiance, licenceNo, HospitalName, fees

### Patient Model
- userId (ref to User), doctor (ref to Doctor)

### Appointment Model
- doctor (ref to Doctor), patient (ref to Patient), appointmentDate, description, time, status

### Review Model
- doctor (ref to Doctor), patient (ref to Patient), rating, comment, createdAt

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/health_management
JWT_SECRET=your_secret_key_here
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
