import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPrayerTimeOfDayByAddress, getPrayerTimeOfDayByLocation } from "../../apiServices/apiServices";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import bg from '../../Assets/widgetBG.png'
import fullbg from '../../Assets/prayertimeBG1.png'

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

        if (prayerLocation.latitude && prayerLocation.longitude) {
          // console.log("Fetching prayer times using latitude and longitude...");
          response = await getPrayerTimeOfDayByLocation(prayerDate, prayerLocation.latitude, prayerLocation.longitude);
        } else if (prayerLocation.location) {
          // console.log("Fetching prayer times using location name...");
          response = await getPrayerTimeOfDayByAddress(prayerDate, prayerLocation.location);
        }

        if (response) {
          // console.log("Prayer Times Response:", response);
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
  }, [prayerLocation, prayerDate]);

  // Loading State
  if (loading) {
    return <div className="text-center mt-10">Loading prayer times...</div>;
  }

  // Error State
  if (!prayerResponse) {
    return <div className="text-center mt-10">Failed to load prayer times. Please try again later.</div>;
  }

  // Extracting Data from Response
  const { timings, date: prayerDateData, meta } = prayerResponse;
  const hijriDate = `${prayerDateData.hijri.day} ${prayerDateData.hijri.month.en}, ${prayerDateData.hijri.year}`;
  const gregorianDate = `${prayerDateData.gregorian.date}`;

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

  // Render Component
  return (
    <>
      
      <div className="max-w-lg mx-auto  shadow-lg rounded-lg px-6  border border-gray-200"
      style={{
        backgroundImage: `url(${fullbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#FEFBF1",
      }}
      >
      <div className="bg-white rounded-lg opacity-75 px-4 mb-2 mt-24">
      <Breadcrumb pageName="Prayer Times" />
      </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-4 bg-white rounded-lg opacity-80 px-3 ">
          <h2 className="text-lg font-semibold text-black">
            Prayer Times in {meta?.timezone || "Unknown Location"}
          </h2>
          <div className="text-sm text-black font-bold text-right">
            <p>{gregorianDate}</p>
            <p>{hijriDate}</p>
          </div>
        </div>

        {/* Upcoming Prayer */}
        <div className="flex items-center justify-between  rounded-xl opacity-90 p-4 mb-4"
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
            <div key={prayer} className=" border rounded-lg p-2">
              <p className="text-sm font-medium text-white">{prayer}</p>
              <p className="text-lg font-semibold text-white">{formatTime(time)}</p>
            </div>
          ))}
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to="/change-location"
            className="text-white underline hover:text-blue-700 text-md"
          >
            <button className="bg-teal-500 rounded-lg font-semibold opacity-100 p-2">Change location</button>
          </Link>
        </div>
        <div className="text-center mt-4 mb-28 text-white">
          <p className=" text-lg font-semibold">{meta?.method?.name || "Unknown Method"}</p>
          <p className="">
            Fajr: {meta?.method?.params?.Fajr || "N/A"}°, Isha: {meta?.method?.params?.Isha || "N/A"}°
          </p>
        </div>
        
        
      </div>

     
    </>
  );
};

export default PrayerTimes;
