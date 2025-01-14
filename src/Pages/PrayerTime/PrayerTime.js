import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPrayerTimeOfDayByAddress } from "../../apiServices/apiServices";
import ApiTest from "../../Test/test";

const PrayerTimes = () => {

  const year=new Date().getFullYear();
  const month=new Date().getMonth();
  const todayDate=new Date().getDate();

  const prayerDate=`${todayDate}-${month+1}-${year}`;

  const [prayerResponse, setPrayerResponse] = useState(null);
  const [loading, setLoading] = useState(true);

 const [prayerLocation, setprayerLocation] = useState("bangladesh, dhaka");
 
 useEffect(() => {
  const location = sessionStorage.getItem("location");
  if (location) {
    setprayerLocation(location);
  }
}, []);

  useEffect(() => {
    const fetchPrayerTime = async () => {
      try {
        // console.log("Fetching prayer times for:", prayerLocation);
        ApiTest();
        const response = await getPrayerTimeOfDayByAddress(prayerDate, prayerLocation);
        // console.log("API Response:", response); // Debugging: Check the data structure
        setPrayerResponse(response);
      } catch (error) {
        console.log("Error fetching prayer times:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTime();
  }, [prayerLocation,prayerDate]);

  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  if (!prayerResponse) {
    return <div className="text-center mt-10">Failed to load prayer times.</div>;
  }

  // const { timings, date, meta } = prayerResponse;
  const { timings, date } = prayerResponse;
  const hijriDate = `${date.hijri.day} ${date.hijri.month.en}, ${date.hijri.year}`;
  const gregorianDate = `${date.gregorian.date}`;
  // const location = meta.timezone;

  // Determine the upcoming prayer dynamically
  const upcomingPrayer =
    Object.entries(timings).find(([prayer, time]) => {
      const now = new Date();
      const [hour, minute] = time.split(":").map(Number);
      const prayerTime = new Date(now);
      prayerTime.setHours(hour, minute, 0);
      return now < prayerTime;
    }) || ["Fajr", timings.Fajr]; // Default to Fajr if no upcoming prayer is found

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Prayer Times in {prayerLocation}
        </h2>
        <div className="text-sm text-gray-600 text-right">
          <p>{gregorianDate}</p>
          <p>{hijriDate}</p>
        </div>
      </div>

      {/* Upcoming Prayer */}
      <div className="flex items-center justify-between bg-blue-100 rounded-lg p-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600">Upcoming Prayer</p>
          <p className="text-lg font-semibold text-blue-600">
            {upcomingPrayer[0]}
          </p>
        </div>
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-800">
            {upcomingPrayer[1]}
          </p>
        </div>
      </div>

      {/* Prayer Times */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {Object.entries(timings).map(([prayer, time]) => (
          <div key={prayer} className="bg-gray-50 border rounded-lg p-2">
            <p className="text-sm font-medium text-gray-600">{prayer}</p>
            <p className="text-lg font-semibold text-gray-800">{time}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-4 text-sm text-gray-500">
        <p>{prayerLocation},Todays Date is :{prayerDate}</p>
        <Link to="#" className="text-blue-500 underline hover:text-blue-700">
          Change
        </Link>
      </div>
    </div>
  );
};

export default PrayerTimes;
