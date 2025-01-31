import React, { useEffect, useState } from "react";
import { getPrayerTime } from "../../apiServices/apiServices";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

const PrayerTimetable = () => {
  const [view, setView] = useState("monthly");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const city = sessionStorage.getItem('city');
    const country = sessionStorage.getItem('country');
    setCity(city);
    setCountry(country);
  }, []);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
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
    <>
      <div>
        <Breadcrumb pageName='Monthly Prayer Times Table' />
      </div>
      <div className="container mx-auto p-2 border rounded-lg bg-gradient-to-r from-teal-100 to-teal-200 shadow-lg max-w-md sm:max-w-4xl">
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
          </div>
        </div>

        {/* Location Info */}
        <div className="p-3 mb-3 font-semibold text-xl text-teal-700 text-center sm:text-left">
          {response[0]?.meta?.timezone && (
            <h3>This prayer Time is Based on your Location: {response[0]?.meta?.timezone}</h3>
          )}
        </div>

        {/* Month and Year Selectors */}
        <div className='flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-5 p-2'>
          <h4 className="text-lg font-semibold">Select Month and Year:</h4>
          <div className='flex justify-center items-center gap-2 sm:gap-4'>
            <select
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className='p-1 border-2 border-blue-500 rounded-lg shadow-lg w-28 sm:w-auto'
            >
              {monthNames.map((name, index) => (
                <option key={index} value={index + 1}>{name}</option>
              ))}
            </select>
            <input
              type='number'
              value={year}
              min={1000}
              max={9665}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 4 && !isNaN(value)) {
                  setYear(Math.min(Number(value), 9999));
                }
              }}
              onBlur={(e) => {
                if (e.target.value.length !== 4) {
                  alert("Please enter a valid 4-digit year.");
                  setYear(new Date().getFullYear());
                }
              }}
              className='p-1 border-2 border-blue-500 rounded-lg shadow-lg w-20 sm:w-24'
              placeholder='Year'
              pattern='\d{4}'
              required
            />
            <button
              onClick={fetchPrayerTime}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 whitespace-nowrap"
            >
              Go
            </button>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p>Month: {monthNames[month - 1]}, Year: {year}</p>
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
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead className="bg-teal-300 text-black">
                <tr>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Hijri</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Fajr</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Sunrise</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Dhuhr</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Asr</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Maghrib</th>
                  <th className="border border-gray-300 px-2 sm:px-4 py-2">Isha</th>
                </tr>
              </thead>
              <tbody>
                {response.map((item, index) => (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 === 0 ? "bg-teal-100" : "bg-teal-200"
                    }`}
                  >
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {item.date.gregorian.date} ({item.date.gregorian.weekday.en})
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">
                      {item.date.hijri.date} ({item.date.hijri.weekday.en})
                    </td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Fajr}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Sunrise}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Dhuhr}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Asr}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Maghrib}</td>
                    <td className="border border-gray-300 px-2 sm:px-4 py-2">{item.timings.Isha}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default PrayerTimetable;