import React, { useState, useEffect } from "react";
import doctorImage from "../assets/images/doctor.png";
import Calendar from "./components/Calender";
import { Link, useNavigate } from "react-router-dom";
import { doctorAPI, appointmentAPI } from "../services/api";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to get proper image URL
  const getImageUrl = (profileImage) => {
    if (!profileImage) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UDwvdGV4dD4KPC9zdmc+Cg==";
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
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UDwvdGV4dD4KPC9zdmc+Cg==";
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Only fetch data if user is logged in
        if (!user._id) {
          setLoading(false);
          return; // Don't redirect, just show empty state
        }

        console.log('Fetching doctor data for user:', user._id);
        // Fetch doctor's patients and appointments
        const [patientsResponse, appointmentsResponse] = await Promise.all([
          doctorAPI.getMyPatients(),
          appointmentAPI.getMyAppointments()
        ]);

        console.log('Patients response:', patientsResponse.data);
        console.log('Appointments response:', appointmentsResponse.data);
        
        // Debug: Log each appointment's patient data
        appointmentsResponse.data.forEach((appointment, index) => {
          console.log(`Appointment ${index}:`, {
            appointmentId: appointment._id,
            patient: appointment.patient,
            patientUserId: appointment.patient?.userId,
            patientName: appointment.patient?.userId?.name,
            fullAppointment: appointment
          });
        });

        setPatients(patientsResponse.data);
        setAppointments(appointmentsResponse.data);
        setDoctor(user);
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const testPatientData = async () => {
    try {
      const response = await appointmentAPI.testPatientData();
      console.log('Test patient data response:', response.data);
      alert('Check console for test data');
    } catch (error) {
      console.error('Test error:', error);
      alert('Test failed - check console');
    }
  };

  if (loading) {
    return (
      <div className="flex bg-gray-100 min-h-screen font-sans">
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex bg-gray-100 min-h-screen font-sans">
        <div className="flex-1 flex items-center justify-center">
          <p className="text-red-600">{error}</p>
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
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to HealthCare</h1>
              <p className="text-gray-600 mb-6">Please log in to access your doctor dashboard and manage your patients.</p>
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

  // Calculate today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => 
    apt.appointmentDate && apt.appointmentDate.split('T')[0] === today
  );

  // Calculate this month's appointments
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthAppointments = appointments.filter(apt => {
    if (!apt.appointmentDate) return false;
    const appointmentDate = new Date(apt.appointmentDate);
    return appointmentDate.getMonth() === currentMonth && appointmentDate.getFullYear() === currentYear;
  });

  const newPatients = patients.length;
  const oldPatients = appointments.length - newPatients;

  return (
    <div className="flex bg-gray-100 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-20 bg-teal-700 dark:bg-teal-800 p-8 flex flex-col items-center space-y-6 min-h-screen gap-5">
        <div className="w-10 h-10">
          <button onClick={handleLogout}>
            <img 
              className="h-5 w-5 cursor-pointer" 
              src="src/assets/images/icons8-logout-50.png" 
              alt="Logout" 
            />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light dark:text-gray-200">
            Good Morning <span className="font-bold text-teal-600 dark:text-teal-400">Dr. {doctor?.name || doctor?.userId?.name || 'Doctor'}!</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button 
              onClick={testPatientData}
              className="bg-red-500 text-white px-4 py-2 rounded text-sm"
            >
              Test Patient Data
            </button>
            <button><span className="icon-bell" /></button>
            <img src={doctorImage} alt="Doctor" className="w-12 h-12 rounded-full object-cover border-2 border-teal-400" />
            <span className="font-medium dark:text-gray-200">Dr. {doctor?.name || doctor?.userId?.name || 'Doctor'}</span>
          </div>
        </div>
        
        {/* Summary + Main Layout */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* Left 2/3 main */}
          <div className="col-span-2 space-y-6">
                         {/* Visits Summary */}
             <div className="rounded-xl shadow bg-white dark:bg-gray-800 p-6 flex items-center transition-colors duration-200">
               <div className="flex-1">
                 <div className="text-lg mb-4 font-medium dark:text-gray-200">Visits for Today</div>
                 <div className="text-4xl font-bold mb-2 dark:text-white">{todayAppointments.length}</div>
                 <div className="flex space-x-8">
                   <div>
                    {/*Comment to Comment Or Remove the following* */}
                    {/* <div className="text-gray-700 dark:text-gray-300">New Patients</div>
                     <div className="text-xl font-semibold dark:text-white">
                       {newPatients}
                       <span className="text-green-500 dark:text-green-400 ml-2 text-sm">
                         {newPatients > 0 ? Math.round((newPatients / patients.length) * 100) : 0}%
                       </span>
                     </div>*/ }
                   </div>
                  {/* <div>
                     <div className="text-gray-700 dark:text-gray-300">Old Patients</div>
                     <div className="text-xl font-semibold dark:text-white">
                       {oldPatients}
                       <span className="text-red-500 dark:text-red-400 ml-2 text-sm">
                         {oldPatients > 0 ? Math.round((oldPatients / appointments.length) * 100) : 0}%
                       </span>
                     </div>
                   </div> */}
                 </div>
               </div>
               <img src={doctorImage} alt="Doctor" className="w-32 h-32 rounded-xl object-cover ml-8" />
             </div>
            
            {/* Patient List + Consultation */}
            <div className="flex space-x-6">
                             {/* Patient List */}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-1/2 transition-colors duration-200">
                 <h3 className="font-semibold mb-4 dark:text-gray-200">Patient List</h3>
                 {patients.length === 0 ? (
                   <p className="text-gray-500 dark:text-gray-400 text-center py-4">No patients assigned yet</p>
                 ) : (
                   <div className="space-y-3 max-h-60 overflow-y-auto">
                     {patients.map((patient, idx) => (
                       <div key={patient._id || idx} className="flex items-center mb-4">
                         <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
                           <img
                             src={getImageUrl(patient.userId?.profileImage)}
                             alt={`${patient.userId?.name || 'Patient'}`}
                             className="w-full h-full object-cover"
                                                          onError={(e) => {
                                console.log('Image failed to load for patient:', patient.userId?.name);
                                e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjIwIiB5PSIyNCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UDwvdGV4dD4KPC9zdmc+Cg==";
                              }}
                           />
                         </div>
                         <div className="flex-1">
                           <div className="font-medium dark:text-gray-200">{patient.userId?.name || 'Unknown Patient'}</div>
                           <div className="text-xs text-gray-400 dark:text-gray-500">{patient.userId?.email || 'No email'}</div>
                         </div>
                         <div className="text-gray-700 dark:text-gray-300">-</div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
              
                             {/* Today's Appointments */}
               <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 w-1/2 transition-colors duration-200">
                 <h3 className="font-semibold mb-2 dark:text-gray-200">Today's Appointments</h3>
                 {todayAppointments.length === 0 ? (
                   <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                     <p className="text-gray-600 dark:text-gray-300">No appointments scheduled for today</p>
                   </div>
                 ) : (
                   <div className="space-y-3 max-h-60 overflow-y-auto">
                     {todayAppointments.map((appointment, idx) => (
                       <div key={appointment._id || idx} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                         <div className="font-medium text-teal-700 dark:text-teal-400 mb-2">
                           {appointment.patient?.userId?.name || 'Unknown Patient'}
                         </div>
                         <div className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                           {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'No date'}
                         </div>
                         <div className="text-sm dark:text-gray-300">
                           <b>Reason:</b> {appointment.description || 'No description'}
                         </div>
                         <div className="text-sm dark:text-gray-300">
                           <b>Status:</b> {appointment.status || 'scheduled'}
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
            </div>

                         {/* Monthly Appointments Summary */}
             <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 transition-colors duration-200">
               <h3 className="font-semibold mb-4 dark:text-gray-200">This Month's Appointments ({thisMonthAppointments.length})</h3>
               {thisMonthAppointments.length === 0 ? (
                 <p className="text-gray-500 dark:text-gray-400 text-center py-4">No appointments this month</p>
               ) : (
                 <div className="space-y-3 max-h-80 overflow-y-auto">
                   {thisMonthAppointments.map((appointment, idx) => (
                     <div key={appointment._id || idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                       <div className="flex justify-between items-start">
                         <div>
                           <h4 className="font-medium text-gray-900 dark:text-gray-200">
                             {appointment.patient?.userId?.name || 'Unknown Patient'}
                           </h4>
                           <p className="text-gray-600 dark:text-gray-400 text-sm">
                             {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'No date'} at {appointment.time || 'N/A'}
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
          
          {/* Right: Calendar */}
          <div>
            <Calendar></Calendar>
          </div>
        </div>
      </main>
    </div>
  );
}
