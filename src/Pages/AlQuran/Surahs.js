import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import { FaPlay, FaPause , FaArrowLeft} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";

const QuranSurah = () => {
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCount, setRetryCount] = useState(0);

  const fetchSurahs = async () => {
    try {
      setLoading(true);
      setError(null);
      const source = axios.CancelToken.source();
      const timeout = setTimeout(() => {
        source.cancel("Request timed out");
      }, 15000);

      const response = await axios.get("https://api.alquran.cloud/v1/quran/ar.alafasy", {
        cancelToken: source.token
      });
      clearTimeout(timeout);
      setSurahs(response.data.data.surahs);
    } catch (err) {
      if (axios.isCancel(err)) {
        setError("Request timed out. Please try again.");
      } else if (err.response) {
        setError("Server error. Please try again later.");
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurahs();
  }, [retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
  };


  const AudioPlayer = ({ src }) => {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = React.useRef(null);

    const togglePlay = () => {
      if (playing) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setPlaying(!playing);
    };

    const handleTimeUpdate = () => {
      const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    };

    return (
      <div className="mt-3">
        <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={() => setPlaying(false)}>
          <source src={src} type="audio/mpeg" />
        </audio>
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="p-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
          >
            {playing ? <FaPause size={14} /> : <FaPlay size={14} />}
          </button>
          <div className="flex-1 bg-gray-200 h-1 rounded-full">
            <div
              className="bg-emerald-500 h-1 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const handlePageChange = (direction) => {
    setCurrentPage(prev => direction === "next" ? prev + 1 : prev - 1);
  };

  const totalPages = Math.ceil(surahs.length / itemsPerPage);
  const currentSurahs = surahs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Breadcrumb pageName="Surahs" />
       <button
          onClick={() => navigate(-1)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2"
        >
          <FaArrowLeft />
            Go Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center text-emerald-800">Quran Surahs</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(itemsPerPage)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white p-4 rounded-xl shadow-md">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {currentSurahs.map((surah) => (
              <div
                key={surah.number}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-800">
                      {surah.number}. {surah.englishName}
                    </h3>
                    <p className="text-sm text-gray-500">{surah.englishNameTranslation}</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                    {surah.revelationType}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
                  <p>{surah.name}</p>
                  <p>{surah.ayahs.length} Ayat</p>
                </div>

                <AudioPlayer src={surah.ayahs[0].audio} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MdOutlineArrowBackIos />
              Previous
            </button>
            
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange("next")}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuranSurah;