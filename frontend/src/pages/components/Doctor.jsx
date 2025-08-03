import { useNavigate } from "react-router-dom";

// DoctorProfileCard.jsx
export default function DoctorProfileCard() {
  const navigate = useNavigate();
  return (

   <div className="bg-gray-50  w-full ">
     <div className="bg-gray-50 rounded-xl flex flex-col md:flex-row items-center justify-between px-8  max-w-full mx-23 pb-10 ">
      {/* Left content */}
      <div className="flex-1 flex flex-col items-start md:mr-24 mb-8 md:mb-0 mt-50">
        <h2 className="text-2xl font-semibold text-[#1694a4] mb-2">
          Random Doctor profile here
        </h2>
        <p className="text-gray-500 mb-7 max-w-md text-sm">
          Lorem ipsum dolor sit amet consectetur adipiscing elit mattis sit phasellus mollis sit aliquam sit nullam.
        </p>
        <div className="flex gap-5">
          <button onClick={()=>{
            navigate("/bookAppointment")
            
          }} className="bg-[#179fac] cursor-pointer text-white px-7 py-2 rounded-full font-semibold shadow hover:bg-[#147c88] transition">
            Book Now
          </button>
          
        </div>
      </div>
      {/* Profile image section */}
      <div className="flex-shrink-0 mr-100 mt-23">
        <div className="rounded-[40px] overflow-hidden border-[12px] border-black w-64 h-64 flex items-center justify-center">
          <img 
            src="https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=612x612&w=0&k=20&c=zaa4MFrk76JzFKvn5AcYpsD8S0ePYYX_5wtuugCD3ig="
            alt="Doctor Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>

   </div>
  );
}
