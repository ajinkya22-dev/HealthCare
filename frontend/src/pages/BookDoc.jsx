import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function BookDoctorProfile() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00"];

  useEffect(() => {
    const today = new Date();
    const upcomingDates = [];
    for (let i = 0; i < 6; i++) {
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + i);
      upcomingDates.push({
        day: nextDate.toLocaleDateString("en-US", { weekday: "short" }),
        date: nextDate.getDate(),
      });
    }
    setDates(upcomingDates);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <img
          src="https://media.istockphoto.com/id/1161336374/photo/portrait-of-confident-young-medical-doctor-on-blue-background.jpg?s=612x612&w=0&k=20&c=zaa4MFrk76JzFKvn5AcYpsD8S0ePYYX_5wtuugCD3ig="
          alt="Doctor"
          className="w-48 h-60 object-cover rounded-md"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            Dr. Richard James <FaCheckCircle className="text-blue-500" />
          </h2>
          <p className="text-gray-500">MBBS – General Physician</p>
          <span className="inline-block mt-1 px-3 py-1 text-sm bg-gray-200 rounded-full">
            4 Years
          </span>
          <div className="mt-4">
            <h3 className="font-semibold text-gray-700 flex items-center gap-1">
              About <span className="text-sm text-gray-400">ℹ️</span>
            </h3>
            <p className="text-sm text-gray-600 mt-1">
            <ul>
                <li>Clinic Name : Bakchod</li> 
                <li>License Number : F45IT098</li> 
                <li>Specialization: Dermatology </li>      
            </ul>
            </p>
          </div>
          <p className="mt-4 font-medium text-gray-800">
            Appointment fee: <span className="font-bold">$50</span>
          </p>
        </div>
      </div>

      {/* Date Selector */}
      <div className="mt-10">
        <h3 className="text-md font-semibold mb-2 text-gray-700">
          Booking slots
        </h3>
        <div className="flex gap-2 overflow-x-auto">
          {dates.map((d, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center px-4 py-2 rounded-lg cursor-pointer ${
                selectedDate === idx
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                setSelectedDate(idx);
                setSelectedTime(null); // reset time on date change
              }}
            >
              <span className="text-xs font-semibold">{d.day}</span>
              <span className="text-xl font-bold">{d.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="flex flex-wrap gap-3 mt-6">
        {timeSlots.map((time, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full border ${
              selectedTime === time
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700"
            }`}
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Book Button */}
      <div className="mt-8">
        <button
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold px-6 py-3 rounded-full transition-all disabled:opacity-50"
          disabled={selectedTime === null}
          onClick={() =>
            alert(
              `Appointment booked on ${
                dates[selectedDate].day
              }, ${dates[selectedDate].date} at ${selectedTime}`
            )
          }
        >
          Book an appointment
        </button>
      </div>
    </div>
  );
}
