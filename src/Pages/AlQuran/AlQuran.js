import React, { useState } from "react";
import Surahs from "./Surahs";
import Juz from "./Juz";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("surahs");

  const tabs = [
    { label: "Surahs", value: "surahs" },
    { label: "Juz", value: "juz" },
    { label: "Translations", value: "translations" },
    { label: "Topics", value: "topics" },
  ];

  return (
    <div className="">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-between border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`cursor-pointer w-1/4 sm:w-auto text-center py-2 ${
              activeTab === tab.value
                ? "font-bold text-blue-500 border-b-4 border-blue-500"
                : "text-gray-600 hover:text-blue-400"
            }`}
            aria-label={`Switch to ${tab.label} tab`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "surahs" && <Surahs />}
        {activeTab === "juz" && <Juz />}
        {activeTab === "translations" && (
          <div className="text-center py-4">Translations content here</div>
        )}
        {activeTab === "topics" && (
          <div className="text-center py-4">Topics content here</div>
        )}
      </div>
    </div>
  );
};

const AlQuran = () => {
  return (
    <>
    <div>
      <Breadcrumb pageName='Al Quran' />
      </div>
    <div className="container mx-auto p-2 sm:p-8">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl sm:text-4xl font-bold">
          Al Quran with Translation
        </h1>
        <p className="text-gray-500 text-sm sm:text-lg mt-2">
          Explore the beauty of the Quran with Surahs, Juz, Translations, and Topics.
        </p>
      </header>

      {/* Tabs */}
      <Tabs />
    </div>
    </>
  );
};

export default AlQuran;
