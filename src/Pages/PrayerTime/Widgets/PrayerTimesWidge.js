import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPrayerTimeOfDayByAddress,
  getPrayerTimeOfDayByLocation,
} from "../../../apiServices/apiServices";
import SetLocation from "../../../Components/SetLocation/SetLocation";
import bg from "../../../Assets/widgetBG.png";
import { useStore } from "../../../Store/stateLocationStore";

const PrayerTimesWidget = () => {
  const { latitudeState: latitude, longitudState: longitude, error: locationError } = useStore();
  const today = new Date();
  const prayerDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  const [prayerResponse, setPrayerResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationName, setLocationName] = useState(sessionStorage.getItem("locationByPlace") || "");

  console.log("locationByPlace: ",locationName);
  
  // Fetch prayer times
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);
        setError("");
        
        if (!latitude && !longitude && !locationName) {
          setError("Please set your location to view prayer times");
          return;
        }

        const response = locationName 
          ? await getPrayerTimeOfDayByAddress(prayerDate, locationName)
          : await getPrayerTimeOfDayByLocation(prayerDate, latitude, longitude);

        setPrayerResponse(response);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setError(error.message || "Failed to load prayer times");
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [latitude, longitude, locationName, prayerDate]);

  const handleLocationUpdate = (newLocation) => {
    if (newLocation.address) {
      setLocationName(newLocation.address);
      sessionStorage.setItem("location", newLocation.address);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }
  console.log("prayerResponse", prayerResponse);

  if (error  || !prayerResponse) {
    return (
      <div className="text-center mt-10 text-red-600 py-5">
        <p className="text-red-600 mb-4">{error || locationError || "Failed to load prayer times"}</p>
        <div className="flex justify-center">
          <div className="rounded-lg max-w-sm w-full">
            <SetLocation onLocationSet={handleLocationUpdate} />
          </div>
        </div>
      </div>
    );
  }

  const { timings, date: prayerDateData } = prayerResponse;
  const hijriDate = `${prayerDateData?.hijri?.day} ${prayerDateData?.hijri?.month.en}, ${prayerDateData?.hijri?.year}`;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const upcomingPrayer = Object.entries(timings).find(([_, time]) => {
    const now = new Date();
    const [hour, minute] = time.split(":").map(Number);
    const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    return now < prayerTime;
  }) || ["Fajr", timings.Fajr];

  return (
    <div
      className="w-full text-white px-4 sm:px-6 py-4 sm:py-5 shadow-lg"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-y-4 sm:gap-x-6">
        <div className="text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
            {upcomingPrayer[0]} {formatTime(upcomingPrayer[1])}
          </h2>
          <div className="mt-2 text-xs sm:text-sm">
            <span className="mx-1">{hijriDate}</span>
            <span className="text-gray-300 mx-1">
              {prayerResponse?.meta?.timezone}
            </span>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-0">
          <Link
            to="/essentials/prayer-times"
            className="inline-block bg-white/20 hover:bg-white/30 transition-all rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-semibold whitespace-nowrap"
          >
            All Prayer Times
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrayerTimesWidget;