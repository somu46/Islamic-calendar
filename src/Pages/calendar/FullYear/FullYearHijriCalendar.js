import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "../../../Components/Modal/Modal";


const FullYearHijriCalendar = ({ year }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [today, setToday] = useState(new Date()); // State for today's date

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

  // Fetch full year calendar data
  const fetchFullYearData = useCallback(async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: 12 }, (_, index) => {
        const formattedMonth = String(index + 1).padStart(2, "0");
        return axios.get(
          `https://api.aladhan.com/v1/gToHCalendar/${formattedMonth}/${year}`
        );
      });

      const results = await Promise.all(promises);
      const data = results.map((res) => res.data.data || []);
      setCalendarData(data);
    } catch (error) {
      console.error("Error fetching full year calendar data:", error);
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    fetchFullYearData();
    setToday(new Date()); // Update today's date
  }, [fetchFullYearData]);

  const handleClick = (dayDetails) => {
    if (dayDetails) {
      setSelectedDay(dayDetails);
      setModalOpen(true);
    }
  };

  const renderMonth = (monthData, monthIndex) => {
    const daysInMonth = Array.from(
      { length: new Date(year, monthIndex + 1, 0).getDate() },
      (_, i) => i + 1
    );
    const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

    const days = Array(firstDayOfMonth).fill(null).concat(daysInMonth);

    return (
      <div
        key={monthIndex}
        className="border rounded-lg p-1 md:p-4 shadow-md bg-white"
      >
        <h3 className="text-sm md:text-lg font-bold text-center mb-2">
          {monthNames[monthIndex]}
        </h3>
        <div className="grid grid-cols-7 text-center font-semibold  sm:mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
            <div key={index} className="text-gray-700 text-[6.5px] sm:text-[15px]">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayDetails = monthData.find(
              (d) => d && parseInt(d.gregorian.day) === day
            );
            const holiday = dayDetails?.hijri?.holidays?.length > 0;
            const isFirstDay = dayDetails?.hijri?.day === "1";

            // Check if today matches the rendered day
            const isToday =
              day &&
              today.getDate() === day &&
              today.getMonth() === monthIndex &&
              today.getFullYear() === year;

            return (
              <div key={index} className="flex justify-center text-[8px] sm:text-[15px]">
                <div
                  className={`flex flex-col items-center m-[0.5px] p-[5.5px] justify-center w-[12px] h-[12px] sm:m-1 sm:p-3 md:w-12 md:h-12  sm:rounded-md cursor-pointer 
                    ${!day ? "bg-transparent" : ""} 
                    ${holiday ? "bg-red-200" : ""} 
                    ${isToday ? "bg-blue-300 border border-blue-800 font-bold text-blue-700" : ""}
                    ${
                      isFirstDay ? "bg-green-300 border border-green-400" : ""
                    }
                  `}
                  onClick={() => handleClick(dayDetails)}
                >
                  {day ? (
                    <>
                      <span className="text-md sm:text-green-500">
                        {dayDetails?.hijri?.day || day}
                      </span>
                      <span className="text-gray-800 text-[10px] hidden sm:block m-1">
                        {day}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-2 min-h-screen">
      
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Hijri Calendar - {year}
      </h2>
      <div>
        {selectedDay && (
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div className="mt-4 sm:p-4 rounded-lg bg-transparent">
              <h3 className="text-lg text-center font-bold mb-4">Day Details</h3>
              <table className="w-full border border-gray-200">
                <tbody>
                  <tr>
                    <td className="border px-2 sm:px-4 py-2 font-semibold">Gregorian Date</td>
                    <td className="border px-2 sm:px-4 py-2">
                      {selectedDay?.gregorian?.date || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 sm:px-4 py-2 font-semibold">Islamic (Hijri) Date</td>
                    <td className="border px-2 sm:px-4 py-2">
                      {selectedDay?.hijri?.date || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 sm:px-4 py-2 font-semibold">Day (English)</td>
                    <td className="border px-2 sm:px-4 py-2">
                      {selectedDay?.hijri?.weekday?.en || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 sm:px-4 sm:py-2 font-semibold">Day (Arabic)</td>
                    <td className="border px-2 sm:px-4 sm:py-2">
                      {selectedDay?.hijri?.weekday?.ar || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="border px-2 sm:px-4 sm:py-2 font-semibold">Holidays</td>
                    <td className="border px-2 sm:px-4 sm:py-2">
                      {selectedDay?.hijri?.holidays?.join(", ") || "None"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal>
        )}
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-3 gap-1 sm:gap-4">
          {calendarData.map((monthData, monthIndex) =>
            renderMonth(monthData, monthIndex)
          )}
        </div>
      )}
    </div>
  );
};

export default FullYearHijriCalendar;
