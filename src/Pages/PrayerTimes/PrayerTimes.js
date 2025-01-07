import React, { useEffect, useState } from "react";
import { getPrayerTime } from "../../apiServices/apiServices";

const PrayerTimetable = () => {
  const [view, setView] = useState("monthly"); // Switch between monthly and yearly view
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year

  const [response, setResponse] = useState([]); // To store fetched prayer times

  useEffect(() => {
    const fetchPrayerTime = async () => {
      const data = await getPrayerTime("Karachi", "Pakistan", 1, year, month);
      setResponse(data);
    };
    fetchPrayerTime();
  }, [year, month]);

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
  
  const [click, setclick] = useState(false)

  const handleClick =  () => {
    setclick(!click)
  }

  return (
    <div className="container mx-auto p-4 border rounded-lg bg-white shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Prayer Timetable</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded-md ${
              view === "monthly" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-2 rounded-md ${
              view === "yearly" ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Month and Year Selectors */}
      <div className="flex items-center space-x-4 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-md px-4 py-2"
        >
          {monthNames.map((name, index) => (
            <option key={index} value={index + 1}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border rounded-md px-4 py-2 w-24"
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
        
        onClick={handleClick}
        >
         Show
        </button>
   
      </div>
      <div>
        <p>
          Month: {monthNames[month - 1]}, Year: {year}
        </p>
      </div>

      {/* Toggle Chart View */}
      <div className="text-right mb-4">
        <button className="text-sm text-blue-500 hover:underline">
          {view === "monthly" ? "Hide monthly chart ▲" : "Show monthly chart ▼"}
        </button>
      </div>


      {/* Prayer Timetable */}
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Hijri</th>
            <th className="border border-gray-300 px-4 py-2">Fajr</th>
            <th className="border border-gray-300 px-4 py-2">Sunrise</th>
            <th className="border border-gray-300 px-4 py-2">Dhuhr</th>
            <th className="border border-gray-300 px-4 py-2">Asr</th>
            <th className="border border-gray-300 px-4 py-2">Maghrib</th>
            <th className="border border-gray-300 px-4 py-2">Isha</th>
          </tr>
        </thead>
        <tbody>
          {response.length > 0 ? (
            response.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {item.date.gregorian.date} ({item.date.gregorian.weekday.en})
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.date.hijri.date} ({item.date.hijri.weekday.en})
                </td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Fajr}</td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Sunrise}</td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Dhuhr}</td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Asr}</td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Maghrib}</td>
                <td className="border border-gray-300 px-4 py-2">{item.timings.Isha}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-4">
                Loading prayer times...
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
};

export default PrayerTimetable;
