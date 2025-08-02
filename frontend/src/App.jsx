import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
//import MedicalDashboard from "./pages/DoctorDash";
import DoctorDashboard from "./pages/DoctorDash";
import Login from "./pages/Login";
import Register from "./pages/Signup";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/contactUs" element={<Contact></Contact>}></Route>
        <Route path="/doctorDashboard" exact element={<DoctorDashboard></DoctorDashboard>}></Route>
        <Route path="/login" exact element={<Login></Login>}></Route>
        <Route path="/register" exact element={<Register></Register>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
