import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { patientAPI, appointmentAPI, doctorAPI } from '../services/api';
import Navbar from '../Navbar';

const PatientDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to get proper image URL
  const getImageUrl = (profileImage) => {
    if (!profileImage) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
    }
    
    // If it's a blob URL, return as is
    if (profileImage.startsWith('blob:')) {
      return profileImage;
    }
    
    // If it's a relative path, construct full URL
    if (profileImage.startsWith('uploads/')) {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      return `${baseURL}/${profileImage}`;
    }
    
    // If it's already a full URL, return as is
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    // Default fallback
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Only fetch data if user is logged in
        if (!user._id) {
          setLoading(false);
          return; // Don't redirect, just show empty state
        }

        console.log('Fetching patient data for user:', user._id);
        const [dashboardResponse, appointmentsResponse, doctorsResponse] = await Promise.all([
          patientAPI.getDashboard(),
          appointmentAPI.getMyPatientAppointments(),
          doctorAPI.getAllDoctors()
        ]);

        setDashboardData(dashboardResponse.data);
        setAppointments(appointmentsResponse.data);
        setAllDoctors(doctorsResponse.data);
        
        console.log('Patient dashboard data loaded:', {
          dashboard: dashboardResponse.data,
          appointments: appointmentsResponse.data,
          doctorsCount: doctorsResponse.data.length
        });
      } catch (err) {
        console.error("Error fetching patient data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientData();
  }, [location.pathname]); // Refresh when the pathname changes

  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen font-sans">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = user && user._id;

  if (!isLoggedIn) {
    return (
      <div className="flex bg-gray-100 min-h-screen font-sans">
        <Navbar />
        <div className="flex-1 p-8 pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to HealthCare</h1>
              <p className="text-gray-600 mb-6">Please log in to access your patient dashboard and manage your appointments.</p>
              <div className="space-x-4">
                <Link to="/login" className="bg-[#179fac] text-white px-6 py-3 rounded-lg hover:bg-[#147c88] transition">
                  Login
                </Link>
                <Link to="/register" className="border border-[#179fac] text-[#179fac] px-6 py-3 rounded-lg hover:bg-[#179fac] hover:text-white transition">
                  Register
                </Link>
              </div>
            </div>
          </div>
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Welcome back, {user.name || 'Patient'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Here's your health dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Doctor Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">My Doctor</h2>
              {dashboardData?.doctor ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <img
                        src={getImageUrl(dashboardData.doctor.userId?.profileImage)}
                        alt={`Dr. ${dashboardData.doctor.userId?.name || 'Doctor'}`}
                        className="w-full h-full object-cover"
                                                 onError={(e) => {
                           console.log('Image failed to load for doctor:', dashboardData.doctor.userId?.name);
                           e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
                         }}
                      />
                    </div>
                                         <div className="flex-1">
                       <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                         Dr. {dashboardData.doctor.userId?.name || 'Unknown'}
                       </h3>
                       <p className="text-gray-600 dark:text-gray-400">{dashboardData.doctor.specialization || 'General Physician'}</p>
                       <p className="text-sm text-gray-500 dark:text-gray-500">
                         {dashboardData.doctor.HospitalName || 'Not specified'} • {dashboardData.doctor.experiance || 0} years experience
                       </p>
                     </div>
                                         <button 
                       onClick={() => navigate('/bookAppointment')}
                       className="bg-[#179fac] dark:bg-[#0ea5e9] text-white px-4 py-2 rounded-lg hover:bg-[#147c88] dark:hover:bg-[#0284c7] transition"
                     >
                       Book Appointment
                     </button>
                  </div>
                  
                                     {/* Doctor Assignment History */}
                   <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                     <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-2">Assignment History</h4>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                       Assigned on: {new Date().toLocaleDateString()} {/* You can add actual assignment date */}
                     </p>
                   </div>
                </div>
              ) : (
                                 <div className="space-y-4">
                   <div className="text-center py-8">
                     <p className="text-gray-500 dark:text-gray-400 mb-4">No doctor assigned yet</p>
                     <button 
                       onClick={() => navigate('/bookAppointment')}
                       className="bg-[#179fac] dark:bg-[#0ea5e9] text-white px-4 py-2 rounded-lg hover:bg-[#147c88] dark:hover:bg-[#0284c7] transition"
                     >
                       Find a Doctor
                     </button>
                   </div>
                  
                                     {/* Available Doctors List */}
                   <div className="mt-4">
                     <h4 className="font-medium text-gray-900 dark:text-gray-200 mb-3">Available Doctors</h4>
                     <div className="space-y-3 max-h-60 overflow-y-auto">
                       {allDoctors.slice(0, 5).map((doctor) => (
                         <div key={doctor._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                           <div className="flex items-center space-x-3">
                             <img
                               src={getImageUrl(doctor.profileImage || doctor.userId?.profileImage)}
                               alt={`Dr. ${doctor.name || doctor.userId?.name}`}
                               className="w-10 h-10 rounded-full object-cover"
                                                              onError={(e) => {
                                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
                                }}
                             />
                             <div>
                               <p className="font-medium text-gray-900 dark:text-gray-200">Dr. {doctor.name || doctor.userId?.name || 'Unknown'}</p>
                               <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization || 'General Physician'}</p>
                             </div>
                           </div>
                           <button 
                             onClick={() => navigate('/bookAppointment', { state: { doctor } })}
                             className="text-[#179fac] dark:text-[#0ea5e9] hover:text-[#147c88] dark:hover:text-[#0284c7] text-sm font-medium"
                           >
                             Book
                           </button>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              )}
            </div>

            {/* Recent Appointments */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Recent Appointments</h2>
              {appointments.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">No appointments yet</p>
              ) : (
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {appointments.map((appointment) => (
                    <div key={appointment._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-200">
                            Appointment with Dr. {appointment.doctor?.userId?.name || 'Unknown'}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : "Date not set"} at {appointment.time || 'N/A'}
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-sm">{appointment.description || 'No description'}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          appointment.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                          'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {appointment.status || 'scheduled'}
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/bookAppointment')}
                  className="w-full bg-[#179fac] dark:bg-[#0ea5e9] text-white py-3 rounded-lg hover:bg-[#147c88] dark:hover:bg-[#0284c7] transition"
                >
                  Book New Appointment
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-full border border-[#179fac] dark:border-[#0ea5e9] text-[#179fac] dark:text-[#0ea5e9] py-3 rounded-lg hover:bg-[#179fac] dark:hover:bg-[#0ea5e9] hover:text-white transition"
                >
                  Find Doctors
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* Doctor Reviews */}
            {dashboardData?.reviews && dashboardData.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Doctor Reviews</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {dashboardData.reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-[#1694a4] pl-4">
                      <div className="flex items-center mb-1">
                        <div className="text-yellow-500 mr-2">
                          {"★".repeat(review.rating || 0)}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment || 'No comment'}</p>
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