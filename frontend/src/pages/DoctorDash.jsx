import React from "react";
import doctorImage from "../assets/images/doctor.png"; // Make sure to place your doctor image here

const patients = [
  { initials: "SM", name: "Stacy Mitchell", time: "9:15 AM", tag: "Weekly Visit", tagColor: "bg-pink-100 text-pink-600" },
  { initials: "AD", name: "Amy Dunham", time: "9:30 AM", tag: "Routine Checkup", tagColor: "bg-blue-100 text-blue-600" },
  { initials: "DJ", name: "Demi Joan", time: "9:50 AM", tag: "Report", tagColor: "bg-green-100 text-green-600" },
  { initials: "SM", name: "Susan Myers", time: "10:00 AM", tag: "Weekly Visit", tagColor: "bg-pink-100 text-pink-600" }
];

export default function DoctorDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen font-sans">
      {/* Sidebar */}
      <div className="w-20 bg-teal-700 p-8 flex flex-col items-center space-y-6 min-h-screen gap-5">
        <div className="w-10 h-10 "><img className="h-5 w-5" src="src\assets\images\icons8-logout-50.png" alt="" /></div>
        <div className="w-10 h-10 "><img className="h-5 w-5" src="src\assets\images\icons8-logout-50.png" alt="" /></div>
        <div className="w-10 h-10 "><img className="h-5 w-5" src="src\assets\images\icons8-logout-50.png" alt="" /></div>
        <div className="w-8 h-8 "><img className="h-5 w-5" src="src\assets\images\icons8-logout-50.png" alt="" /></div>
      </div>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-light">
            Good Morning <span className="font-bold text-teal-600">Dr. Kim!</span>
          </h2>
          <div className="flex items-center space-x-4">
            <button><span className="icon-bell" /></button>
            <img src={doctorImage} alt="Doctor" className="w-12 h-12 rounded-full object-cover border-2 border-teal-400" />
            <span className="font-medium">Dr. Kim</span>
          </div>
        </div>
        {/* Summary + Main Layout */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          {/* Left 2/3 main */}
          <div className="col-span-2 space-y-6">
            {/* Visits Summary */}
            <div className="rounded-xl shadow bg-white p-6 flex items-center">
              <div className="flex-1">
                <div className="text-lg mb-4 font-medium">Visits for Today</div>
                <div className="text-4xl font-bold mb-2">104</div>
                <div className="flex space-x-8">
                  <div>
                    <div className="text-gray-700">New Patients</div>
                    <div className="text-xl font-semibold">
                      40
                      <span className="text-green-500 ml-2 text-sm">51%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-700">Old Patients</div>
                    <div className="text-xl font-semibold">
                      64
                      <span className="text-red-500 ml-2 text-sm">20%</span>
                    </div>
                  </div>
                </div>
              </div>
              <img src={doctorImage} alt="Doctor" className="w-32 h-32 rounded-xl object-cover ml-8" />
            </div>
            {/* Patient List + Consultation */}
            <div className="flex space-x-6">
              {/* Patient List */}
              <div className="bg-white rounded-xl shadow p-6 w-1/2">
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
                    <div className="text-gray-700">{p.time}</div>
                  </div>
                ))}
              </div>
              {/* Consultation */}
              <div className="bg-white rounded-xl shadow p-6 w-1/2">
                <h3 className="font-semibold mb-2">Consultation</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="font-medium text-teal-700 mb-2">Denzel White</div>
                  <div className="text-gray-500 text-sm mb-2">Male - 28 Years 3 Months</div>
                  <div className="flex space-x-4 mb-2">
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
          {/* Right: Calendar */}
          <div>
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <div className="font-semibold mb-2">Calendar</div>
              <div className="text-sm text-gray-500 mb-3">September 2022</div>
              <table className="w-full text-center mb-3">
                <thead>
                  <tr>
                    <th className="text-xs text-gray-400">SUN</th>
                    <th className="text-xs text-gray-400">MON</th>
                    <th className="text-xs text-gray-400">TUE</th>
                    <th className="text-xs text-gray-400">WED</th>
                    <th className="text-xs text-gray-400">THU</th>
                    <th className="text-xs text-gray-400">FRI</th>
                    <th className="text-xs text-gray-400">SAT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>28</td><td>29</td><td>30</td><td>31</td><td>1</td><td>2</td><td>3</td></tr>
                  <tr><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td></tr>
                  <tr><td>11</td><td className="text-red-500">12</td><td>13</td><td className="text-red-500">14</td><td>15</td><td>16</td><td>17</td></tr>
                  <tr><td>18</td><td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td></tr>
                  <tr><td>25</td><td>26</td><td>27</td><td>28</td><td>29</td><td>30</td><td>1</td></tr>
                </tbody>
              </table>
              <div>
                <div className="font-semibold mt-4 text-sm">Upcoming</div>
                <div className="bg-blue-50 mt-2 rounded p-2 text-xs flex items-center">
                  <div className="bg-blue-400 h-6 w-6 rounded text-white flex items-center justify-center mr-2">M</div>
                  <span>Montly doctor's meet</span>
                  <span className="ml-auto text-gray-400">8 April, 2021 | 04:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
