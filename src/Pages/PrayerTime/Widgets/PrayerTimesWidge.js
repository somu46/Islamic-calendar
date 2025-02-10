import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPrayerTimeOfDayByAddress,
  getPrayerTimeOfDayByLocation,
} from "../../../apiServices/apiServices";
import SetLocation from "../../../Components/SetLocation/SetLocation";
import bg from "../../../Assets/widgetBG.png";

const PrayerTimesWidge = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const prayerDate = `${date}-${month}-${year}`;

  const [prayerResponse, setPrayerResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [prayerLocation, setPrayerLocation] = useState({
    latitude: null,
    longitude: null,
    location: null,
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load location and handle storage changes
  useEffect(() => {
    const loadLocation = () => {
      const latitude = sessionStorage.getItem("latitude");
      const longitude = sessionStorage.getItem("longitude");
      const location = sessionStorage.getItem("location");

      if (latitude && longitude) {
        setPrayerLocation({ latitude, longitude, location: null });
      } else if (location) {
        setPrayerLocation({ latitude: null, longitude: null, location });
      } else {
        setLoading(false);
        setError("Please set your location to view prayer times");
      }
    };

    // Initial load
    loadLocation();

    // Storage event listener
    const handleStorageChange = (e) => {
      if (["latitude", "longitude", "location"].includes(e.key)) {
        loadLocation();
        setRefreshTrigger(prev => prev + 1);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Fetch prayer times
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError("");
        let response = null;

        if (prayerLocation.location) {
          response = await getPrayerTimeOfDayByAddress(
            prayerDate,
            prayerLocation.location
          );
        } else if (prayerLocation.latitude && prayerLocation.longitude) {
          response = await getPrayerTimeOfDayByLocation(
            prayerDate,
            prayerLocation.latitude,
            prayerLocation.longitude
          );
        }

        if (response) {
          setPrayerResponse(response);
        } else {
          setError("Failed to load prayer times");
        }
      } catch (error) {
        console.error("Error fetching prayer times:", error.message);
        setError("Failed to load prayer times. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (prayerLocation.latitude || prayerLocation.location) {
      fetchPrayerTimes();
    }
  }, [prayerLocation, prayerDate, refreshTrigger]);

  const handleLocationUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  if (error || !prayerResponse) {
    return (
      <div className="text-xl text-center mt-10 text-red-600 py-5">
        <p className="text-red-600">{error || "Failed to load prayer times"}</p>
        <div className="flex justify-center items-center">
          <div className="rounded-lg text-center max-w-sm w-full">
            <SetLocation onLocationSet={handleLocationUpdate} />
          </div>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same
  const { timings, date: prayerDateData } = prayerResponse;
  const hijriDate = `${prayerDateData.hijri.day} ${prayerDateData.hijri.month.en}, ${prayerDateData.hijri.year}`;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const upcomingPrayer = Object.entries(timings).find(([_, time]) => {
    const now = new Date();
    const [hour, minute] = time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0);
    return now < prayerTime;
  }) || ["Fajr", timings.Fajr];

  return (
    <div
      className="w-full text-white sm:px-6 py-3 sm:py-5 shadow-lg "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between items-center sm:gap-x-6 ">
        <div className=" ">
          <div className="flex items-center gap-4 justify-center ">
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
        <div className=" text-right">
          <Link
            to="/essentials/prayer-times"
            className="hover:underline text-sm sm:text-lg font-bold "
          >
            All Prayer times
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidge;