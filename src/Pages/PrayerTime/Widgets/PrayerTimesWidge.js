import React, { useEffect, useState } from "react";
import { getPrayerTimeOfDayByLocation } from "../../../apiServices/apiServices";
import { Link } from "react-router-dom";

const PrayerTimesWidge = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const todayDate = new Date().getDate();

  const prayerDate = `${todayDate}-${month + 1}-${year}`;
  const [prayerResponse, setPrayerResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prayerLocation, setPrayerLocation] = useState("Lahore, Pakistan");

  useEffect(() => {
    const location = sessionStorage.getItem("location");
    if (location) {
      setPrayerLocation(location);
    }
  }, []);

  useEffect(() => {
    const fetchPrayerTime = async () => {
      try {
        const response = await getPrayerTimeOfDayByLocation( );
        setPrayerResponse(response);
      } catch (error) {
        console.error("Error fetching prayer times:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTime();
  }, [prayerLocation, prayerDate]);

  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  if (!prayerResponse) {
    return <div className="text-center mt-10">Failed to load prayer times.</div>;
  }
  console.log("prayerResponse: " ,prayerResponse);
  

  const { timings, date } = prayerResponse;
  const hijriDate = `${date.hijri.day} ${date.hijri.month.en}, ${date.hijri.year}`;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; 
    return `${formattedHour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  };

  const upcomingPrayer =
    Object.entries(timings).find(([prayer, time]) => {
      const now = new Date();
      const [hour, minute] = time.split(":").map(Number);
      const prayerTime = new Date(now);
      prayerTime.setHours(hour, minute, 0);
      return now < prayerTime;
    }) || ["Fajr", timings.Fajr];

  return (
    <div className="max-w-full mx-auto bg-gray-900 text-white rounded-md px-1 sm:px-6 py-3 sm:py-5 shadow-lg">
      
      <div className="flex justify-between  items-center gap-x-6">
        <div className="">
          <div className="flex items-center gap-4 justify-center">
            <h2 className="text-[25px] font-semibold">
              {upcomingPrayer[0]} {formatTime(upcomingPrayer[1])}
            </h2>
          </div>
          <div className="text-sm text-right my-1 px-3">
            <span className="mx-1">{hijriDate}</span>
            <span className="text-gray-400 mx-1">{prayerResponse?.meta?.timezone}</span>
          </div>
        </div>
        <div className="">
          <Link
            to="/essentials/prayer-times"
            className="hover:underline text-[1rem] sm:text-lg font-bold hover:text-blue-600"
          >
            All Prayer times
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidge;
