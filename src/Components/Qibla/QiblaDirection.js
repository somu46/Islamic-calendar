import React, { useState } from "react";
import { CgArrowLongUp } from "react-icons/cg";// Importing an arrow icon from React Icons

const QiblaDirection = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [direction, setDirection] = useState(null);
  const [error, setError] = useState(null);

  // Function to calculate Qibla direction
  const calculateQiblaDirection = (lat, long) => {
    const kaabaLatitude = 21.4225; // Latitude of the Kaaba
    const kaabaLongitude = 39.8262; // Longitude of the Kaaba

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

    const qiblaAngle = toDegrees(Math.atan2(x, y));
    return (qiblaAngle + 360) % 360; // Ensure the angle is positive
  };

  // Function to fetch the user's location
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
          setError("Unable to fetch your location. Please allow location access.");
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-teal-800 mb-4">
        Calculate Qibla Direction
      </h2>

      {!latitude && !longitude && (
        <button
          onClick={fetchUserLocation}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition"
        >
          Get My Location
        </button>
      )}

      {latitude && longitude && (
        <div className="mt-4 text-center">
          {/* <h3 className="text-lg text-gray-700">
            Your Location   
          </h3>
          <p>Latitude :{latitude.toFixed(6)}</p>
          <p>Longitude : {longitude.toFixed(6)} </p> */}

          {direction !== null && (
            <div className="mt-6">
              <h3 className="text-xl font-bold text-teal-600">Qibla Direction:</h3>
              <p className="text-lg text-gray-800 mb-6">{direction}°</p>

              {/* Compass with Arrow */}
              <div className="relative w-40 h-40 mx-auto">
                {/* Compass Circle */}
                <div className="absolute w-full h-full rounded-full border-4 border-gray-400 flex items-center justify-center">
                  <div className="absolute top-2 text-gray-500 font-bold">N</div>
                  <div className="absolute bottom-2 text-gray-500 font-bold">S</div>
                  <div className="absolute left-2 text-gray-500 font-bold">W</div>
                  <div className="absolute right-2 text-gray-500 font-bold">E</div>
                </div>

                {/* Rotating Arrow */}
                <div
                  className="absolute w-full h-full flex items-center justify-center"
                  style={{
                    transform: `rotate(${direction}deg)`,
                    transition: "transform 0.5s ease",
                  }}
                >
                  <CgArrowLongUp className="text-teal-600 text-6xl" />
                </div>
              </div>
              <p className="text-gray-600 mt-4 text-sm">Note: This is an approximate direction based on <strong>Mathematical Calculation</strong> based on your location and the location of the Kaaba in Mecca. for better accuracy use your mobile compass to get the degree in realtime</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4 text-center text-red-500  font-medium">{error}</div>
      )}
    </div>
  );
};

export default QiblaDirection;
