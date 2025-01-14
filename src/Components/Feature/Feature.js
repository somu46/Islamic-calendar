import React from "react";

const features = [
  { name: "Al Quran", icon: "📖" },
  // { name: "Duas", icon: "🙏" },
  { name: "Special Islamic Days", icon: "🌙" },
  // { name: "Islamic Gallery", icon: "🖼️" },
  { name: "Calendar", icon: "📅" },
  // { name: "Hadith", icon: "📜" },
  // { name: "Qibla Direction", icon: "🧭" },
  { name: "Islamic Places", icon: "📍" },
  { name: "Date Converter", icon: "🔄" },
  { name: "Prayer Widgets", icon: "🕋" },
  { name: "Zakat Calculator", icon: "💰" },
  // { name: "Knowledge", icon: "📚" },
  
  // { name: "PrayerBook", icon: "📔" },
];

const Feature = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 bg-gray-50 rounded-lg shadow-xl">
      {features.map((feature) => (
        <div
          key={feature.name}
          className="flex flex-col items-center p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
        >
          <div className="text-5xl text-teal-600 mb-3">{feature.icon}</div>
          <div className="mt-2 text-center text-lg font-bold text-gray-800">
            {feature.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;
