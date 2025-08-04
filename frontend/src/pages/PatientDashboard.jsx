import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI, appointmentAPI } from '../services/api';
import Navbar from '../Navbar';

const PatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user._id) {
          navigate('/login');
          return;
        }

        const [dashboardResponse, appointmentsResponse] = await Promise.all([
          patientAPI.getDashboard(),
          appointmentAPI.getPatientAppointments(user._id)
        ]);

        setDashboardData(dashboardResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1694a4]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">Here's your health dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assigned Doctor */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">My Doctor</h2>
              {dashboardData?.doctor ? (
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-[#1694a4] flex items-center justify-center text-white font-bold text-xl">
                    Dr. {dashboardData.doctor.userId?.name?.charAt(0) || "D"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">
                      Dr. {dashboardData.doctor.userId?.name}
                    </h3>
                    <p className="text-gray-600">{dashboardData.doctor.specialization}</p>
                    <p className="text-sm text-gray-500">
                      {dashboardData.doctor.HospitalName} • {dashboardData.doctor.experiance} years experience
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/bookAppointment')}
                    className="bg-[#179fac] text-white px-4 py-2 rounded-lg hover:bg-[#147c88] transition"
                  >
                    Book Appointment
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No doctor assigned yet</p>
                  <button 
                    onClick={() => navigate('/')}
                    className="bg-[#179fac] text-white px-4 py-2 rounded-lg hover:bg-[#147c88] transition"
                  >
                    Find a Doctor
                  </button>
                </div>
              )}
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Appointments</h2>
              {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No appointments yet</p>
              ) : (
                <div className="space-y-4">
                  {appointments.slice(0, 5).map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Appointment with Dr. {appointment.doctor?.userId?.name || "Unknown"}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "Date not set"} at {appointment.time || 'N/A'}
                          </p>
                          <p className="text-gray-500 text-sm">{appointment.reason}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/bookAppointment')}
                  className="w-full bg-[#179fac] text-white py-3 rounded-lg hover:bg-[#147c88] transition"
                >
                  Book New Appointment
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full border border-[#179fac] text-[#179fac] py-3 rounded-lg hover:bg-[#179fac] hover:text-white transition"
                >
                  Find Doctors
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Doctor Reviews */}
            {dashboardData?.reviews && dashboardData.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Reviews</h2>
                <div className="space-y-3">
                  {dashboardData.reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="border-l-4 border-[#1694a4] pl-4">
                      <div className="flex items-center mb-1">
                        <div className="text-yellow-500 mr-2">
                          {"★".repeat(review.rating || 0)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 