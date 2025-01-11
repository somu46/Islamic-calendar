import React, { useState, useEffect } from "react";
import axios from "axios";

const Calendar_BaseUrl = "https://api.aladhan.com/v1/gToHCalendar/";

const getCalendar = async (year, month) => {
  try {
    const response = await axios.get(`${Calendar_BaseUrl}/${month}/${year}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching data for ${year}-${month}:`, error);
    return [];
  }
};

const getFullHijriCalendar = async (year) => {
  const hijriCalendar = [];
  for (let month = 1; month <= 12; month++) {
    try {
      const data = await getCalendar(year, month);
      data.forEach((entry) => {
        hijriCalendar.push({
          gregorian: entry.gregorian.date,
          hijri: entry.hijri.date,
          hijri_month: entry.hijri.month.en,
          hijri_year: entry.hijri.year,
        });
      });
    } catch (error) {
      console.error(`Error fetching data for month ${month}:`, error);
    }
  }
  return hijriCalendar;
};

const FullYearHijriCalendar = ({ year }) => {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      const data = await getFullHijriCalendar(year);
      setCalendarData(data);
      setLoading(false);
    };

    fetchCalendar();
  }, [year]);

  // Group data by months
  const months = [...Array(12).keys()].map((i) => ({
    month: i + 1,
    data: calendarData.filter((date) => {
      const [year, month] = date.gregorian.split("-");
      return parseInt(month) === i + 1;
    }),
  }));

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        Hijri Calendar for {year}
      </h1>
      {loading ? (
        <div className="text-center text-blue-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {months.map(({ month, data }) => (
            <div
              key={month}
              className="border rounded-lg shadow-md p-4 bg-white"
            >
              <h2 className="text-lg font-semibold text-center mb-3">
                Month: {month}
              </h2>
              <ul className="text-sm text-gray-700 space-y-2">
                {data.map((date, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="font-medium">
                      {date.gregorian} (Gregorian)
                    </span>
                    <span>{date.hijri} (Hijri)</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FullYearHijriCalendar;
