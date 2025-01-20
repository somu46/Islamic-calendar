import React from "react";
import SetLocation from "../SetLocation";
import prayer_img from "../../../Assets/prayers.webp"; // Uncomment and ensure the path is correct

const ChangeLocation = () => {
  return (
    <div
      className=" relative flex flex-col h-screen items-center justify-center sm:mt-[4.9rem] mt-1 space-y-6  bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${prayer_img})`, // Set the background image
        backgroundColor: "#FEFBF1", // Fallback color for better contrast
      }}
    >

      <div className="absolute bottom-3 lg:relative bg-white bg-opacity-90  p-6 rounded-lg shadow-lg text-center max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800">
          Set Your Location for Prayer Times
        </h1>
        <p className="text-gray-600 mt-4">
          Get accurate Islamic prayer times and Qibla direction based on your current location.
          Please set or update your location to ensure the times are tailored to your area.
        </p>
        <div className="w-full max-w-md mt-6">
          <SetLocation />
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Note: Your location will only be used to calculate prayer times and Qibla direction. 
          It won't be shared with any third party.
        </p>
      </div>
    </div>
  );
};

export default ChangeLocation;
