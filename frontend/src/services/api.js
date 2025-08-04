import axios from 'axios';

// Axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API calls
export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export const doctorAPI = {
    getMyPatients: () => api.get('/doctors/patients'),
    getMyReviews: () => api.get('/doctors/reviews'),
    getAllDoctors: () => api.get('/doctors'),
};

export const patientAPI = {
    getDashboard: () => api.get('/patients/dashboard'),
    assignDoctor: (doctorId) => api.patch('/patients/assignDoctor', { doctorId }),
};

export const appointmentAPI = {
    createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
    getDoctorAppointments: (doctorId) => api.get(`/appointments/doctor/${doctorId}`),
    getPatientAppointments: (patientId) => api.get(`/appointments/patient/${patientId}`),
    getMyAppointments: () => api.get('/appointments/my-appointments'),
};

export const reviewAPI = {
    createReview: (reviewData) => api.post('/reviews', reviewData),
    getDoctorReviews: (doctorId) => api.get(`/reviews/doctor/${doctorId}`),
};

export default api;

