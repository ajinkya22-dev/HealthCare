import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true // ✅ required for CORS with credentials
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`; // ✅ fixed
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
            const publicPages = ['/', '/login', '/register', '/contact'];
            if (!publicPages.includes(window.location.pathname)) {
                window.location.href = '/login';
            }
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
    getProfile: () => api.get('/patients/profile'),
};

export const appointmentAPI = {
    createAppointment: (appointmentData) => api.post('/appointments', appointmentData),
    getDoctorAppointments: (doctorId) => api.get(`/appointments/doctor/${doctorId}`), // ✅ fixed
    getPatientAppointments: (patientId) => api.get(`/appointments/patient/${patientId}`), // ✅ fixed
    getMyAppointments: () => api.get('/appointments/my-appointments'),
    getMyPatientAppointments: () => api.get('/appointments/my-patient-appointments'),
    testPatientData: () => api.get('/appointments/test-patient-data'),
    updateAppointmentStatus: (id, status) => api.patch(`/appointments/${id}/status`, { status }), // ✅ fixed
};

export const reviewAPI = {
    createReview: (reviewData) => api.post('/reviews', reviewData),
    getDoctorReviews: (doctorId) => api.get(`/reviews/doctor/${doctorId}`), // ✅ fixed
};

export default api;
