import { useEffect, useState } from "react";

const LocationTracker = () => {
  const [locationObj, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState("");
  const [permissionState, setPermissionState] = useState("loading");

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });

        sessionStorage.setItem("latitude", latitude);
        sessionStorage.setItem("longitude", longitude);

        setError("");
      },
      (err) => {
        setError(err.message);
        console.error("Geolocation error:", err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    if (!navigator.permissions) {
      setPermissionState("prompt");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        setPermissionState(result.state);

        if (result.state === "granted") {
          getLocation(); // Auto-fetch if already allowed
        }

        result.onchange = () => {
          setPermissionState(result.state);
        };
      })
      .catch(() => {
        setPermissionState("prompt");
      });
  }, []);

  console.log("LocationTracker:", locationObj);

  return (
    <>
      {permissionState === "prompt" && !locationObj.latitude && (
        <div className="text-center mt-4">
          <button
            onClick={getLocation}
            className="bg-teal-600 text-white px-6 py-2 rounded-lg"
          >
            Enable Location
          </button>
        </div>
      )}

      {permissionState === "denied" && (
        <p className="text-red-600 text-center mt-4">
          Location permission denied. Please enable it from browser settings.
        </p>
      )}

      {error && (
        <p className="text-red-600 text-center mt-2">{error}</p>
      )}
    </>
  );
};

export default LocationTracker;