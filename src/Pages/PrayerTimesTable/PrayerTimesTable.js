import React, { useEffect, useState } from "react";
import { getPrayerTime } from "../../apiServices/apiServices";

const PrayerTimetable = () => {
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
const [city, setcity] = useState("");
const [country, setcountry] = useState("");

useEffect(() => {
  const city=sessionStorage.getItem('city');
 const  country=sessionStorage.getItem('country');
  setcity(city);
  setcountry(country);

}, []);

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

  const fetchPrayerTime = async () => {
    setLoading(true);
    setError(null);
    setDataLoaded(false);
    try {
      const data = await getPrayerTime(city, country, 1, year, month);
      if (data && Array.isArray(data)) {
        setResponse(data);
        setDataLoaded(true);
      } else {
        throw new Error("Invalid data format received from the API.");
      }
    } catch (err) {
      setError("Failed to fetch prayer times. Please try again later.");
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 border rounded-lg bg-white shadow-lg max-w-md sm:max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-center sm:text-xl">
          Prayer Timetable
        </h2>
        <div className="flex space-x-2 sm:space-x-4 mt-2 sm:mt-0">
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded-md ${
              view === "monthly"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-2 rounded-md ${
              view === "yearly"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Location Info */}
      <div className="p-3 mb-3 font-semibold text-lg text-center sm:text-left">
        <h3>Your are in: {country}/{city}</h3>
      </div>

      {/* Month and Year Selectors */}
      <div className="flex flex-wrap items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border rounded-md px-4 py-2 w-full sm:w-auto"
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
          className="border rounded-md px-4 py-2 w-full sm:w-auto"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md w-full sm:w-auto"
          onClick={fetchPrayerTime}
        >
          Show
        </button>
      </div>

      <div className="text-center sm:text-left">
        <p>
          Month: {monthNames[month - 1]}, Year: {year}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="mb-4 text-center">
          <p>Loading prayer times...</p>
        </div>
      )}

      {/* Prayer Timetable */}
      {!loading && !error && dataLoaded && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Date
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Hijri
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Fajr
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Sunrise
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Dhuhr
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Asr
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Maghrib
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2">
                  Isha
                </th>
              </tr>
            </thead>
            <tbody>
              {response.map((item, index) => (
                <tr key={index} className="text-center text-sm sm:text-base">
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.date.gregorian.date} (
                    {item.date.gregorian.weekday.en})
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.date.hijri.date} ({item.date.hijri.weekday.en})
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Fajr}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Sunrise}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Dhuhr}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Asr}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Maghrib}
                  </td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2">
                    {item.timings.Isha}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PrayerTimetable;
