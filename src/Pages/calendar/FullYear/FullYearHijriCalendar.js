import React, { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import MonthComponent from "./MonthComponent";

const Calendar_BaseUrl = "https://api.aladhan.com/v1/gToHCalendar/";

const getCalendar = async (year, month) => {
  try {
    const response = await axios.get(`${Calendar_BaseUrl}/${month}/${year}`);
    // console.log("response.data.data: ",response.data.data);
    
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
      hijriCalendar.push({
        month,
        hijri_month: data[0]?.hijri.month.en,
        hijri_year: data[0]?.hijri.year,
        hijri_month_name_Ar: data[0]?.hijri.month.ar,
        days: data.map((entry) => ({
          weekday: entry.gregorian.weekday.en,
          date: entry.gregorian.date,
          hijri_date: entry.hijri.date,
          hijri_day: entry.hijri.day,
          hijri_holidays: entry.hijri?.holidays[0]||'None',
        })),
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

//  console.log("calendarData : ",calendarData);
 

  return (
    <div className="bg-gradient-to-b from-green-100 to-green-50 min-h-screen text-black  font-sans  ">
      <h1 className="text-4xl font-bold text-center mb-8">{year} Islamic Calendar</h1>

      {loading ? (
        <div className="text-center text-yellow-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calendarData.map(({ month, hijri_month, hijri_year,hijri_month_name_Ar, days }) => (
            <MonthComponent
              key={month}
              month={month}
              hijri_month={hijri_month}
              hijri_month_name_Ar={hijri_month_name_Ar}
              hijri_year={hijri_year}
              days={days}
            />
          ))}
        </div>
      )}

      <footer className="text-center mt-10">
        <p className="text-sm text-gray-300">Data fetched from Aladhan API</p>
      </footer>
    </div>
  );
};

export default FullYearHijriCalendar;
