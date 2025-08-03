import React, { useState } from "react";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Add any event dates here
const eventDates = [12, 14];

export default function Calendar() {
  const currentDate = new Date();
  const [date] = useState(currentDate);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDatePrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayDate = today.getDate();
  const isThisMonth = today.getMonth() === month && today.getFullYear() === year;

  const generateCalendar = () => {
    const dates = [];

    // Previous month trailing days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      dates.push({
        value: lastDatePrevMonth - i,
        current: false,
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        value: i,
        current: true,
      });
    }

    return dates;
  };

  return (
    <div className="w-[360px] p-6 rounded-xl bg-white shadow text-center">
      <h2 className="text-lg font-semibold mb-1">Calendar</h2>
      <p className="text-sm font-medium mb-3">
        {date.toLocaleString("default", { month: "long" })} {year}
      </p>

      <div className="grid grid-cols-7 text-xs font-medium text-gray-500 mb-2">
        {days.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-sm gap-y-1">
        {generateCalendar().map((day, idx) => {
          const isToday =
            isThisMonth && day.current && day.value === todayDate;

          return (
            <div
              key={idx}
              className={`text-center h-8 leading-8 rounded-full 
                ${!day.current ? "text-gray-400" : ""}
                ${eventDates.includes(day.value) && day.current ? "text-red-500 font-medium" : ""}
                ${isToday ? "bg-green-500 text-white font-bold" : ""}
              `}
            >
              {day.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
