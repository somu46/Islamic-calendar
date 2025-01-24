import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";

const Card = ({ label, icon, onClick, isActive }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-6 text-center ${
        isActive ? "border-2 border-blue-500" : "border"
      }`}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3
        className={`text-lg font-semibold ${
          isActive ? "text-blue-500" : "text-gray-700"
        }`}
      >
        {label}
      </h3>
    </div>
  );
};

const AlQuran = () => {
  const [activeSection, setActiveSection] = useState({});
const navigate=useNavigate();
  const cards = [
    { label: "Full Quarn", value: "Quarn", icon: "☪",path:'/essentials/full-quran' },
    { label: "Surahs", value: "surahs", icon: "📖",path:'/essentials/surahs' },
    { label: "Juz", value: "juz", icon: "🕌",path:'/essentials/juz' },
    { label: "Translations", value: "translations", icon: "🌐",path:'/essentials/al-quran' },
    { label: "Topics", value: "topics", icon: "📚",path:'/essentials/al-quran' },
  ];

  useEffect(()=>{
    navigate(activeSection.path);
  },[activeSection,navigate])
  return (
    <>
      <div>
        <Breadcrumb pageName="Al Quran" />
      </div>
      <div className="container mx-auto p-4 sm:p-8">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            Al Quran with Translation
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg mt-2">
            Explore the beauty of the Quran with Surahs, Juz, Translations, and
            Topics.
          </p>
        </header>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((card) => (
            <Card
              key={card.value}
              label={card.label}
              icon={card.icon}
              isActive={activeSection === card.value}
              onClick={() => setActiveSection({
             value:card.value,
             path:card.path,
             label:card.label
              })}
            />
          ))}
        </div>

      </div>
    </>
  );
};

export default AlQuran;
