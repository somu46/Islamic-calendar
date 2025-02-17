import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPrayerTimeOfDayByAddress, getPrayerTimeOfDayByLocation } from "../../apiServices/apiServices";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import bg from '../../Assets/widgetBG.png';
import fullbg from '../../Assets/prayertimeBG1.png';
import SetLocation from "../../Components/SetLocation/SetLocation";

const PrayerTimes = () => {
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
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Used to trigger re-fetching of prayer times

  // Load location from sessionStorage
  useEffect(() => {
    const loadLocation = () => {
      const latitude = sessionStorage.getItem("latitude");
      const longitude = sessionStorage.getItem("longitude");
      const location = sessionStorage.getItem("locationByPlace");

      if (latitude && longitude) {
        setPrayerLocation({ latitude, longitude, location: null });
      } else if (location) {
        setPrayerLocation({ latitude: null, longitude: null, location });
      } else {
        setLoading(false); // No location data found
      }
    };

    // Initial load
    loadLocation();

    // Listen for storage changes (e.g., from other tabs)
    const handleStorageChange = (e) => {
      if (["latitude", "longitude", "location"].includes(e.key)) {
        loadLocation();
        setRefreshTrigger((prev) => prev + 1); // Trigger re-fetch
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
        let response = null;

        if (prayerLocation.latitude && prayerLocation.longitude) {
          response = await getPrayerTimeOfDayByLocation(
            prayerDate,
            prayerLocation.latitude,
            prayerLocation.longitude
          );
        } else if (prayerLocation.location) {
          response = await getPrayerTimeOfDayByAddress(
            prayerDate,
            prayerLocation.location
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

    if (prayerLocation.latitude || prayerLocation.location) {
      fetchPrayerTimes();
    }
  }, [prayerLocation, prayerDate, refreshTrigger]);

  // Handle location updates
  const handleLocationUpdate = () => {
    setRefreshTrigger((prev) => prev + 1); // Trigger re-fetch
  };

  // Loading State
  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  // Error State
  if (!prayerResponse) {
    return (
      <div className="text-center mt-10">
        <p>Unable to fetch prayer times.</p>
        <div className="mt-4 border border-teal-400 p-4 rounded-lg bg-white opacity-75 w-[300px] mx-auto">
          <SetLocation onLocationSet={handleLocationUpdate} />
        </div>
      </div>
    );
  }

  // Extract data from response
  const { timings, date: prayerDateData, meta } = prayerResponse;
  const hijriDate = `${prayerDateData.hijri.day} ${prayerDateData.hijri.month.en}, ${prayerDateData.hijri.year}`;
  const gregorianDate = `${prayerDateData.gregorian.date}`;

  // Format time to 12-hour clock
  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  // Determine upcoming prayer
  const upcomingPrayer = Object.entries(timings).find(([_, time]) => {
    const now = new Date();
    const [hour, minute] = time.split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hour, minute, 0);
    return now < prayerTime;
  }) || ["Fajr", timings.Fajr];

  return (
    <>
      <div className="bg-white rounded-lg opacity-75 px-4 mb-2">
        <Breadcrumb pageName="Prayer Times" />
      </div>
      <div
        className="max-w-lg mx-auto -mt-6 shadow-lg rounded-lg px-6 border border-gray-200"
        style={{
          backgroundImage: `url(${fullbg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#FEFBF1",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 bg-white rounded-lg opacity-80 px-3 mt-32">
          <h2 className="text-lg font-semibold text-blue-600">
            Prayer Times in {meta?.timezone || "Unknown Location"}
          </h2>
          <div className="text-sm text-blue-600 font-bold text-right">
            <p>{gregorianDate}</p>
            <p>{hijriDate}</p>
          </div>
        </div>

        {/* Upcoming Prayer */}
        <div
          className="flex items-center justify-between rounded-xl opacity-90 p-4 mb-4"
          style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "fit",
            backgroundPosition: "center",
            backgroundColor: "#FEFBF1",
          }}
        >
          <div className="text-center">
            <p className="text-sm text-white">Upcoming Prayer</p>
            <p className="text-lg font-semibold text-white">{upcomingPrayer[0]}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-white">{formatTime(upcomingPrayer[1])}</p>
          </div>
        </div>

        {/* Prayer Times */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {Object.entries(timings).map(([prayer, time]) => (
            <div key={prayer} className="border rounded-lg p-2">
              <p className="text-sm font-medium text-white">{prayer}</p>
              <p className="text-lg font-semibold text-white">{formatTime(time)}</p>
            </div>
          ))}
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to="/change-location"
            className="text-white underline hover:text-blue-700 text-md"
          >
            <button className="bg-teal-500 rounded-lg font-semibold opacity-100 p-3">
              Change location
            </button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 mb-28 text-white">
          <p className="text-lg font-semibold">{meta?.method?.name || "Unknown Method"}</p>
          <p className="">
            Fajr: {meta?.method?.params?.Fajr || "N/A"}°, Isha: {meta?.method?.params?.Isha || "N/A"}°
          </p>
        </div>
      </div>
    </>
  );
};

export default PrayerTimes;