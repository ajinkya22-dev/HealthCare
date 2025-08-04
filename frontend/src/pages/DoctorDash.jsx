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


  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user._id) {
          navigate('/login');
          return;
        }

        // Fetch doctor's patients and appointments
        const [patientsResponse, appointmentsResponse] = await Promise.all([
          doctorAPI.getMyPatients(),
          appointmentAPI.getMyAppointments()
        ]);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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

  // Calculate today's appointments
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter(apt => 
    apt.appointmentDate && apt.appointmentDate.split('T')[0] === today
  );

  const newPatients = patients.length;
  const oldPatients = appointments.length - newPatients;

  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-20 bg-teal-700 p-8 flex flex-col items-center space-y-6 min-h-screen gap-5">
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
          <h2 className="text-2xl font-light">
            Good Morning <span className="font-bold text-teal-600">Dr. {doctor?.name || 'Doctor'}!</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button><span className="icon-bell" /></button>
            <img src={doctorImage} alt="Doctor" className="w-12 h-12 rounded-full object-cover border-2 border-teal-400" />
            <span className="font-medium">Dr. {doctor?.name || 'Doctor'}</span>
          </div>
        </div>
        
        {/* Summary + Main Layout */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* Left 2/3 main */}
          <div className="col-span-2 space-y-6">
            {/* Visits Summary */}
            <div className="rounded-xl shadow bg-white p-6 flex items-center">
              <div className="flex-1">
                <div className="text-lg mb-4 font-medium">Visits for Today</div>
                <div className="text-4xl font-bold mb-2">{todayAppointments.length}</div>
                <div className="flex space-x-8">
                  <div>
                    <div className="text-gray-700">New Patients</div>
                    <div className="text-xl font-semibold">
                      {newPatients}
                      <span className="text-green-500 ml-2 text-sm">
                        {newPatients > 0 ? Math.round((newPatients / patients.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-700">Old Patients</div>
                    <div className="text-xl font-semibold">
                      {oldPatients}
                      <span className="text-red-500 ml-2 text-sm">
                        {oldPatients > 0 ? Math.round((oldPatients / appointments.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <img src={doctorImage} alt="Doctor" className="w-32 h-32 rounded-xl object-cover ml-8" />
            </div>
            
            {/* Patient List + Consultation */}
            <div className="flex space-x-6">
              {/* Patient List */}
              <div className="bg-white rounded-xl shadow p-6 w-1/2">
                <h3 className="font-semibold mb-4">Patient List</h3>
                {patients.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No patients assigned yet</p>
                ) : (
                  patients.slice(0, 4).map((patient, idx) => (
                    <div key={patient._id || idx} className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold bg-blue-100 text-blue-600">
                        {patient.userId?.name?.charAt(0) || 'P'}
                      </div>
                      <div className="flex-1">
                        { /* doubt */}
                        <div className="font-medium">{patient.userId?.name || 'Patient'}</div>
                        <div className="text-xs text-gray-400">{patient.userId?.email || 'No email'}</div>
                      </div>
                      <div className="text-gray-700">-</div>
                    </div>
                  ))
                )}
              </div>
              
              {/* Consultation */}
              <div className="bg-white rounded-xl shadow p-6 w-1/2">
                <h3 className="font-semibold mb-2">Today's Appointments</h3>
                {todayAppointments.length === 0 ? (
                  <div className="bg-blue-50 p-4 rounded-lg mb-4">
                    <p className="text-gray-600">No appointments scheduled for today</p>
                  </div>
                ) : (
                  todayAppointments.slice(0, 3).map((appointment, idx) => (
                    <div key={appointment._id || idx} className="bg-blue-50 p-4 rounded-lg mb-4">
                      <div className="font-medium text-teal-700 mb-2">
                        {appointment.patient?.name || 'Patient'}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        {appointment.appointmentDate ? new Date(appointment.appointmentDate).toLocaleDateString() : 'No date'}
                      </div>
                      <div className="text-sm">
                        <b>Reason:</b> {appointment.description || 'No description'}
                      </div>
                      <div className="text-sm">
                        <b>Status:</b> {appointment.status || 'scheduled'}
                      </div>
                    </div>
                  ))
                )}
              </div>
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
