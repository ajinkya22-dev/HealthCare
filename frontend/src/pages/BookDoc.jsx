import { toast } from 'react-toastify';



import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { appointmentAPI, doctorAPI, patientAPI } from "../services/api";
import Navbar from "../Navbar";

export default function BookDoctorProfile() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showDoctorList, setShowDoctorList] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

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
    // Get doctor data from location state
    if (location.state?.doctor) {
      console.log('Doctor data received:', location.state.doctor);
      setDoctor(location.state.doctor);
      setShowDoctorList(false);
    } else {
      // If no doctor selected, show doctor list
      fetchDoctors();
    }

    const today = new Date();
    const upcomingDates = [];
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      upcomingDates.push({
        day: nextDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: nextDate.getDate(),
        fullDate: nextDate.toISOString().split('T')[0],
      });
    }
    setDates(upcomingDates);
  }, [location.state]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleDoctorSelect = (selectedDoctor) => {
    setDoctor(selectedDoctor);
    setShowDoctorList(false);
  };

  const handleBookAppointment = async () => {
    if (!doctor || !selectedTime) return;

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user._id) {
        alert('Please login to book an appointment');
        navigate('/');
        return;
      }

      // First, get or create patient profile
      const patientResponse = await patientAPI.getProfile();
      const patient = patientResponse.data;

      const appointmentData = {
        doctorId: doctor._id,
        patientId: patient._id, // Use the patient ID instead of user ID
        appointmentDate: dates[selectedDate].fullDate,
        description: `Appointment with Dr. ${doctor.name || doctor.userId?.name || 'Doctor'} on ${dates[selectedDate].day}, ${dates[selectedDate].date} at ${selectedTime}`,
        time: selectedTime
      };

      await appointmentAPI.createAppointment(appointmentData);
     toast.success("Appointment booked successfully!");
      navigate('/patientDashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      const errorMessage = error.response?.data?.message || 'Failed to book appointment. Please try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Show doctor list if no specific doctor is selected
  if (showDoctorList) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8 mt-20">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Book an Appointment
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Select a doctor to book your appointment</p>
          </div>

          {doctors.length === 0 ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1694a4] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading doctors...</p>
            </div>
          ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {doctors.map((doctor) => (
                 <div key={doctor._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                   <div className="p-6">
                     <div className="flex items-center mb-4">
                       <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                         <img
                           src={getImageUrl(doctor.profileImage)}
                                                         alt={`Dr. ${doctor.name || doctor.userId?.name || 'Doctor'}`}
                           className="w-full h-full object-cover"
                                                      onError={(e) => {
                              e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
                            }}
                         />
                       </div>
                       <div>
                         <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                           Dr. {doctor.name || doctor.userId?.name || 'Unknown'}
                         </h3>
                         <p className="text-gray-600 dark:text-gray-400">{doctor.specialization || 'General Physician'}</p>
                       </div>
                     </div>
                     
                     <div className="space-y-2 mb-4">
                       <p className="text-sm text-gray-600 dark:text-gray-400">
                         <span className="font-medium">Experience:</span> {doctor.experiance || 0} years
                       </p>
                       <p className="text-sm text-gray-600 dark:text-gray-400">
                         <span className="font-medium">Hospital:</span> {doctor.HospitalName || 'Not specified'}
                       </p>
                       <p className="text-sm text-gray-600 dark:text-gray-400">
                         <span className="font-medium">Consultation Fee:</span> ₹{doctor.fees || 0}
                       </p>
                     </div>

                     <button 
                       onClick={() => handleDoctorSelect(doctor)}
                       className="w-full bg-[#179fac] dark:bg-[#0ea5e9] text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-[#147c88] dark:hover:bg-[#0284c7] transition"
                     >
                       Select Doctor
                     </button>
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    );
  }

  // Show booking form for selected doctor
  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <div className="max-w-4xl mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-center text-gray-600 dark:text-gray-400">No doctor selected. Please go back and select a doctor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Back Button */}
                 <button
           onClick={() => setShowDoctorList(true)}
           className="mb-6 text-[#179fac] dark:text-[#0ea5e9] hover:text-[#147c88] dark:hover:text-[#0284c7] flex items-center"
         >
           ← Back to Doctor List
         </button>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={getImageUrl(doctor.profileImage || doctor.userId?.profileImage)}
            alt={`Dr. ${doctor.name || doctor.userId?.name || 'Doctor'}`}
            className="w-48 h-60 object-cover rounded-md"
                         onError={(e) => {
               console.log('Image failed to load for doctor:', doctor.name || doctor.userId?.name);
               e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDIwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2Nzc0OEQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5EcjwvdGV4dD4KPC9zdmc+Cg==";
             }}
          />
                     <div className="flex-1">
             <h2 className="text-2xl font-semibold flex items-center gap-2 dark:text-gray-200">
               Dr. {doctor.name || doctor.userId?.name || 'Unknown'} <FaCheckCircle className="text-blue-500" />
             </h2>
             <p className="text-gray-500 dark:text-gray-400">{doctor.qualification || 'MBBS'} – {doctor.specialization || 'General Physician'}</p>
             <span className="inline-block mt-1 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 rounded-full dark:text-gray-300">
               {doctor.experiance || 0} Years Experience
             </span>
             <div className="mt-4">
               <h3 className="font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                 About <span className="text-sm text-gray-400 dark:text-gray-500">ℹ️</span>
               </h3>
               <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
               <ul>
                   <li>Hospital/Clinic: {doctor.HospitalName || 'Not specified'}</li> 
                   <li>License Number: {doctor.licenceNo || 'Not specified'}</li> 
                   <li>Specialization: {doctor.specialization || 'General Physician'}</li>      
               </ul>
               </p>
             </div>
             <p className="mt-4 font-medium text-gray-800 dark:text-gray-200">
               Appointment fee: <span className="font-bold">₹{doctor.fees || 0}</span>
             </p>
           </div>
        </div>

                 {/* Date Selector */}
         <div className="mt-10">
           <h3 className="text-md font-semibold mb-2 text-gray-700 dark:text-gray-300">
             Booking slots
           </h3>
           <div className="flex gap-2 overflow-x-auto">
             {dates.map((d, idx) => (
               <div
                 key={idx}
                 className={`flex flex-col items-center px-4 py-2 rounded-lg cursor-pointer ${
                   selectedDate === idx
                     ? "bg-blue-600 text-white"
                     : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                 }`}
                 onClick={() => {
                   setSelectedDate(idx);
                   setSelectedTime(null); // reset time on date change
                 }}
               >
                 <span className="text-xs font-semibold">{d.day}</span>
                 <span className="text-xl font-bold">{d.date}</span>
               </div>
             ))}
           </div>
         </div>

        {/* Time Slots */}
        <div className="flex flex-wrap gap-3 mt-6">
          {timeSlots.map((time, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-full border ${
                selectedTime === time
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <div className="mt-8">
          <button
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-6 py-3 rounded-full transition-all disabled:opacity-50"
            disabled={selectedTime === null || loading}
            onClick={handleBookAppointment}
          >
            {loading ? "Booking..." : "Book an appointment"}
          </button>
        </div>
      </div>
    </div>
  );
}
