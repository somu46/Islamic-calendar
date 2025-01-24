import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Quran = () => {
  const navigate = useNavigate();
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);

  // Fetch Quran Data
  useEffect(() => {
    const fetchQuranData = async () => {
      try {
        const response = await fetch("https://api.alquran.cloud/v1/quran/bn.hoque");
        const data = await response.json();
        if (data.code !== 200) {
          throw new Error("Failed to fetch Quran data");
        }
        setQuranData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Quran data:", err.message);
        setError(`কুরআনের ডেটা লোড করতে ব্যর্থ। ত্রুটি: ${err.message}`);
        setLoading(false);
      }
    };

    fetchQuranData();
  }, []);

  // Navigate when a Surah is selected
  // /services/${path}
  useEffect(() => {
    console.log("selectedSurah",selectedSurah);
    if (selectedSurah) {
      navigate(`/${selectedSurah.number}/${selectedSurah.englishName}-ayahs`, {
        state: {
          selectedSurah: selectedSurah,
        },
      });
    }
  }, [selectedSurah, navigate]);

  // Loading State
  if (loading) {
    return <p className="text-center text-3xl mt-[21rem] text-blue-600">লোড হচ্ছে.....</p>;
  }

  // Error State
  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">পবিত্র কুরআন (বাংলা অনুবাদ)</h1>

      {/* Surah List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {quranData.surahs.map((surah) => (
          <div
            className={`bg-white border rounded-lg shadow hover:shadow-lg transition-shadow p-4 cursor-pointer ${
              selectedSurah?.number === surah.number ? "bg-blue-100" : ""
            }`}
            key={surah.number}
            onClick={() => setSelectedSurah(surah)} // Set selected Surah
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {surah.number}. {surah.name} ({surah.englishName})
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-semibold">আয়াত সংখ্যা:</span> {surah.ayahs.length}
            </p>
            <p className="text-sm">
              <span className="font-semibold">প্রকাশের ধরণ:</span>{" "}
              {surah.revelationType === "Meccan" ? "মাক্কী" : "মাদানী"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quran;
