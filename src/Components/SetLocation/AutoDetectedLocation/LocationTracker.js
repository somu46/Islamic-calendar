import { useEffect, useState } from "react";

const LocationTracker = () => {
  const [locationObject, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState("");

  // Fetch the current location when the app loads
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

            console.log("Location loaded:", { latitude, longitude });
          },
          (err) => {
            setError(err.message);
            console.error("Geolocation error:", err.message);
          }
        );
      } else {
        const errorMessage = "Geolocation is not supported by your browser.";
        setError(errorMessage);
        console.error(errorMessage);
      }
    };

    getLocation();
  }, [error]);

  // Debugging or logging purposes only
  console.log("Location (LocationTracker):", locationObject);

  return null; // No UI, purely functional
};

export default LocationTracker;
