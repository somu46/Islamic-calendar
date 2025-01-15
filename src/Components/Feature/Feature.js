import React from "react";

const features = [
  { name: "Al Quran", icon: "📖" },
  { name: "Islamic Holidays", icon: "🌙" },
  { name: "Calendar", icon: "📅" },
  { name: "Islamic Places", icon: "📍" },
  { name: "Date Converter", icon: "🔄" },
  { name: "Prayer Widgets", icon: "🕋" },
  { name: "Zakat Calculator", icon: "💰" },
];

const Feature = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-2  rounded-lg ">
      {features.map((feature) => (
        <div
          key={feature.name}
          className="flex flex-col items-center justify-center w-[103px] h-[120px] p-2 bg-transparent rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        >
          <div className="text-4xl text-teal-600 mb-3 ">{feature.icon}</div>
          <div className="text-center text-lg font-bold text-gray-800">
            {feature.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
