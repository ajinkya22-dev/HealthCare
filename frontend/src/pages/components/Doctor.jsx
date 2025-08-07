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
        console.log('Fetching doctors from API...');
        const response = await doctorAPI.getAllDoctors();
        console.log('Doctors response:', response.data);
        setDoctors(response.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        // Don't show error for 401, just show empty state
        if (err.response?.status === 401) {
          setDoctors([]);
        } else {
          setError("Failed to load doctors");
        }
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent immediate API calls
    const timer = setTimeout(() => {
      fetchDoctors();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Function to get proper image URL
  const getImageUrl = (profileImage) => {
    if (!profileImage) {
      return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
    }
    
    // If it's a blob URL, return as is
    if (profileImage.startsWith('blob:')) {
      return profileImage;
    }
    
    // If it's a relative path, construct full URL
    if (profileImage.startsWith('uploads/')) {
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      return `${baseURL}/${profileImage}`;
    }
    
    // If it's already a full URL, return as is
    if (profileImage.startsWith('http')) {
      return profileImage;
    }
    
    // Default fallback
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
  };

  if (loading) {
    return (
      <div className="bg-gray-50 w-full py-12 md:py-20 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1694a4] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 w-full py-12 md:py-20 px-4">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-[#1694a4] text-white px-4 py-2 rounded hover:bg-[#147c88]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="bg-gray-50 w-full py-12 md:py-20 px-4">
        <div className="text-center">
          <p className="text-gray-600">No doctors available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1694a4] mb-8 md:mb-12">
          Our Expert Doctors
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {doctors.map((doctor) => {
            console.log('Rendering doctor:', {
              id: doctor._id,
              name: doctor.name || doctor.userId?.name,
              profileImage: doctor.profileImage || doctor.userId?.profileImage
            });
            
            return (
              <div key={doctor._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-4 md:p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mr-3 md:mr-4">
                      <img
                        src={getImageUrl(doctor.profileImage || doctor.userId?.profileImage)}
                        alt={`Dr. ${doctor.name || doctor.userId?.name || 'Doctor'}`}
                        className="w-full h-full object-cover"
                                                 onError={(e) => {
                           console.log('Image failed to load for doctor:', doctor.name || doctor.userId?.name);
                           e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjc3NDhEIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHI8L3RleHQ+Cjwvc3ZnPgo=";
                         }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                        Dr. {doctor.name || doctor.userId?.name || 'Unknown'}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">{doctor.specialization || 'General Physician'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 md:space-y-2 mb-4">
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium">Experience:</span> {doctor.experiance || 0} years
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium">Qualification:</span> {doctor.qualification || 'MBBS'}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium">Hospital:</span> {doctor.HospitalName || 'Not specified'}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600">
                      <span className="font-medium">Consultation Fee:</span> ₹{doctor.fees || 0}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate("/bookAppointment", { state: { doctor } })}
                      className="flex-1 cursor-pointer bg-[#179fac] text-white px-3 md:px-4 py-2 rounded-full font-semibold shadow hover:bg-[#147c88] transition text-sm md:text-base"
                    >
                      Book Appointment
                    </button>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
