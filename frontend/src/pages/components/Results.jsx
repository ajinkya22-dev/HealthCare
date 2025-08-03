import AOS from "aos";
import { useEffect } from "react";


// ResultsInNumbers.jsx
export default function ResultsInNumbers() {
  useEffect(() => {
  AOS.init({
    duration: 800, // animation duration
    once: true     // animate only once
  });
}, []);
  return (
    <div  className="bg-gray-50  rounded-lg py-9 ">
      <h2 className="text-center text-[#179fac] font-semibold text-2xl mb-8">
        Our results in numbers
      </h2>
      <div className="flex gap-5 flex-wrap justify-around max-w-5xl  mx-auto">
        <div className="flex-1 min-w-[180px] text-center">
          <div className="text-4xl text-[#179fac] font-bold">99%</div>
          <div className="text-base font-medium text-[#222] mt-2">
            Customer satisfaction
          </div>
        </div>
        <div className="flex-1 min-w-[180px] text-center">
          <div className="text-4xl text-[#179fac] font-bold">15k</div>
          <div className="text-base font-medium text-[#222] mt-2">
            Online Patients
          </div>
        </div>
        <div className="flex-1 min-w-[180px] text-center">
          <div className="text-4xl text-[#179fac] font-bold">12k</div>
          <div className="text-base font-medium text-[#222] mt-2">
            Patients Recovered
          </div>
        </div>
        <div className="flex-1 min-w-[180px] text-center">
          <div className="text-4xl text-[#179fac] font-bold">240%</div>
          <div className="text-base font-medium text-[#222] mt-2">
            Company growth
          </div>
        </div>
      </div>
    </div>
  );
}

