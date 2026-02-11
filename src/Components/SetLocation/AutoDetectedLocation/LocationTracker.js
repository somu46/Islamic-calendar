import { useEffect, useState } from "react";

const LocationTracker = () => {
  const [locationObj, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  // Fetch the current location when the component mounts
  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            setLocation({ latitude, longitude });
            sessionStorage.setItem("latitude", latitude);
            sessionStorage.setItem("longitude", longitude);
          },
          (err) => {
            setError(err.message);
            console.log('lat :',latitude)
            console.error("Geolocation error:", err.message);
          }
        );
      } else {
        const errorMessage = "Geolocation is not supported by your browser.";
        setError(errorMessage);
        console.error(error);
      }
    };

    getLocation();
    
  }, []); // Empty dependency array ensures this runs only once on mount
  console.log("LocationTracker component mounted: ",locationObj);
  
  return null; // No UI, purely functional
};

export default LocationTracker;