import React, { useState, useEffect } from "react";

const Calendar = () => {
  const [month, setMonth] = useState(new Date().getMonth()); 
  const [year, setYear] = useState(new Date().getFullYear()); 
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [weekdayNames, setWeekdayNames] = useState(["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]);

  useEffect(() => {
    generateDaysInMonth(month, year);
  }, [month, year]);

  const generateDaysInMonth = (month, year) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Add blank days for the first row if the month doesn't start on Sunday
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Add actual days of the month
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    setDaysInMonth(days);
  };

  const handlePreviousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          Previous
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {monthNames[month]} - {year}
          </h2>
        </div>
        <button
          onClick={handleNextMonth}
          className="px-4 py-2 bg-gray-200 rounded-lg shadow-md hover:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Weekday Names */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {weekdayNames.map((day, index) => (
          <div key={index} className="text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Days in Month */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`h-16 w-16 flex items-center justify-center border rounded-md ${
              day ? "bg-white" : "bg-gray-100"
            }`}
          >
            {day ? (
              <span className="text-gray-800 font-medium">{day}</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
