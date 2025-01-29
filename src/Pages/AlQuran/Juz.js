import React, { useEffect, useState } from "react";
import { getQuran_Juz } from "../../apiServices/apiServices";
import { ArrowForwardIosRounded, ArrowBackIosNewRounded } from '@mui/icons-material';
import { motion } from "framer-motion";

const Juz = () => {
  const [juzData, setJuzData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const totalPages = 30;

  useEffect(() => {
    const fetchJuzData = async () => {
      try {
        setLoading(true);
        const response = await getQuran_Juz(currentPage);
        setJuzData(response);
      } catch (err) {
        console.error("Error fetching Juz data:", err);
        setError("Failed to load Juz data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchJuzData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setcurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-white"
      >
        <div className="max-w-md text-center space-y-4">
          <div className="text-emerald-600 text-6xl mb-4">🕌</div>
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              handlePageChange(currentPage);
            }}
            className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-200/50"
          >
            Retry Now
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen">
      {/* Header Section */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-emerald-900 mb-4 font-serif">
          Juzʼ {currentPage}
          <span className="text-emerald-600 text-2xl ml-2">الجزء {currentPage}</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="relative w-64 h-2 bg-emerald-100 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
          <span className="text-emerald-900 font-medium">
            {currentPage}<span className="text-emerald-500">/{totalPages}</span>
          </span>
        </div>
      </motion.div>

      {/* Content Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="animate-pulse bg-white p-6 rounded-2xl shadow-lg"
            >
              <div className="h-7 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-6" />
              <div className="h-32 bg-gray-200 rounded-xl mb-4" />
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <>
          {/* Ayahs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {juzData.ayahs.map((ayah) => (
              <motion.div
                key={ayah.number}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-2 border-emerald-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-emerald-900">
                        {ayah.surah.englishName}
                        <span className="text-emerald-600 text-sm block mt-1">
                          {ayah.surah.englishNameTranslation}
                        </span>
                      </h2>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                      📖 Page {ayah.page}
                    </span>
                  </div>

                  <div className="mb-6 relative">
                    <div className="absolute top-0 left-0 text-emerald-500 text-opacity-10 text-7xl font-bold">
                      {ayah.numberInSurah}
                    </div>
                    <p className="text-4xl text-emerald-900 text-right mb-4 font-quran leading-relaxed relative z-10">
                      {ayah.text}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-emerald-900 font-medium">
                    <span className="inline-flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                      </svg>
                      {ayah.surah.revelationType}
                    </span>
                    <span className="bg-emerald-600 text-white px-3 py-1 rounded-full">
                      Verse {ayah.numberInSurah}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-6 mt-12"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-x-1 shadow-lg hover:shadow-emerald-200/50"
            >
              <ArrowBackIosNewRounded fontSize="small" />
              Previous Juz
            </button>
            
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => {
                const page = currentPage - 2 + i;
                if (page < 1 || page > totalPages) return null;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === page 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200'
                    } transition-colors`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:translate-x-1 shadow-lg hover:shadow-emerald-200/50"
            >
              Next Juz
              <ArrowForwardIosRounded fontSize="small" />
            </button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default Juz;