import React, { useEffect, useState } from "react";
import { getCountry } from "../../../apiServices/apiServices";

const Modal = ({ isOpen, onClose, children}) => {
  
  //   console.log("children",children);
  const [countryData, setcountryData] = useState([]);
  
  useEffect(() => {
const fetchCountry = async () => {
  try {
    const response = await getCountry("asia");
    setcountryData(response.data);
    // console.log("response:",response.data[0].name.common);
  }
  catch (error) {
    console.error(error);
  }
}
fetchCountry();
}, []);
console.log("countryData:",countryData);

if (!isOpen) return null;
  
  const handleOutsideClick = (e) => {
    if (e.target.id === "modalOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 min-h-screen bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white border border-gray-300 p-6 rounded-lg w-[90%] max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-800 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Modal Content */}
        <div className="flex flex-col items-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
