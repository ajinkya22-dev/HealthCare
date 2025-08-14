import React, { useState, useEffect } from "react";
import doctorImage from "../assets/images/doctor.png";
import Calendar from "./components/Calender.jsx"; // ✅ Corrected spelling from 'Calender'
import { Link, useNavigate } from "react-router-dom";
import { doctorAPI, appointmentAPI } from "../services/api";
import logoutImage from "../assets/images/logout.png";

export default function DoctorDashboard() {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Default avatar (light grey circle)
  const defaultAvatar =
      "https://via.placeholder.com/150/cccccc/ffffff?text=No+Image";

  // Function to get proper image URL
  const getImageUrl = (profileImage) => {
    if (!profileImage) return defaultAvatar;
    if (profileImage.startsWith("blob:")) return profileImage;
    if (profileImage.startsWith("uploads/")) {
      const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      return `${baseURL}/${profileImage}`;
    }
    if (profileImage.startsWith("http")) return profileImage;
    return defaultAvatar;
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        if (!user._id) {
          setLoading(false);
          return;
        }

        const [patientsResponse, appointmentsResponse] = await Promise.all([
          doctorAPI.getMyPatients(),
          appointmentAPI.getMyAppointments(),
        ]);

        setPatients(patientsResponse.data || []);
        setAppointments(appointmentsResponse.data || []);
        setDoctor(user);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
    );
  }

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isLoggedIn = user && user._id;

  if (!isLoggedIn) {
    return (
        <div className="flex bg-gray-100 min-h-screen">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 text-center w-full max-w-lg">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to HealthCare
              </h1>
              <p className="text-gray-600 mb-6">
                Please log in to access your doctor dashboard.
              </p>
              <div className="space-x-4">
                <Link
                    to="/login"
                    className="bg-[#179fac] text-white px-6 py-3 rounded-lg hover:bg-[#147c88] transition"
                >
                  Login
                </Link>
                <Link
                    to="/register"
                    className="border border-[#179fac] text-[#179fac] px-6 py-3 rounded-lg hover:bg-[#179fac] hover:text-white transition"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const todayAppointments = appointments.filter(
      (apt) =>
          apt.appointmentDate &&
          apt.appointmentDate.split("T")[0] === today
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthAppointments = appointments.filter((apt) => {
    if (!apt.appointmentDate) return false;
    const date = new Date(apt.appointmentDate);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  return (
      <div className="flex bg-white min-h-screen font-sans">
        {/* Sidebar Desktop */}
        <div className="hidden sm:flex w-20 bg-teal-700 p-6 flex-col items-center space-y-6 min-h-screen">
          <button onClick={handleLogout}>
            <img
                className="h-7 w-7 cursor-pointer"
                src={logoutImage}
                alt="Logout"
            />
          </button>
        </div>

        {/* Top bar Mobile */}
        <div className="sm:hidden fixed top-0 left-0 w-full bg-teal-700 text-white flex justify-between items-center p-4 z-50">
          <span className="font-bold">Dashboard</span>
          <button onClick={handleLogout} className="text-sm">
            Logout
          </button>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 pt-16 sm:pt-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h2 className="text-xl sm:text-2xl font-light text-gray-800 text-center sm:text-left">
              Good Morning{" "}
              <span className="font-bold text-teal-600">
              Dr. {doctor?.name || doctor?.userId?.name || "Doctor"}!
            </span>
            </h2>
            <div className="flex items-center space-x-4">
              <img
                  src={doctorImage}
                  alt="Doctor"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-teal-400"
              />
              <span className="font-medium text-gray-800 hidden sm:block">
              Dr. {doctor?.name || doctor?.userId?.name || "Doctor"}
            </span>
            </div>
          </div>

          {/* Summary + Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Left main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Visits Summary */}
              <div className="rounded-xl shadow bg-white p-6 flex flex-col sm:flex-row items-center sm:items-start">
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-lg mb-4 font-medium text-gray-800">
                    Visits for Today
                  </div>
                  <div className="text-4xl font-bold mb-2 text-gray-900">
                    {todayAppointments.length}
                  </div>
                </div>
                <img
                    src={doctorImage}
                    alt="Doctor"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover mt-4 sm:mt-0"
                />
              </div>

              {/* Patient Lists */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Today's Appointments */}
                <div className="bg-white rounded-xl shadow p-6 flex-1">
                  <h3 className="font-semibold mb-2 text-gray-800">
                    Today's Appointments
                  </h3>
                  {todayAppointments.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No appointments today
                      </p>
                  ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {todayAppointments.map((apt, idx) => (
                            <div
                                key={apt._id || idx}
                                className="bg-blue-50 p-4 rounded-lg"
                            >
                              <div className="font-medium text-teal-700">
                                {apt.patient?.userId?.name || "Unknown Patient"}
                              </div>
                              <div className="text-gray-500 text-sm">
                                {apt.appointmentDate
                                    ? new Date(apt.appointmentDate).toLocaleDateString()
                                    : "No date"}
                              </div>
                              <div className="text-sm">
                                <b>Status:</b> {apt.status || "N/A"}
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>

                {/* Monthly Appointments */}
                <div className="bg-white rounded-xl shadow p-6 flex-1">
                  <h3 className="font-semibold mb-4 text-gray-800">
                    Monthly Appointments
                  </h3>
                  {thisMonthAppointments.length === 0 ? (
                      <p className="text-gray-500 text-center py-4">
                        No appointments this month
                      </p>
                  ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {thisMonthAppointments.map((apt, idx) => (
                            <div
                                key={apt._id || idx}
                                className="flex items-center justify-between bg-gray-50 rounded p-3"
                            >
                              <div className="flex items-center">
                                <img
                                    src={getImageUrl(
                                        apt.patient?.userId?.profileImage
                                    )}
                                    alt={apt.patient?.userId?.name || "Patient"}
                                    className="w-10 h-10 rounded-full object-cover mr-4"
                                />
                                <div>
                                  <div className="font-medium text-gray-800">
                                    {apt.patient?.userId?.name || "Unknown"}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {apt.patient?.userId?.email || "No email"}
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-600">
                                  {apt.appointmentDate
                                      ? new Date(apt.appointmentDate).toLocaleDateString()
                                      : "No date"}
                                </div>
                                <div className="text-sm text-gray-700">
                                  <b>Status:</b> {apt.status || "N/A"}
                                </div>
                              </div>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div>
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4 text-gray-800">Calendar</h3>
                <Calendar appointments={appointments} />
              </div>
            </div>
          </div>

          {/* Manage Appointment Status */}
          <div className="w-full bg-white shadow-lg rounded-xl mt-12 p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
              Manage Appointment Status
            </h2>
            {thisMonthAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No appointments this month
                </p>
            ) : (
                <div className="space-y-4">
                  {thisMonthAppointments.map((apt, idx) => (
                      <div
                          key={apt._id || idx}
                          className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 rounded-lg p-4"
                      >
                        <div className="flex items-center mb-2 md:mb-0">
                          <img
                              src={getImageUrl(apt.patient?.userId?.profileImage)}
                              alt={apt.patient?.userId?.name || "Patient"}
                              className="w-12 h-12 rounded-full object-cover mr-4"
                          />
                          <div>
                            <div className="font-medium text-gray-800">
                              {apt.patient?.userId?.name || "Unknown Patient"}
                            </div>
                            <div className="text-xs text-gray-400">
                              {apt.patient?.userId?.email || "No email"}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="text-sm text-gray-600">
                            {apt.appointmentDate
                                ? new Date(apt.appointmentDate).toLocaleDateString()
                                : "No date"}
                          </div>
                          <select
                              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-gray-800"
                              value={apt.status}
                              onChange={async (e) => {
                                const newStatus = e.target.value;
                                try {
                                  await appointmentAPI.updateAppointmentStatus(
                                      apt._id,
                                      newStatus
                                  );
                                  apt.status = newStatus;
                                  setAppointments([...appointments]);
                                } catch (err) {
                                  alert("Failed to update status");
                                }
                              }}
                          >
                            <option value="scheduled">Scheduled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                  ))}
                </div>
            )}
          </div>
        </main>
      </div>
  );
}
