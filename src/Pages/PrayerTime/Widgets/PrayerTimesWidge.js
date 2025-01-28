import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPrayerTimeOfDayByAddress,
  getPrayerTimeOfDayByLocation,
} from "../../../apiServices/apiServices";
import SetLocation from "../../../Components/SetLocation/SetLocation";
// import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import bg from "../../../Assets/widgetBG.png";

const PrayerTimesWidge = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // Month is 0-indexed
  const date = today.getDate();

  const prayerDate = `${date}-${month}-${year}`;
  const [prayerResponse, setPrayerResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prayerLocation, setPrayerLocation] = useState({
    latitude: null,
    longitude: null,
    location: null,
  });

  // Load location from sessionStorage
  useEffect(() => {
    const latitude = sessionStorage.getItem("latitude");
    const longitude = sessionStorage.getItem("longitude");
    const location = sessionStorage.getItem("location");

    // console.log("Retrieved Location:", { latitude, longitude, location });

    if (latitude && longitude) {
      setPrayerLocation({ latitude, longitude, location: null });
    } else if (location) {
      setPrayerLocation({ latitude: null, longitude: null, location });
    } else {
      console.error("No location data found in sessionStorage.");
      setLoading(false);
    }
  }, []);

  // console.log("prayerLocation",prayerLocation);

  // Fetch prayer times
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        let response = null;
  
        if (prayerLocation.location) {
          // Fetch prayer times using location name
          response = await getPrayerTimeOfDayByAddress(
            prayerDate,
            prayerLocation.location
          );
        } else if (prayerLocation.latitude && prayerLocation.longitude) {
          // Fetch prayer times using latitude and longitude
          response = await getPrayerTimeOfDayByLocation(
            prayerDate,
            prayerLocation.latitude,
            prayerLocation.longitude
          );
        }
  
        if (response) {
          setPrayerResponse(response);
        } else {
          console.error("No response received for prayer times.");
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (
      (prayerLocation.latitude && prayerLocation.longitude) || 
      prayerLocation.location
    ) {
      fetchPrayerTimes();
    }
  }, [
    prayerLocation.latitude,
    prayerLocation.longitude,
    prayerLocation.location,
    prayerDate,
  ]);
  
  // Loading State
  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  // Error State
  if (!prayerResponse) {
    return (
      <div className=" text-xl text-center mt-10 text-red-600 py-5">
        <p className="text-red-600">
          Failed to load prayer times. Please try again later.
        </p>
        <div className="flex justify-center items-center ">
          <div className="rounded-lg text-center max-w-sm w-full ">
            <SetLocation  />
          </div>
        </div>
      </div>
    );
  }

  // Extracting Data from Response
  const { timings, date: prayerDateData } = prayerResponse;
  const hijriDate = `${prayerDateData.hijri.day} ${prayerDateData.hijri.month.en}, ${prayerDateData.hijri.year}`;
  // const gregorianDate = `${prayerDateData.gregorian.date}`;

  // Format Time to 12-Hour Clock
  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  // Determine Upcoming Prayer
  const upcomingPrayer = Object.entries(timings).find(([_, time]) => {
    const now = new Date();
    const [hour, minute] = time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0);
    return now < prayerTime;
  }) || ["Fajr", timings.Fajr];

  return (
    <div
      className="max-w-full mx-auto bg-gray-900 text-white px-1 sm:px-6 py-3 sm:py-5 shadow-lg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FEFBF1",
      }}
    >
      <div className="flex justify-between items-center gap-x-6">
        <div>
          <div className="flex items-center gap-4 justify-center">
            <h2 className="text-[25px] font-semibold">
              {upcomingPrayer[0]} {formatTime(upcomingPrayer[1])}
            </h2>
          </div>
          <div className="text-sm text-right my-1 px-3">
            <span className="mx-1">{hijriDate}</span>
            <span className="text-gray-400 mx-1">
              {prayerResponse?.meta?.timezone}
            </span>
          </div>
        </div>
        <div>
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
