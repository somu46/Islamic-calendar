import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineArrowBackIos ,MdOutlineArrowForwardIos} from "react-icons/md";

const quranApiUrl = "https://api.alquran.cloud/v1/quran/ar.alafasy";

const Surahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        setError(null);
        const source = axios.CancelToken.source();
        const timeout = setTimeout(() => {
          source.cancel("Request timed out");
        }, 25000); // 25 seconds timeout

        const response = await axios.get(quranApiUrl, { cancelToken: source.token });
        clearTimeout(timeout);
        setSurahs(response.data.data.surahs);
      } catch (err) {
        if (axios.isCancel(err)) {
          setError("The request took too long to complete. Please try again.");
        } else {
          setError("Failed to fetch data. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, []);

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
    <div className="container mx-auto px-4 py-6">
      {loading ? (
        <div className="text-center">
          <p className="text-lg font-semibold">Loading Surahs...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          {/* Grid for Surahs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {currentSurahs.map((surah) => (
              <div
                key={surah.number}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-lg">
                    {surah.number}. {surah.englishName}
                  </p>
                  <p className="text-gray-600 text-sm">{surah.name}</p>
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              <MdOutlineArrowBackIos className='text-[25px]' />
            </button>
            <p className="text-sm">
              Page {currentPage} of {Math.ceil(surahs.length / itemsPerPage)}
            </p>
            <button
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === Math.ceil(surahs.length / itemsPerPage)}
            >
             <MdOutlineArrowForwardIos className='text-[25px]'/>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surahs;
