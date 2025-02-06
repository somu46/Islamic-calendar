import React, { useEffect, useState } from "react";
import axios from "axios";
import { getFullQuran } from "../../../apiServices/apiServices";

const FullQuran = () => {
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);
  const [fullQuranResponse, setFullQuranResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch Surah List
    const fetchSurahList = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/quran/ar.alafasy");
        const surahs = response.data.data.surahs.map(surah => ({
          number: surah.number,
          englishName: surah.englishName
        }));
        setSurahList(surahs);
      } catch (err) {
        console.error("Error fetching Surah list:", err);
      }
    };
    fetchSurahList();
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchFullQuranData = async () => {
      try {
        const response = await getFullQuran(source, selectedSurah);
        setFullQuranResponse(response);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error fetching Quran data:", error);
          setError(error.message);
        }
      }
    };
    fetchFullQuranData();
    return () => source.cancel("Component unmounted, canceling request");
  }, [selectedSurah]);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Surah Selection Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Surahs</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={selectedSurah}
            onChange={(e) => setSelectedSurah(Number(e.target.value))}
          >
            {surahList.map((surah) => (
              <option key={surah.number} value={surah.number}>
                {surah.number} : {surah.englishName}
              </option>
            ))}
          </select>
        </div>

        {/* Quran Content */}
        {error && <div className="text-red-600">Error: {error}</div>}
        {fullQuranResponse && (
          <>
            {/* Header Section */}
            <header className="text-center mb-8">
              <h1 className="font-amiri text-4xl text-emerald-900 mb-4 leading-tight">
                {fullQuranResponse.surahNameArabicLong}
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700">
                {fullQuranResponse.surahNameTranslation} ({fullQuranResponse.surahName})
              </h2>
            </header>

            {/* Meta Information */}
            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <p className="text-gray-600">
                <span className="font-semibold text-emerald-800">Revelation Place:</span>{' '}
                {fullQuranResponse.revelationPlace}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-emerald-800">Total Verses:</span>{' '}
                {fullQuranResponse.totalAyah}
              </p>
            </section>

            {/* Audio Recitations */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">Audio Recitations</h3>
              {Object.values(fullQuranResponse.audio).map((recitation, index) => (
                <div key={index} className="bg-white p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-700 mb-2">{recitation.reciter}</p>
                  <audio controls className="w-full mt-2">
                    <source src={recitation.url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </section>

            {/* Verses Section */}
            <section className="space-y-8">
              {Array.from({ length: fullQuranResponse.totalAyah }).map((_, index) => (
                <article key={index} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-emerald-800 mb-2">Arabic</h4>
                    <p className="font-amiri text-3xl leading-relaxed text-emerald-900">
                      {fullQuranResponse.arabic1[index]}
                    </p>
                    <p className="font-amiri text-xl text-gray-600 mt-4">
                      {fullQuranResponse.arabic2[index]}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-emerald-800 mb-2">English Translation</h4>
                    <p className="text-gray-700 leading-relaxed">{fullQuranResponse.english[index]}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h4 className="text-sm font-semibold text-emerald-800 mb-2">Bengali Translation</h4>
                    <p className="text-gray-700 leading-relaxed">{fullQuranResponse.bengali[index]}</p>
                  </div>
                </article>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default FullQuran;
