import React, { useEffect, useState } from "react";
import axios from "axios";

const IslamicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/gToHCalendar/03-01-2025/02-29-2025`
        );
        setCalendarData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Islamic Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {calendarData.map((day, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow-md"
          >
            <p className="text-lg font-bold text-gray-700">
              Gregorian: {day.gregorian.date}
            </p>
            <p className="text-lg font-semibold text-green-600">
              Islamic: {day.hijri.date}
            </p>
            <p className="text-sm text-gray-500">
              Day: {day.hijri.weekday.en}
            </p>
            <p className="text-sm text-gray-500">
              Day: {day.hijri.weekday.ar}
            </p>
            <p className="text-sm text-gray-500">
              Holi Days: {day.hijri.holidays[index]}
            </p>
            <hr/>
            <p className="text-sm text-gray-500">
            Gregorian: {day.gregorian.month.en} - [English]
            </p>
            <p className="text-sm text-gray-500">
            Islamic: {day.hijri.month.en}- [English]
            </p>
            <p className="text-sm text-gray-500">
            Islamic: {day.hijri.month.ar} - [Arbic]
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslamicCalendar;
