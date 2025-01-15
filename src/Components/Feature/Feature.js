import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal routing

const features = [
  { name: "Al Quran", icon: "📖", path: "/data/al-quran" },
  { name: "Islamic Holidays", icon: "🌙", path: "/holidays" },
  { name: "Calendar", icon: "📅", path: "/data/islamic-calendar" },
  { name: "Islamic Places", icon: "📍", path: "/places" },
  { name: "Date Converter", icon: "🔄", path: "/data/date-converter" },
  { name: "Prayer Widgets", icon: "🕋", path: "/widgets" },
  { name: "Zakat Calculator", icon: "💰", path: "/data/zakat-calculator" },
  { name: "Prayer Times", icon: "🕌", path: "/data/prayer-times" },
];


const Feature = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 lg:gap-12 p-2 rounded-lg">
      {features.map((feature) => (
        <Link
          to={feature.path} // Use 'to' prop for routing
          key={feature.name}
          className="flex flex-col items-center justify-center w-[103px] h-[120px] p-2 bg-transparent rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        >
          <div className="text-4xl text-teal-600 mb-3">{feature.icon}</div>
          <div className="text-center text-lg font-bold text-gray-800">
            {feature.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Feature;
