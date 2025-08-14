import React from "react";

const HeroSection = () => {
  return (
      <section className="bg-gray-50 px-4 pt-20 pb-10 md:pb-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8">

          {/* Left content */}
          <div className="w-full lg:w-1/2">
            <h1 className="font-semibold leading-tight text-left text-[1.4rem] sm:text-2xl md:text-4xl lg:text-5xl">
              Providing Quality <span className="text-teal-600">Healthcare</span> For A{" "}
              <span className="text-green-500">Brighter</span> And{" "}
              <span className="text-teal-500">Healthy</span> Future
            </h1>

            <p className="text-gray-700 mt-4 text-left text-sm sm:text-base md:text-lg max-w-xl">
              At Our Hospital, We Are Dedicated To Providing Exceptional Medical Care
              To Our Patients And Their Families. Our Experienced Team Of Medical
              Professionals, Cutting-Edge Technology, And Compassionate Approach Make
              Us A Leader In The Healthcare Industry.
            </p>
          </div>

          {/* Right content */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="rounded-xl overflow-hidden shadow-lg max-w-sm sm:max-w-md">
              <img
                  src="/heroimage.jpg"
                  alt="Doctor"
                  className="w-full h-auto object-cover"
              />
            </div>
          </div>

        </div>
      </section>
  );
};

export default HeroSection;
