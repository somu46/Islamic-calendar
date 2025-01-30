import React from "react";
import { Link } from "react-router-dom";
import { FaQuran, FaCalendarAlt,  FaSyncAlt, FaCalculator, FaPray, FaMoon , FaKaaba } from "react-icons/fa";

const features = [
  { name: "Al Quran", icon: <FaQuran />, path: "/essentials/al-quran" },
  { name: "Islamic Holidays", icon: <FaMoon />, path: "/essentials/islamic-holidays" },
  { name: "Calendar", icon: <FaCalendarAlt />, path: "/essentials/islamic-calendar" },
  // { name: "Islamic Places", icon: <FaMapMarkerAlt />, path: "/places" },
  { name: "Date Converter", icon: <FaSyncAlt />, path: "/essentials/date-converter" },
  { name: "Qibla Direction", icon: <FaKaaba />, path: "/essentials/qibla-direction" },
  { name: "Zakat Calculator", icon: <FaCalculator />, path: "/essentials/zakat-calculator" },
  { name: "Prayer Times", icon: <FaPray />, path: "/essentials/prayer-times" },
];

const Feature = () => {
  return (
    <div className="p-6  rounded-lg ">
      <h3 className="text-4xl font-bold text-teal-800 text-center mb-4">
        Our Islamic Essential Tools
      </h3>
      <p className="text-gray-600 text-center mb-8">
        Keep track of important Islamic dates, events, and holidays throughout the year.
      </p>

      <div className="flex flex-wrap justify-center gap-6 mx-auto">
        {features.map((feature) => (
          <Link
            to={feature.path}
            key={feature.name}
            className="flex flex-col items-center justify-center w-[140px] h-[140px] p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <div className="text-4xl text-teal-600 mb-3">{feature.icon}</div>
            <div className="text-center text-sm font-semibold text-gray-800">
              {feature.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
