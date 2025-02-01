import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaQuran } from "react-icons/fa";
import { motion } from "framer-motion";

const Quran = () => {
  const navigate = useNavigate();
  
  const [quranData, setQuranData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSurah, setSelectedSurah] = useState(null);
  
  
  const {identifier}=useParams();
  console.log("Location identifier: ",identifier);
  
  // Fetch Quran Data with timeout and cancel token
  useEffect(() => {
    const source = axios.CancelToken.source();
    const timeout = setTimeout(() => {
      source.cancel("Request timed out");
    }, 15000); // 15 seconds timeout

    const fetchQuranData = async () => {
      try {
        let response={}
      if(!identifier){
        response = await axios.get(
          `https://api.alquran.cloud/v1/quran/bn.hoque`,
          { cancelToken: source.token }
        );

      }
         response = await axios.get(
          `https://api.alquran.cloud/v1/quran/${identifier}`,
          { cancelToken: source.token }
        );
        
        if (response.data.code !== 200) {
          throw new Error("Failed to fetch Quran data");
        }
        
        setQuranData(response.data.data);
        setLoading(false);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Error fetching Quran data:", err.message);
          setError(`কুরআনের ডেটা লোড করতে ব্যর্থ। ত্রুটি: ${err.message}`);
          setLoading(false);
        }
      } finally {
        clearTimeout(timeout);
      }
    };

    fetchQuranData();
    return () => source.cancel("Component unmounted");
  }, [identifier]);

  // console.log("identifier: ",identifier);
  
  // console.log("quranData:", quranData);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // fetchQuranData();
  };

  useEffect(() => {
    if (selectedSurah) {
      navigate(`/essentials/${selectedSurah.number}/${selectedSurah.englishName}-ayahs`, {
        state: { selectedSurah },
      });
    }
  }, [selectedSurah, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white">
        <div className="space-y-4">
          <div className="flex justify-center">
            <FaQuran className="text-6xl text-emerald-600 animate-pulse" />
          </div>
          <p className="text-center text-2xl text-emerald-800 font-semibold">
            কুরআন লোড হচ্ছে...
          </p>
          <div className="flex justify-center">
            <div className="w-48 h-1 bg-emerald-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full animate-progress" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-red-500 text-6xl">⚠️</div>
          <p className="text-red-600 text-xl font-medium">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg flex items-center justify-center gap-2 mx-auto"
          >
            <FaQuran />
            আবার চেষ্টা করুন
          </button>
        </div>
      </div>
    );
  }

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
            পবিত্র কুরআন (বাংলা অনুবাদ)
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <FaArrowLeft />
            ফিরে যান
          </button>
        </motion.div>

        {/* Surah Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {quranData.surahs.map((surah) => (
            <motion.div
              key={surah.number}
              whileHover={{ scale: 1.02 }}
              className="bg-white border-2 border-emerald-100 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer group"
              onClick={() => setSelectedSurah(surah)}
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
                  <span className="font-semibold">অর্থ:</span>{" "}
                  {surah.englishNameTranslation}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">আয়াত সংখ্যা:</span>{" "}
                  {surah.ayahs.length}
                </p>
              </div>

              <div className="mt-4 flex justify-between items-center text-sm text-emerald-800">
                <span className="flex items-center gap-1">
                  <FaQuran className="text-emerald-600" />
                  সূরা শুরু
                </span>
                <span className="bg-emerald-600 text-white px-2 py-1 rounded-md">
                  পৃষ্ঠা {surah.ayahs[0].page}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Quran;