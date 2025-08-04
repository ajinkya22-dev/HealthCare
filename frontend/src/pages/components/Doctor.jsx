import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { doctorAPI } from "@/services/api.js";

// DoctorProfileCard.jsx
export default function DoctorProfileCard() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorAPI.getAllDoctors();
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 w-full py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1694a4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 w-full py-20">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-gray-50 w-full py-20">
        <div className="text-center">
          <p className="text-gray-600">No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-[#1694a4] mb-12">
          Our Expert Doctors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                        src={
                          doctor.profileImage
                              ? `http://localhost:5000/${doctor.profileImage}`
                              : "https://via.placeholder.com/64x64?text=Dr"
                        }
                        alt={`Dr. ${doctor.name}`}
                        className="w-full h-full object-cover"
                    />

                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">Dr. {doctor.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Experience:</span> {doctor.experiance} years
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Qualification:</span> {doctor.qualification}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Hospital:</span> {doctor.HospitalName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Consultation Fee:</span> ₹{doctor.fees}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => navigate("/bookAppointment", { state: { doctor } })}
                    className="flex-1 bg-[#179fac] text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-[#147c88] transition"
                  >
                    Book Appointment
                  </button>
                  <button 
                    onClick={() => navigate(`/doctor/${doctor._id}`)}
                    className="px-4 py-2 border border-[#179fac] text-[#179fac] rounded-full hover:bg-[#179fac] hover:text-white transition"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
