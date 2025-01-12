import React from "react";

const MonthComponent = ({ month, hijri_month, hijri_year, days }) => {

  
  const monthIndex = {
   1: "January",
    2:"February",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"December"
  };

  return (
    <div className="bg-green-50 rounded-lg shadow-lg p-6 border border-yellow-500 text-black">
      <h2 className="text-2xl font-semibold text-center mb-4">
        {monthIndex[month]} - {days[0].date.split("-")[2]}
      </h2>
      <h2 className="text-2xl font-semibold text-center mb-4">
        {hijri_month} - {hijri_year}
      </h2>
      
      <div className="grid grid-cols-7 text-center text-sm font-medium mb-2">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-1 px-2 rounded-lg ${
              day.weekday === "Friday" ? "bg-yellow-500 text-black" : ""
            }`}
          >
            <div>{day.date.split("-")[0]}</div>
            <div className="text-xs">{day.hijri_date.split("-")[0]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthComponent;
