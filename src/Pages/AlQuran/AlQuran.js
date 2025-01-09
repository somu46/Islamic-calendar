import React, { useState } from "react";
import Surahs from "./Surahs";
import Juz from "./Juz";


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("surahs");


 




  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4 border-b">
        {["Surahs", "Juz", "Translations", "Topics"].map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`cursor-pointer p-2 ${
              activeTab === tab.toLowerCase()
                ? "font-bold text-blue-500 border-b-4 border-blue-500"
                : "text-gray-600"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      <div>
        {activeTab === "surahs" && (
          <Surahs/>
        )}
        {activeTab === "juz" &&(
          <Juz/>
        )}
        {activeTab === "translations" && <div>Translations content here</div>}
        {activeTab === "topics" && <div>Topics content here</div>}
      </div>
    </div>
  );
};

const AlQuran = () => {
  return (
    <div className="container mx-auto p-8">
      <header>
        <h1 className="text-3xl font-bold mb-4">Al Quran with Translation</h1>
      </header>
      <Tabs />
    </div>
  );
};

export default AlQuran;
