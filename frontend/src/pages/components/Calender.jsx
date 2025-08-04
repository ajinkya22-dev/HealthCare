import React, { useState, useEffect } from "react";
import { appointmentAPI } from "../../services/api";

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Calendar() {
  const currentDate = new Date();
  const [date] = useState(currentDate);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user._id) {
          const response = await appointmentAPI.getMyAppointments();
          setAppointments(response.data);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lastDatePrevMonth = new Date(year, month, 0).getDate();

  const today = new Date();
  const todayDate = today.getDate();
  const isThisMonth = today.getMonth() === month && today.getFullYear() === year;

  // Extract appointment dates for current month
  const appointmentDates = appointments
    .filter(apt => {
      if (!apt.appointmentDate) return false;
      const aptDate = new Date(apt.appointmentDate);
      return aptDate.getMonth() === month && aptDate.getFullYear() === year;
    })
    .map(apt => new Date(apt.appointmentDate).getDate());

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

  if (loading) {
    return (
      <div className="w-[360px] p-6 rounded-xl bg-white shadow text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
      </div>
    );
  }

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
          const hasAppointment = appointmentDates.includes(day.value);

          return (
            <div
              key={idx}
              className={`text-center h-8 leading-8 rounded-full 
                ${!day.current ? "text-gray-400" : ""}
                ${hasAppointment && day.current ? "text-red-500 font-medium" : ""}
                ${isToday ? "bg-green-500 text-white font-bold" : ""}
              `}
            >
              {day.value}
            </div>
          );
        })}
      </div>
      
      {appointmentDates.length > 0 && (
        <div className="mt-4 text-xs text-gray-600">
          <span className="text-red-500">●</span> Appointment dates
        </div>
      )}
    </div>
  );
}
