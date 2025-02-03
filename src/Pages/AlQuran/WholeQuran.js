import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaQuran } from "react-icons/fa";
import { motion } from "framer-motion";

// Cache timeout (24 hours)
const CACHE_TIMEOUT = 24 * 60 * 60 * 1000;

const SurahCard = React.memo(({ surah, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-white border-2 border-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <h2 className="text-xl font-bold text-emerald-900">
          {surah.number}. {surah.englishName}
        </h2>
        <p className="text-2xl text-emerald-800 font-arabic mt-2">
          {surah.name}
        </p>
      </div>
      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
        {surah.revelationType === "Meccan" ? "মাক্কী" : "মাদানী"}
      </span>
    </div>

    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        <span className="font-semibold"> Meaning :</span>{" "}
        {surah.englishNameTranslation}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-semibold">Ayahs:</span> {surah.ayahs.length}
      </p>
    </div>

    <div className="mt-4 flex justify-between items-center text-sm text-emerald-800">
      <span className="flex items-center gap-1">
        <FaQuran className="text-emerald-600" />
        Surahs
      </span>
      <span className="bg-emerald-600 text-white px-2 py-1 rounded-md">
        Pages {surah.ayahs[0].page}
      </span>
    </div>
  </motion.div>
));

const Quran = () => {
  const navigate = useNavigate();
  const { identifier } = useParams();
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (source, retries = 3) => {
    try {
      const cacheKey = `quranData-${identifier || 'en.asad'}`;
      const cached = localStorage.getItem(cacheKey);
      
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_TIMEOUT) {
          setQuranData(data);
          setLoading(false);
          return;
        }
      }

      const url = `https://api.alquran.cloud/v1/quran/${identifier || 'en.asad'}`;
      const response = await axios.get(url, {
        cancelToken: source.token,
        timeout: 10000
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

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    fetchData(axios.CancelToken.source());
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={handleRetry} />;

  console.log("QuranData: ", quranData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto p-4 lg:p-8">
        <Header quranData={quranData} navigate={navigate} />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {quranData.surahs.map(surah => (
            <SurahCard
              key={surah.number}
              surah={surah}
              onClick={() => navigate(
                `/essentials/${surah.number}/${surah.englishName}-ayahs`,
                { state: { selectedSurah: surah } }
              )}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
    <div className="space-y-4">
      <div className="flex justify-center">
        <FaQuran className="text-6xl text-emerald-600 animate-pulse" />
      </div>
      <p className="text-center text-2xl text-emerald-800 font-semibold">
        Loading Quran Data...
      </p>
      <div className="flex justify-center">
        <div className="w-48 h-1 bg-emerald-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-600 rounded-full animate-progress" />
        </div>
      </div>
    </div>
  </div>
);

const ErrorScreen = ({ error, onRetry }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
    <div className="text-center space-y-6 max-w-md">
      <div className="text-red-500 text-6xl">⚠️</div>
      <p className="text-red-600 text-xl font-medium">{error}</p>
      <button
        onClick={onRetry}
        className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
      >
        <FaQuran />
        Please Try Again
      </button>
    </div>
  </div>
);

const Header = ({ quranData, navigate }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
  >
    <h1 className="text-3xl md:text-4xl font-bold text-emerald-900 text-center font-bangla">
      Translation of Quran <span className="text-xl " >( lang: {quranData?.edition?.language} By {quranData?.edition?.englishName})</span>
    </h1>
    <button
      onClick={() => navigate(-1)}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2"
    >
      <FaArrowLeft />
      Go Back
    </button>
  </motion.div>
);

export default Quran;