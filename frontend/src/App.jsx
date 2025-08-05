import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import DoctorDashboard from "./pages/DoctorDash";
import PatientDashboard from "./pages/PatientDashboard";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import Calendar from "./pages/components/Calender";
import Appointment from "./pages/Appointment";
import BookDoctorProfile from "./pages/BookDoc";
import DoctormobileDashobaord from "./pages/DocMobile";

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/patientDashboard" element={<PatientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/appointments" element={<Appointment />} />
          <Route path="/bookAppointment" element={<BookDoctorProfile />} />
          <Route path="/doc" element={<DoctormobileDashobaord />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
