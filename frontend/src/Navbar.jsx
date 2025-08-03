// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";




const Navbar = () => {
  const navigate = useNavigate();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check localStorage token or login flag
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };
 
  
  return (
    <nav className="bg-gray-100 py-4 navbar fixed top-0 left-0 w-full shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
       
          <span className="text-xl font-semibold text-[#2ca181] ml-25">
            Health
            <span className="text-[#8bc34a]">care</span>
          </span>
        </div>
        

        {/* Nav Links */}
        <div className="flex items-center space-x-8 mx-15">
         <NavLink
        to="/"
        className={({ isActive }) =>
          "py-2 px-3 font-semibold transition border-b-4" +
          (isActive
            ? " border-green-500 text-green-600"
            : " border-transparent text-gray-800 hover:text-green-500")
        }
      >
        Home
      </NavLink>
         <NavLink
        to="/service"
        className={({ isActive }) =>
          "py-2 px-3 font-semibold transition border-b-4" +
          (isActive
            ? " border-green-500 text-green-600"
            : " border-transparent text-gray-800 hover:text-green-500")
        }
      >
        Service
      </NavLink>
         <NavLink
        to="/contact"
        className={({ isActive }) =>
          "py-2 px-3 font-semibold transition border-b-4" +
          (isActive
            ? " border-green-500 text-green-600"
            : " border-transparent text-gray-800 hover:text-green-500")
        }
      >
        Contact Us
      </NavLink>
           {!isLoggedIn ? (
          <>
            <Link to="/register" className="text-green-600 hover:underline">
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Log In
            </Link>
          </>
        ) : (
          <>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Log Out
          </button>

           <button
           onClick={toggleSidebar}
            className=" text-white px-4 py-2 rounded bg-blue-500"
          >
           Profile
          </button>

          </>

          
        )}
        </div>
      </div>
      <Sidebar show={sidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
