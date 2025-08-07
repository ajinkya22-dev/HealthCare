// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
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
    <nav className="bg-gray-100 py-4 navbar fixed top-0 left-0 w-full shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <span className="text-xl font-semibold text-[#2ca181] ml-0">
              Medi<span className="text-[#8bc34a]">Connect</span>
            </span>
          </Link>
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 mx-15">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "py-2 px-3 font-semibold transition border-b-4" +
              (isActive
                ? " border-green-500 text-green-600"
                : " border-transparent text-gray-800  hover:text-green-500")
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
                : " border-transparent text-gray-800  hover:text-green-500")
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
                : " border-transparent text-gray-800  hover:text-green-500")
            }
          >
            Contact Us
          </NavLink>
          {!isLoggedIn ? (
            <>
              <Link to="/register" className="text-green-600  hover:underline">
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
              >
                Log In
              </Link>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Profile
            </button>
          )}
        </div>
        {/* Mobile Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-3xl text-[#179fac] focus:outline-none">
            {mobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 w-full z-50 animate-fade-in-down">
          <div className="flex flex-col items-center py-4 space-y-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "py-2 px-4 font-semibold w-full text-center" +
                (isActive ? " text-green-600" : " text-gray-800 hover:text-green-500")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/service"
              className={({ isActive }) =>
                "py-2 px-4 font-semibold w-full text-center" +
                (isActive ? " text-green-600" : " text-gray-800 hover:text-green-500")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Service
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                "py-2 px-4 font-semibold w-full text-center" +
                (isActive ? " text-green-600" : " text-gray-800 hover:text-green-500")
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </NavLink>
            {!isLoggedIn ? (
              <>
                <Link to="/register" className="text-green-600 hover:underline w-full text-center" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              </>
            ) : (
              <button
                onClick={() => { setMobileMenuOpen(false); toggleSidebar(); }}
                className="text-white px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors w-full text-center"
              >
                Profile
              </button>
            )}
          </div>
        </div>
      )}
      <Sidebar show={sidebarOpen} onClose={toggleSidebar} />
    </nav>
  );
};

export default Navbar;
