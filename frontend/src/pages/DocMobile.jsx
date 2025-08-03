import React from "react";
import doctorImage from "../assets/images/doctor.png";
import Calendar from "./components/Calender";
import { Link } from "react-router-dom";

const patients = [
  { initials: "SM", name: "Stacy Mitchell", time: "9:15 AM", tag: "Weekly Visit", tagColor: "bg-pink-100 text-pink-600" },
  { initials: "AD", name: "Amy Dunham", time: "9:30 AM", tag: "Routine Checkup", tagColor: "bg-blue-100 text-blue-600" },
  { initials: "DJ", name: "Demi Joan", time: "9:50 AM", tag: "Report", tagColor: "bg-green-100 text-green-600" },
  { initials: "SM", name: "Susan Myers", time: "10:00 AM", tag: "Weekly Visit", tagColor: "bg-pink-100 text-pink-600" }
];

export default function DoctormobileDashobaord() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-full md:w-20 bg-teal-700 p-4 md:p-8 flex md:flex-col items-center justify-between md:justify-start space-y-0 md:space-y-6 md:gap-5">
        <Link to="/login">
          <img className="h-6 w-6 md:h-5 md:w-5 cursor-pointer" src="src/assets/images/icons8-logout-50.png" alt="Logout" />
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-light text-center md:text-left">
            Good Morning <span className="font-bold text-teal-600">Dr. Kim!</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button><span className="icon-bell" /></button>
            <img src={doctorImage} alt="Doctor" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-teal-400" />
            <span className="font-medium">Dr. Kim</span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Left 2/3 */}
          <div className="md:col-span-2 space-y-6">
            {/* Visits Summary */}
            <div className="rounded-xl shadow bg-white p-4 md:p-6 flex flex-col md:flex-row items-center">
              <div className="flex-1 text-center md:text-left">
                <div className="text-base md:text-lg mb-2 font-medium">Visits for Today</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">104</div>
                <div className="flex justify-center md:justify-start space-x-6 md:space-x-8">
                  <div>
                    <div className="text-gray-700">New Patients</div>
                    <div className="text-lg font-semibold">
                      40 <span className="text-green-500 ml-1 text-sm">51%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-700">Old Patients</div>
                    <div className="text-lg font-semibold">
                      64 <span className="text-red-500 ml-1 text-sm">20%</span>
                    </div>
                  </div>
                </div>
              </div>
              <img src={doctorImage} alt="Doctor" className="w-24 h-24 md:w-32 md:h-32 rounded-xl object-cover mt-4 md:mt-0 md:ml-8" />
            </div>

            {/* Patient List + Consultation */}
            <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
              {/* Patient List */}
              <div className="bg-white rounded-xl shadow p-4 md:p-6 w-full md:w-1/2">
                <h3 className="font-semibold mb-4">Patient List</h3>
                {patients.map((p, idx) => (
                  <div key={idx} className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold ${p.tagColor}`}>
                      {p.initials}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.tag}</div>
                    </div>
                    <div className="text-gray-700 text-sm">{p.time}</div>
                  </div>
                ))}
              </div>

              {/* Consultation */}
              <div className="bg-white rounded-xl shadow p-4 md:p-6 w-full md:w-1/2">
                <h3 className="font-semibold mb-2">Consultation</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="font-medium text-teal-700 mb-2">Denzel White</div>
                  <div className="text-gray-500 text-sm mb-2">Male - 28 Years 3 Months</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span>🟣 Fever</span>
                    <span>🟣 Cough</span>
                    <span>🟣 Heart Burn</span>
                  </div>
                  <div className="mb-1 text-sm"><b>Last Checked:</b> Dr Evelyn on 21 April 2021 Prescription #ZJ983KTD</div>
                  <div className="mb-1 text-sm"><b>Observation:</b> High fever and cough at normal hemoglobin levels.</div>
                  <div className="text-sm"><b>Prescription:</b> Paracetamol - 2 times a day, Diazepam - Day and Night before meal, Wikoryl</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right 1/3 - Calendar */}
          <div className="w-full">
            <Calendar />
          </div>
        </div>
      </main>
    </div>
  );
}
