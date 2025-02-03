import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBookOpen } from "react-icons/fa";
import { motion } from "framer-motion";

const SurahAyahs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSurah } = location.state || {};

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (!selectedSurah) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-white p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h1 className="text-2xl font-semibold text-gray-800">
            surah is not selected
          </h1>
          <p className="text-gray-600">
            Please go back and select a surah to view its ayahs.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <FaArrowLeft />
           Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-emerald-900">
             surah:{selectedSurah.englishName}
            </h1>
            <p className="text-3xl md:text-4xl font-arabic text-emerald-800 mt-2">
              {selectedSurah.name}
            </p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2"
          >
            <FaArrowLeft />
            Go Back
          </motion.button>
        </div>

        {/* Ayahs List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4"
        >
          {selectedSurah.ayahs.map((ayah) => (
            <motion.div
              key={ayah.number}
              variants={itemVariants}
              className="bg-white border-2 border-emerald-100 rounded-xl shadow-sm hover:shadow-md transition-all p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                Ayah {ayah.numberInSurah}
                </span>
                <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
                 Page{ayah.page}
                </span>
              </div>

              <div className="mb-4">
                <p className="text-3xl text-emerald-900 text-right font-arabic leading-relaxed">
                  {ayah.text}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <FaBookOpen className="text-emerald-600" />
                 surah:{selectedSurah.englishName}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SurahAyahs;