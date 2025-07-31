// DoctorProfileCard.jsx
export default function DoctorProfileCard() {
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
          <button className="bg-[#179fac] cursor-pointer text-white px-7 py-2 rounded-full font-semibold shadow hover:bg-[#147c88] transition">
            Book Now
          </button>
          <button className="bg-white border cursor-pointer border-[#cfd8dc] text-[#179fac] px-7 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition">
            Reviews
          </button>
        </div>
      </div>
      {/* Profile image section */}
      <div className="flex-shrink-0 mr-100 mt-23">
        <div className="rounded-[40px] overflow-hidden border-[12px] border-black w-64 h-64 flex items-center justify-center">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Doctor Profile"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>

   </div>
  );
}
