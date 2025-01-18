import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "../../../Components/Modal/Modal";

const FullYearHijriCalendar = ({ year }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);
const [isModalOpen, setModalOpen] = useState(false)
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

  console.log("selectedDay : ", selectedDay);

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
  }, [fetchFullYearData]);

  const handleClick=(dayDetails)=>{
   if(dayDetails ){
  setSelectedDay(dayDetails);
  setModalOpen(true);
   }
  }

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
        className="border  rounded-lg p-4 shadow-md bg-white"
      >
       
        <h3 className="text-lg font-bold text-center mb-2">
          {monthNames[monthIndex]}
        </h3>
        <div className="grid grid-cols-7 text-center font-semibold mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index} className="text-gray-700">
                {day}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const dayDetails = monthData.find(
              (d) => d && parseInt(d.gregorian.day) === day
            );
            const holiday = dayDetails?.hijri?.holidays?.length > 0;
            const isFirstDay = dayDetails?.hijri?.day === "1";

            return (
              <div key={index} className="flex justify-center">
                <div
                  className={`flex flex-col items-center m-1 p-3 justify-center w-10 h-10 rounded-md cursor-pointer 
                    ${!day ? "bg-transparent" : ""} 
                    ${holiday ? "bg-red-200" : ""} 
                    ${
                      isFirstDay ? "bg-green-300 border-2 border-green-400" : ""
                    }
                  `}
                  onClick={() => handleClick(dayDetails)}

                >
                  {day ? (
                    <>
                      <span className="text-xs text-green-600 m-1">
                        {dayDetails?.hijri?.day || day}
                      </span>
                      <span className="text-gray-800 text-[10px] m-1">
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
    <div className="container mx-auto p-4 bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-4">
        Hijri Calendar - {year}
      </h2>
      <div>
        {selectedDay && (
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
            <div className="mt-4 p-4 border rounded-lg bg-transparent shadow-md">
              <h3 className="text-lg text-center font-bold">Day Details</h3>
              <p>
                <strong>Gregorian:</strong>{" "}
                {selectedDay.gregorian?.date || "N/A"}
              </p>
              <p>
                <strong>Islamic(Hijri):</strong>{" "}
                {selectedDay.hijri?.date || "N/A"}
              </p>
              <p>
                <strong>Day (English):</strong>{" "}
                {selectedDay.hijri?.weekday?.en || "N/A"}
              </p>
              <p>
                <strong>Day (Arabic):</strong>{" "}
                {selectedDay.hijri?.weekday?.ar || "N/A"}
              </p>
              <p>
                <strong>Holidays:</strong>{" "}
                {selectedDay.hijri?.holidays?.join(", ") || "None"}
              </p>
            </div>
          </Modal>
        )}
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {calendarData.map((monthData, monthIndex) =>
            renderMonth(monthData, monthIndex)
          )}
        </div>
      )}
    </div>
  );
};

export default FullYearHijriCalendar;
