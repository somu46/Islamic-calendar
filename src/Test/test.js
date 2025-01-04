import React, { useEffect, useState } from "react";
import axios from "axios";



const IslamicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [valueData, setvalueData] = useState("")


  // Extract year, month, and day from valueData
  const [year, month, day] = valueData?.split("-") || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!year || !month || !day) {
        console.error("Invalid valueData format");
        setLoading(false);
        return;
      }

      try {
        // Use a valid date range for the API
        const startDate = `${month}-${day}-${year}`;
        const endDate = `${month}-${day}-${year}`; // Same day for simplicity
        const response = await axios.get(
          `https://api.aladhan.com/v1/gToHCalendar/${startDate}/${endDate}`
        );

        setCalendarData(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calendar data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [valueData]);

  if (loading) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Islamic Calendar</h1>
      <div className="container mx-auto p-4 w-full flex justify-center mt-5 mb-3">
  <input type="date" placeholder="Enter the date" onChange={(event)=>setvalueData(event.target.value)} />
</div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {calendarData.map((day, index) => (
          <div key={index} className="border rounded-lg p-4 bg-white shadow-md">
            <p className="text-lg font-bold text-gray-700">
              Gregorian: {day.gregorian?.date || "N/A"}
            </p>
            <p className="text-lg font-semibold text-green-600">
              Islamic: {day.hijri?.date || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Day (English): {day.hijri?.weekday?.en || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Day (Arabic): {day.hijri?.weekday?.ar || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Holidays:{" "}
              <span className="text-red-600">
                {day.hijri?.holidays?.length
                  ? day.hijri.holidays.join(", ")
                  : "None"}
              </span>
            </p>
            <hr />
            <p className="text-sm text-gray-500">
              Gregorian Month (English): {day.gregorian?.month?.en || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Islamic Month (English): {day.hijri?.month?.en || "N/A"}
            </p>
            <p className="text-sm text-gray-500">
              Islamic Month (Arabic): {day.hijri?.month?.ar || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IslamicCalendar;
