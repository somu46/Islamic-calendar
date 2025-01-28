import React, { useEffect, useState } from "react";
import { getQuran_Juz } from "../../apiServices/apiServices";
import {ArrowForwardIosRounded, ArrowBackIosNewRounded} from '@mui/icons-material';

const Juz = () => {
  const [juzData, setJuzData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const totalPages = 30;
  // const itemsPerPage=30;
 // Number of ayahs per page

 

  useEffect(() => {
    const fetchJuzData = async () => {
      try {
        const response = await getQuran_Juz(currentPage); 
        setJuzData(response); 
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Juz data:", err);
        setError("Failed to load Juz data.");
        setLoading(false);
      }
    };

    fetchJuzData();
  }, [currentPage]); // Re-fetch data when the currentPage changes



  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setcurrentPage((prevPage) => prevPage + 1);
      window.scrollTo(0,0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setcurrentPage((prevPage) => prevPage - 1);
      window.scrollTo(0,0);
    }
  };
  if (loading) {
    return <p className="text-center text-gray-600">Loading Juz data...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Juz {juzData.number} - {juzData.edition.name} 
      </h1>

      {/* Display Ayahs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {juzData.ayahs.map((ayah, index) => (
          <div
            className="bg-white border rounded-lg shadow hover:shadow-lg transition-shadow p-4"
            key={ayah.number}
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {ayah.surah.englishName} - Ayah {ayah.numberInSurah}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{ayah.text}</p>
            <p className="text-sm">
              <span className="font-semibold">Revelation Type:</span>{" "}
              {ayah.surah.revelationType}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Page:</span> {ayah.page}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-8">
        <button
          aria-label="Previous Page"
          onClick={handlePrevPage }
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <ArrowBackIosNewRounded/>
        </button>
        <span className="text-xl text-gray-700">
        Page {currentPage} of {totalPages}
        </span>
        <button
        aria-label="Next Page"
          onClick={handleNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          <ArrowForwardIosRounded/>
        </button>
      </div>
    </div>
  );
};

export default Juz;
