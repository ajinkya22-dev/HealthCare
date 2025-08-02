// Navbar.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  const navigate = useNavigate();
 
  
  return (
    <nav className="bg-gray-100 py-4 navbar fixed-top">
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
          <a
            href="/"
            className="text-black mx-5 font-medium   pb-[2px]"
          >
            Home
          </a>
          <a href="#" className="text-black font-medium hover:text-teal-700 mx-5">
            Service
          </a>
          <a href="/contactUs" className="text-black font-medium hover:text-teal-700 mr-20">
            Contact Us
          </a>
          <a
            href="/register"
            className="text-teal-600 font-medium ml-4 hover:underline"
          >
            Sign Up
          </a>
          <button  onClick={()=>{
            navigate("/login")
          }} className="bg-teal-700 text-white cursor-pointer font-bold rounded-xl px-8  py-2 ml-2">
            Log In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
