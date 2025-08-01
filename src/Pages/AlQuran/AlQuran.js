import React, { useEffect, useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Card = ({ label, icon, onClick, isActive, color }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer size-[85%]  shadow-md hover:scale-110 transition-all duration-300 rounded-lg px-1 py-7 sm:px-4 text-center ${
        isActive ? "border-2 border-blue-500 scale-105" : "border border-gray-200"
      }`}
    >
      {/* Icon with dynamic color */}
      <div className={`text-5xl sm:text-5xl mb-3 sm:mb-4 ${color}`}>{icon}</div>
      {/* Label with active state styling */}
      <h3
        className={`text-lg sm:text-xl font-semibold ${
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
  const navigate = useNavigate();

  const cards = [
    { label: "Full Digital Quran & Audio", value: "quran", icon: "☪", path: "/essentials/full-quran", color: "text-teal-500" },
    { label: "Quran Translations", value: "translations", icon: "🌐", path: "/essentials/translations", color: "text-purple-500" },
    { label: "Surahs", value: "surahs", icon: "📖", path: "/essentials/surahs", color: "text-indigo-500" },
    { label: "Juz", value: "juz", icon: "🕌", path: "/essentials/juz", color: "text-green-500" },
    // { label: "Topics", value: "topics", icon: "📚", path: "/essentials/al-quran", color: "text-orange-500" },
  ];

  useEffect(() => {
    if (activeSection.path) {
      navigate(activeSection.path);
    }
  }, [activeSection, navigate]);

  return (
    <div className="mt-[1rem]">
      <Helmet>
        <title> Holy Quran Online : Read And Listen Quran Online in Your Lnaguage with Translation</title>
        <meta
          name="description"
          content="Explore the Quran with Surahs, Juz, Translations, and Topics. Discover the beauty of the Quran."
        />
        <link rel="canonical" href="/essentials/al-quran" />
      </Helmet>
      <div>
        <Breadcrumb pageName="Al-Quran" />
      </div>
      <div className="container mx-auto p-4 sm:p-8  ">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl sm:text-4xl font-bold  ">
            Al-Quran with Translation
          </h1>
          <p className="text-gray-500 text-sm sm:text-lg mt-2">
            Explore the beauty of the Quran with Surahs, Juz, Translations, and
            Topics.
          </p>
        </header>

        {/* Cards Section */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mx-auto">
          {cards.map((card) => (
            <div
              key={card.value}
              className="w-[160px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
            >
              <Card
                label={card.label}
                icon={card.icon}
                color={card.color}
                isActive={activeSection.value === card.value}
                onClick={() =>
                  setActiveSection({
                    value: card.value,
                    path: card.path,
                    label: card.label,
                  })
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlQuran;