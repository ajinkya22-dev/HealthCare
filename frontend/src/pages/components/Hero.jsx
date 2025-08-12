import React from "react";

const HeroSection = () => {
  return (
      <section className="bg-gray-50 py-8 md:py-30 px-4 md:mx-5">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left content */}
          <div className="w-full md:w-1/2 md:ml-25 mb-8 md:mb-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 text-center md:text-left">
              Providing Quality <span className="text-teal-600">Healthcare</span> For A
              <br />
              <span className="text-green-500">Brighter</span> And{" "}
              <span className="text-teal-500">Healthy</span> Future
            </h1>
            <p className="text-gray-700 mb-8 max-w-md mx-auto md:mx-0 text-center md:text-left text-sm md:text-base">
              At Our Hospital, We Are Dedicated To Providing Exceptional Medical Care
              To Our Patients And Their Families. Our Experienced Team Of Medical
              Professionals, Cutting-Edge Technology, And Compassionate Approach Make
              Us A Leader In The Healthcare Industry
            </p>
          </div>

          {/* Right content */}
          <div className="w-full md:w-1/2 flex flex-col items-center mt-6 md:mt-0 relative md:mr-20">
            <div className="rounded-xl relative flex items-center justify-center">
              <img
                  src="/heroimage.jpg" // ✅ Public folder reference
                  alt="Doctor"
                  className="w-full md:w-100 h-auto md:h-120 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
  );
};

export default HeroSection;
