import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaQuran } from "react-icons/fa";
import { motion } from "framer-motion";

// Cache timeout (24 hours)
const CACHE_TIMEOUT = 24 * 60 * 60 * 1000;

const Quran = () => {
  const navigate = useNavigate();
  const { identifier } = useParams();
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (source, retries = 3) => {
    try {
      const cacheKey = `quranData-${identifier || 'quran-uthmani'}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIMEOUT) {
          setQuranData(data);
          setLoading(false);
          return;
        }
      }
      const url = `https://api.alquran.cloud/v1/quran/${identifier || 'quran-uthmani'}`;
      const response = await axios.get(url, {
        cancelToken: source.token,
        timeout: 10000,
      });

      if (response.data.code !== 200) throw new Error("Invalid response format");

      localStorage.setItem(cacheKey, JSON.stringify({
        data: response.data.data,
        timestamp: Date.now()
      }));

      setQuranData(response.data.data);
      setLoading(false);
    } catch (err) {
      if (axios.isCancel(err)) return;
      
      if (retries > 0) {
        setTimeout(() => fetchData(source, retries - 1), 1000 * (4 - retries));
      } else {
        setError(`Failed to load data: ${err.message}`);
        setLoading(false);
      }
    }
  }, [identifier]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    fetchData(source);
    return () => source.cancel("Component unmounted");
  }, [fetchData]);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={() => fetchData(axios.CancelToken.source())} />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center font-bangla">
            Translation of Quran ({quranData?.edition.language}) By {quranData?.edition.englishName}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </motion.div>

        {/* Surah Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {quranData?.surahs?.map(surah => (
            <SurahCard
              key={surah.number}
              surah={surah}
              onClick={() => navigate(
                `/essentials/${surah.number}/${surah.englishName}-ayahs`,
                { state: { selectedSurah: surah } }
              )}
            />
          )) || <p>No Surahs Available</p>}
        </motion.div>
      </div>
    </div>
  );
};

// Loading Screen Component
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
    <div className="space-y-4 items-center ">
      <FaQuran className=" mx-auto text-6xl text-center text-emerald-600 animate-pulse  " />
      <p className="text-center text-2xl text-emerald-800 font-semibold   ">
        Loading Quran Data...
      </p>
    </div>
  </div>
);

// Error Screen Component
const ErrorScreen = ({ error, onRetry }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
    <p className="text-red-600 text-xl font-medium">{error}</p>
    <button onClick={onRetry} className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
      Retry
    </button>
  </div>
);

// SurahCard Component
const SurahCard = ({ surah, onClick }) => (
  <div
    onClick={onClick}
    className="p-6 bg-white shadow-lg rounded-lg cursor-pointer hover:shadow-xl transition-all"
  >
    <h2 className="text-2xl font-semibold text-emerald-800">{surah.number} . {surah.englishName}</h2>
    <p className="text-gray-600">{surah.englishNameTranslation}</p>
  </div>
);

export default Quran;
