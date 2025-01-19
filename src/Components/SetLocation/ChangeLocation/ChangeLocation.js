import React from "react";
import SetLocation from "../SetLocation";

const ChangeLocation = () => {
  return (
    <div className="flex flex-col bg-[#FEFBF1] items-center justify-center my-[10rem] space-y-6 mx-3">
      <h1 className="text-3xl font-bold text-gray-800 ">
        Set Your Location for Prayer Times
      </h1>
      <p className="text-gray-600  text-center max-w-lg">
        Get accurate Islamic prayer times and Qibla direction based on your current location. 
        Please set or update your location to ensure the times are tailored to your area.
      </p>
      <div className="w-md max-w-md">
        <SetLocation />
      </div>
      <p className="text-sm text-gray-500  text-center max-w-md">
        Note: Your location will only be used to calculate prayer times and Qibla direction. 
        It won't be shared with any third party.
      </p>
      
    </div>
  );
};

export default ChangeLocation;
