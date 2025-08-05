// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import ThemeToggle from "./components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Check localStorage token or login flag
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser.token) {
          setIsLoggedIn(true);
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <nav className="bg-gray-100 dark:bg-gray-800 py-4 navbar fixed top-0 left-0 w-full shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <span className="text-xl font-semibold text-[#2ca181] dark:text-[#4ade80] ml-25">
              Health
              <span className="text-[#8bc34a] dark:text-[#22c55e]">care</span>
            </span>
          </Link>
        </div>
        
        {/* Nav Links */}
        <div className="flex items-center space-x-8 mx-15">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "py-2 px-3 font-semibold transition border-b-4" +
              (isActive
                ? " border-green-500 text-green-600 dark:text-green-400"
                : " border-transparent text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400")
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/service"
            className={({ isActive }) =>
              "py-2 px-3 font-semibold transition border-b-4" +
              (isActive
                ? " border-green-500 text-green-600 dark:text-green-400"
                : " border-transparent text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400")
            }
          >
            Service
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              "py-2 px-3 font-semibold transition border-b-4" +
              (isActive
                ? " border-green-500 text-green-600 dark:text-green-400"
                : " border-transparent text-gray-800 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400")
            }
          >
            Contact Us
          </NavLink>

          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-green-600 dark:text-green-400 hover:underline">
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-green-700 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
              >
                Log In
              </Link>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-white px-4 py-2 rounded bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
            >
              Profile
            </button>
          )}
          
          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
      <Sidebar show={sidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
