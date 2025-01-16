import React, { useState } from "react";

const MonthComponent = ({ month, hijri_month, hijri_year,hijri_month_name_Ar, days }) => {
  const [selectedDay, setSelectedDay] = useState(null);

  console.log("days: ",days);
  
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

  const getDayDetails = (day) => {
    if (!day) return null;
    const dayData = day.find(
      (d) => d && parseInt(d.weekday) === day
    );
    return dayData || {};
  };


  const isHoliday = (day) => {
    return day?.hijri_holidays !=='None';
  };

  const isFirstDay = (day) => {
    return day?.hijri_day === '1';
  };
  const isToday = (day) => day?.isToday;

  // Calculate empty slots for alignment
  const firstDayOfWeek = days[0]?.weekdayIndex || 0; // Index of the first day (0 = Sunday, 1 = Monday, ...)
  const emptyDays = Array.from({ length: firstDayOfWeek }, () => null);

  return (
    <div className="container mx-auto rounded-lg shadow-lg p-2">
      {/* Color Indicator Section */}
      

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-4">
       
        <div className=" flex justify-between ">
          <h2 className="text-lg text-green-600 font-bold mr-1">
            {`(${hijri_month_name_Ar})`+hijri_month} - {hijri_year}
          </h2>
          <h3 className="ml-1 text-lg font-bold">
            {monthIndex[month]} - {days[0].date.split("-")[2]}
          </h3>
        </div>
       
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7  text-center font-semibold mb-2">
       
       
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-gray-700">{day}</div>
        ))}
      </div>
   

      {/* Calendar Days */}
      <div className="grid grid-cols-7  gap-2">
        {/* Empty slots */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="w-12 h-12"></div>
        ))}
        {/* Calendar Days */}
        {days.map((day, index) => {
        
        const details = getDayDetails(day);
   return (
          <div
            key={index}
            onClick={() => setSelectedDay(day)}
            className={`flex flex-col items-center justify-center   w-12 h-12 rounded-full cursor-pointer
              ${isHoliday(day) ? "bg-red-300" : ""}
              ${isFirstDay(day) ? "bg-green-400 border-2 border-green-500" : ""}
              ${isToday(day) ? "bg-blue-300 border-2 border-blue-500 text-blue-700 font-bold" : ""}
              ${
                !isHoliday(day) && !isFirstDay(day) && !isToday(day)
                  ? " hover:bg-gray-200"
                  : ""
              }`}
          >
           {day ? (
                  <>
                    <span className="text-[16px] text-green-600">
                      {details?.hijri?.day || day}
                    </span>
                    <span className="text-gray-800 text-[10px]">{day}</span>
                  </>
                ) : null}
          </div>
   )

    })}
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
