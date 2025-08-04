import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { appointmentAPI } from "../services/api";

export default function BookDoctorProfile() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

  useEffect(() => {
    // Get doctor data from location state
    if (location.state?.doctor) {
      setDoctor(location.state.doctor);
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

  const handleBookAppointment = async () => {
    if (!doctor || !selectedTime) return;

    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user._id) {
        alert('Please login to book an appointment');
        navigate('/login');
        return;
      }

      const appointmentData = {
        doctorId: doctor._id,
        patientId: user._id,
        appointmentDate: dates[selectedDate].fullDate,
        description: `Appointment with Dr. ${doctor.name} on ${dates[selectedDate].day}, ${dates[selectedDate].date} at ${selectedTime}`,
        time: selectedTime
      };

      await appointmentAPI.createAppointment(appointmentData);
      alert('Appointment booked successfully!');
      navigate('/patientDashboard');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!doctor) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-gray-600">No doctor selected. Please go back and select a doctor.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src={doctor.profileImage || "https://via.placeholder.com/200x250?text=Dr"}
          alt={`Dr. ${doctor.name}`}
          className="w-48 h-60 object-cover rounded-md"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Dr. {doctor.name} <FaCheckCircle className="text-blue-500" />
          </h2>
          <p className="text-gray-500">{doctor.qualification} – {doctor.specialization}</p>
          <span className="inline-block mt-1 px-3 py-1 text-sm bg-gray-200 rounded-full">
            {doctor.experiance} Years Experience
          </span>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-1">
              About <span className="text-sm text-gray-400">ℹ️</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">
            <ul>
                <li>Hospital/Clinic: {doctor.HospitalName}</li> 
                <li>License Number: {doctor.licenceNo}</li> 
                <li>Specialization: {doctor.specialization}</li>      
            </ul>
            </p>
          </div>
          <p className="mt-4 font-medium text-gray-800">
            Appointment fee: <span className="font-bold">₹{doctor.fees}</span>
          </p>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mt-10">
        <h3 className="text-md font-semibold mb-2 text-gray-700">
          Booking slots
        </h3>
        <div className="flex gap-2 overflow-x-auto">
          {dates.map((d, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center px-4 py-2 rounded-lg cursor-pointer ${
                selectedDate === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
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
  );
}
