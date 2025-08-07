// HeroSection.jsx
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gray-50 py-30 mx-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left content */}
        <div className="md:w-1/2 ml-25">
          <h1 className="text-3xl md:text-4xl font-semibold mb-4">
            Providing Quality <span className="text-teal-600">Healthcare</span> For A
            <br />
            <span className="text-green-500">Brighter</span> And{" "}
            <span className="text-teal-500">Healthy</span> Future
          </h1>
          <p className="text-gray-700 mb-8 max-w-md">
            At Our Hospital, We Are Dedicated To Providing Exceptional Medical Care To Our Patients And Their Families. Our Experienced Team Of Medical Professionals, Cutting-Edge Technology, And Compassionate Approach Make Us A Leader In The Healthcare Industry
          </p>

        </div>

        {/* Right content */}
        <div className="md:w-1/2 flex flex-col items-center mt-10 md:mt-0 relative mr-20">
          {/* Doctor Image */}
          <div className="  rounded-xl  relative  flex items-center justify-center">
            <img
              src="src\assets\images\heroimage.jpg"
              alt="Doctor"
              className="w-100 h-120 object-cover rounded-lg shadow-lg"
            />
            
            {/* Team professionals badge */}
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
