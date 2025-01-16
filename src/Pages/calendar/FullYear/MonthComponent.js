import React, { useState } from "react";

const MonthComponent = ({ month, hijri_month, hijri_year, hijri_month_name_Ar, days }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const monthIndex = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const isHoliday = (day) => day?.hijri_holidays !== "None";
  const isFirstDay = (day) => day?.hijri_day === "1";
  const isToday = (day) => day?.isToday;

  // Calculate empty slots for alignment
  const firstDayOfWeek = days[0]?.weekdayIndex || 0; // Get the index of the first day of the month
  const emptyDays = Array.from({ length: firstDayOfWeek }, () => null); // Create placeholders for empty days

  // Combine empty days with actual days
  const calendarDays = [...emptyDays, ...days];

  return (
    <div className="container mx-auto rounded-lg shadow-lg p-2">
      {/* Month and Year */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between">
          <h2 className="text-lg text-green-600 font-bold mr-1">
            {`(${hijri_month_name_Ar})` + hijri_month} - {hijri_year}
          </h2>
          <h3 className="ml-1 text-lg font-bold">
            {monthIndex[month]} - {days[0]?.date.split("-")[2]}
          </h3>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-gray-700">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            onClick={() => day && setSelectedDay(day)}
            className={`flex flex-col items-center justify-center w-12 h-12 p-1 m-3 rounded-full cursor-pointer
              ${day && isHoliday(day) ? "bg-red-300" : ""}
              ${day && isFirstDay(day) ? "bg-green-400 border-2 border-green-500" : ""}
              ${day && isToday(day) ? "bg-blue-300 border-2 border-blue-500 text-blue-700 font-bold" : ""}
              ${
                day && !isHoliday(day) && !isFirstDay(day) && !isToday(day)
                  ? "hover:bg-gray-200"
                  : ""
              }`}
          >
            {day ? (
              <>
                <span className="text-[16px] text-green-600 m-1">{day.weekday}</span>
                <span className="text-gray-800 text-[10px] m-1">{day.date}</span>
              </>
            ) : null}
          </div>
        ))}
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-md">
          <h3 className="text-lg text-center font-bold">Day Details</h3>
          <p>
            <strong>Gregorian:</strong> {selectedDay.date || "N/A"}
          </p>
          <p>
            <strong>Islamic (Hijri):</strong> {selectedDay.hijri_date || "N/A"}
          </p>
          <p>
            <strong>Day (English):</strong> {selectedDay.weekday || "N/A"}
          </p>
          <p>
            <strong>Holiday (English):</strong> {selectedDay?.hijri_holidays || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default MonthComponent;
