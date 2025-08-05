// Sidebar.jsx
import {
  CalendarDaysIcon,
  BellIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ show, onClose }) {
  const [testResultCount] = useState(5); // simulate the "5" badge
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleMyAppointments = () => {
    navigate("/patientDashboard");
    onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    onClose();
  };

  // Get user's first letter for avatar
  const getUserInitial = () => {
    if (user?.name) {
      return user.name.charAt(0).toUpperCase();
    }
    return "U";
  };

  return (
    <>
      {/* Overlay Background */}
      {show && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40 "
          onClick={onClose}
        />
      )}

      {/* Right Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300
        ${show ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Profile and heading */}
          <div>
            <div className="flex flex-col items-center py-6">
              <div className="bg-violet-500 w-14 h-14 flex items-center justify-center rounded-full text-white text-3xl font-bold">
                {getUserInitial()}
              </div>
              <div className="font-bold text-lg mt-2 tracking-wide">
                {user?.name || 'User'}
              </div>
            </div>

            {/* Menu group */}
            <div className="px-6 text-gray-400 text-xs mb-2">Menu</div>
            <nav>
              <ul className="flex flex-col gap-2 px-2">
                <li>
                 <button 
                   onClick={handleMyAppointments}
                   className="flex items-center gap-3 px-4 py-3 rounded-lg text-violet-600 bg-violet-100 font-medium w-full text-left hover:bg-violet-200"
                 >
                    <CalendarDaysIcon className="w-6 h-6" />
                    My Appointments
                 </button>
                </li>
                <li>
                 <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-gray-100">
                    <BellIcon className="w-6 h-6" />
                    Notifications
                  </Link>
                </li>
                <li>
                 <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-500 hover:bg-gray-100">
                    <Cog6ToothIcon className="w-6 h-6" />
                    Settings
                   </Link>
                </li>
                <li>
                 <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-500 hover:bg-gray-100 relative">
                    <DocumentTextIcon className="w-6 h-6" />
                    Test Results
                    {testResultCount > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                        {testResultCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li>
                 <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-600 hover:bg-gray-100">
                    <ClipboardDocumentCheckIcon className="w-6 h-6" />
                    Prescription
                   </Link>
                </li>
                <li>
                  <Link className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 hover:bg-gray-100">
                    <ChatBubbleLeftRightIcon className="w-6 h-6" />
                    Feedback
                   </Link>
                </li>
                {/* Logout icon only, no text link */}
                <li className="flex items-center justify-center mt-4">
                  <button 
                    onClick={handleLogout}
                    className="p-2 rounded-full hover:bg-gray-200"
                    title="Logout"
                  >
                    <ArrowRightOnRectangleIcon className="w-8 h-8 text-black" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Help & Support and footer */}
          <div className="px-2 pb-6">
            <div className="flex items-center justify-between px-4 mb-2">
              <div className="flex-1 h-1 rounded-full bg-violet-200 relative">
                <div className="w-1/6 h-1 rounded-full bg-violet-600 absolute top-0 left-0"></div>
              </div>
            </div>
            <div className="text-xs text-gray-800 px-4 font-medium">Help &amp; Support</div>
            <div className="text-xs text-gray-400 px-4 mt-1">MediConnect</div>
          </div>
        </div>
      </aside>
    </>
  );
}
