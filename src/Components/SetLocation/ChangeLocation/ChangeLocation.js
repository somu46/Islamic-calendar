import React from "react";
import SetLocation from "../SetLocation";
import prayer_img from "../../../Assets/prayers.webp"; // Uncomment and ensure the path is correct

const ChangeLocation = () => {
  return (
    <div
      className="relative flex items-center justify-center h-screen px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${prayer_img})`, // Set the background image
        backgroundColor: "#FEFBF1", // Fallback color for better contrast
      }}
    >
      <div className="relative rounded-lg text-center max-w-lg w-full sm:p-8">
        <div className="relative bg-white bg-opacity-80 rounded-lg shadow-lg text-center w-full p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
            Set Your Location for Prayer Times
          </h1>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            Get accurate Islamic prayer times and Qibla direction based on your
            current location. Please set or update your location to ensure the
            times are tailored to your area.
          </p>
          <div className="">
            <SetLocation />
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-4">
            <strong>Note:</strong> Your location will only be used to calculate prayer times and
            Qibla direction. It won't be shared with any third party.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangeLocation;
