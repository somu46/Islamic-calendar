import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SurahAyahs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve `selectedSurah` from the location state
  const { selectedSurah } = location.state || {};

  // Fallback for missing `selectedSurah`
  if (!selectedSurah) {
    return (
      <div className="text-center mt-10">
        <p>No Surah selected. Please go back and select a Surah.</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Render Ayahs of the selected Surah
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
        সূরা {selectedSurah.name} ({selectedSurah.englishName})
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow">
        {selectedSurah.ayahs.map((ayah) => (
          <div key={ayah.number} className="mb-4">
            <p className="text-lg font-semibold text-gray-800 mb-2">
              আয়াত {ayah.numberInSurah}: {ayah.text}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">পৃষ্ঠা:</span> {ayah.page}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300"
        >
          ফিরে যান
        </button>
      </div>
    </div>
  );
};

export default SurahAyahs;
