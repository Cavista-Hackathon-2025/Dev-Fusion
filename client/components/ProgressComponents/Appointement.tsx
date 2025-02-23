"use client";

import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { MoreHorizontal, ArrowDown, ArrowUp } from "lucide-react";
import "react-calendar/dist/Calendar.css";

// Define the safe type for the calendar value
type CalendarValue = Date | [Date, Date] | null;

const AppointmentCalendar: React.FC = () => {
  const [date, setDate] = useState<CalendarValue>(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleToggleCalendar = () => {
    setIsVisible((prev) => !prev);
  };

  const handleFullscreen = () => {
    const calendarElement = document.getElementById("calendar-box");
    if (calendarElement) {
      if (!isFullscreen) {
        calendarElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    // Explicitly handle different value types (Date, Range<Date>, or null)
    if (value === null || value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value.length === 2 && value.every((v) => v instanceof Date)) {
      setDate(value as [Date, Date]);  // Safely cast to [Date, Date]
    }
  };

  return (
    <div
      className="relative bg-white shadow-lg flex flex-col items-center justify-center w-full max-w-lg mx-auto rounded-lg overflow-hidden"
      id="calendar-container"
    >
      <div className="flex justify-between items-center w-full p-4 bg-gray-100 border-b">
        <h4 className="text-lg font-bold">Appointment</h4>
        <ul className="flex items-center space-x-4">
          <li className="relative">
            <button aria-expanded="false" className="text-gray-500 hover:text-gray-700">
              <MoreHorizontal size={20} />
            </button>
          </li>
          <li>
            <button
              onClick={handleFullscreen}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Fullscreen
            </button>
          </li>
          <li>
            <button
              onClick={handleToggleCalendar}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              {isVisible ? <ArrowUp size={20} /> : <ArrowDown size={20} />}
            </button>
          </li>
        </ul>
      </div>

      {isVisible && (
        <div id="calendar-box" className="flex justify-center items-center w-full p-4">
          <Calendar onChange={handleDateChange} value={date} className="mx-auto" />
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;
