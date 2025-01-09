import React, { useEffect, useState } from "react";

import axios from "axios";

const quranApiUrl = "http://api.alquran.cloud/v1/quran/ar.alafasy";

const Surahs = () => {
     const [surahs, setSurahs] = useState([]);
      
  const [itemsPerPage] = useState(10);

      const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
      setTimeout(() => {
        const fetchSurahs = async () => {
          try {
            const response = await axios.get(quranApiUrl);
            setSurahs(response.data.data.surahs);
          } catch (error) {
            console.error("Error fetching Surahs:", error);
          }
        };
        fetchSurahs();
      }, 3000);
        
      }, []);

console.log("surahs:",surahs);


      const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(surahs.length / itemsPerPage)) {
          setCurrentPage((prev) => prev + 1);
        } else if (direction === "prev" && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };
      
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSurahs = surahs.slice(startIndex, startIndex + itemsPerPage);
  return (
    <>
      <div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {currentSurahs.map((surah) => (
            <div
              key={surah.number}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-lg">
                  {surah.number}. {surah.englishName}
                </p>
                <p className="text-gray-600">{surah.name}</p>
              </div>
              <p className="text-sm text-gray-500 mb-2">
                {surah.englishNameTranslation}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                {surah.revelationType}
              </p>
              <p className="text-sm text-gray-500">{surah.ayahs.length} Ayat</p>
              <audio controls className="mt-2 w-full">
                <source src={surah.ayahs[0].audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {Math.ceil(surahs.length / itemsPerPage)}
          </p>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === Math.ceil(surahs.length / itemsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Surahs;
