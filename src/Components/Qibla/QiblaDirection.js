import React, { useEffect, useState } from "react";
import { CgArrowLongUp } from "react-icons/cg";

const QiblaDirection = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [direction, setDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [error, setError] = useState(null);

  /* ================= QIBLA CALCULATION ================= */

  const calculateQiblaDirection = (lat, long) => {
    const kaabaLatitude = 21.4225;
    const kaabaLongitude = 39.8262;

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const toDegrees = (rad) => (rad * 180) / Math.PI;

    const userLat = toRadians(lat);
    const userLong = toRadians(long);
    const kaabaLat = toRadians(kaabaLatitude);
    const kaabaLong = toRadians(kaabaLongitude);

    const deltaLong = kaabaLong - userLong;

    const x = Math.cos(kaabaLat) * Math.sin(deltaLong);
    const y =
      Math.cos(userLat) * Math.sin(kaabaLat) -
      Math.sin(userLat) * Math.cos(kaabaLat) * Math.cos(deltaLong);

    const angle = toDegrees(Math.atan2(x, y));
    return (angle + 360) % 360;
  };

  /* ================= LOCATION ================= */

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          const result = calculateQiblaDirection(latitude, longitude);
          setDirection(result.toFixed(2));
          setError(null);
        },
        () => {
          setError("Couldn't access your location. Please enable location permissions in your browser settings.");
        }
      );
      
    } else {
      setError("Your browser doesn't support location services. Please update your browser or try using a smartphone.");
    }
  };

  const enableGyroscope = async () => {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      // iOS permission
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          window.addEventListener("deviceorientation", handleOrientation);
          setGyroEnabled(true);
        } else {
          setError("Compass permission denied.");
        }
      } catch {
        setError("Unable to enable compass.");
      }
    } else {
      // Android
      window.addEventListener("deviceorientation", handleOrientation);
      setGyroEnabled(true);
    }
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  /* ================= FINAL ROTATION ================= */

  const finalRotation =
    gyroEnabled && direction
      ? direction - deviceHeading
      : direction || 0;

  /* ================= UI ================= */

  return (
    <div className="p-6 bg-gradient-to-br from-teal-50 via-white to-teal-50 rounded-xl shadow-lg max-w-4xl mx-auto my-8">

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-teal-800 mb-3">
          Find Qibla Direction Online
        </h1>
        <p className="text-gray-600">
          Accurate real-time Qibla compass using GPS & device sensors
        </p>
      </header>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-teal-100 text-center">

        {!latitude && (
          <button
            onClick={fetchUserLocation}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-8 rounded-lg transition"
          >
            Find My Qibla Direction
          </button>
        )}

        {latitude && (
          <>
            <div className="relative w-48 h-48 mx-auto my-8">
              <div className="absolute w-full h-full rounded-full border-4 border-teal-200 flex items-center justify-center">
                <span className="absolute top-2">N</span>
                <span className="absolute bottom-2">S</span>
                <span className="absolute left-2">W</span>
                <span className="absolute right-2">E</span>
              </div>

              <div
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  transform: `rotate(${finalRotation}deg)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <CgArrowLongUp className="text-teal-600 text-6xl animate-pulse" />
              </div>
            </div>

            <p className="text-lg font-semibold text-teal-700">
              Qibla Direction: {direction}°
            </p>

            <p className="text-sm text-gray-600">
              ({latitude.toFixed(4)}°N, {longitude.toFixed(4)}°E)
            </p>

            {!gyroEnabled && (
              <button
                onClick={enableGyroscope}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition"
              >
                Enable Compass Mode
              </button>
            )}
          </>
        )}

        {error && (
          <div className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <p className="mt-4 text-xs text-gray-500">
          Tip: Hold your phone flat and calibrate the compass for best accuracy.
        </p>
      </div>

      <footer className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Islamic Tools · Kaaba: 21.4225°N, 39.8262°E
      </footer>
    </div>
  );
};

export default QiblaDirection;
