import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/doctorDashboard" exact element={<DoctorDashboard></DoctorDashboard>}></Route>
        <Route path="/patientDashboard" exact element={<PatientDashboard></PatientDashboard>}></Route>
        <Route path="/login" exact element={<Login></Login>}></Route>
        <Route path="/register" exact element={<Register></Register>}></Route>
        <Route path="/calendar" exact element={<Calendar></Calendar>}></Route>
        <Route path="/appointments" exact element={<Appointment></Appointment>}></Route>
        <Route path="/bookAppointment" exact element={<BookDoctorProfile></BookDoctorProfile>}></Route>
        <Route path="/doc" exact element={<DoctormobileDashobaord></DoctormobileDashobaord>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
