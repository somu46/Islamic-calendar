import React, { useEffect, useState } from "react";
import axios from "axios";
import { getFullQuran } from "../../../apiServices/apiServices";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Breadcrumb from "../../../Components/Breadcrumb/Breadcrumb";
import { FaPause, FaPlay } from "react-icons/fa";

const FullQuran = () => {
  const navigate = useNavigate();
  const [surahList, setSurahList] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState("");
  const [fullRawQuranResponse, setRawFullQuranResponse] = useState(null);
  const [selectLanguage, setSelectLanguage] = useState("");
  const [selectAudioRecitation, setSelectAudioRecitation] = useState("");
  const [error, setError] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchSurahList = async () => {
      try {
        const response = await axios.get("https://api.alquran.cloud/v1/surah");
        const surahs = response.data.data.map((surah) => ({
          number: surah.number,
          englishName: surah.englishName,
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
        if (selectedSurah) {
          const response = await getFullQuran(source, selectedSurah);
          setRawFullQuranResponse(response);
        }
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

  useEffect(() => {
    setShowContent(false);
  }, [selectedSurah, selectLanguage, selectAudioRecitation]);

  const goBack = () => navigate(-1);

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
      const percentage =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(percentage);
    };

    return (
      <div className="mt-3">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setPlaying(false)}
        >
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

  const allSelectionsMade = () => {
    return selectedSurah && selectLanguage && selectAudioRecitation;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Breadcrumb pageName="Al-Quran" />
        <div className="flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-semibold text-green-600">Al-Quran</h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              onClick={goBack}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-emerald-200/50"
            >
              <FaArrowLeft className="text-lg" /> Go Back
            </button>
          </motion.div>
        </div>

        <div className="mb-4">
          <div className="space-y-4 p-4">
            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Select Surah
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(e.target.value)}
              >
                <option value="">Please Select a Surah</option>
                {surahList.map((surah) => (
                  <option key={surah.number} value={surah.number}>
                    {surah.number}: {surah.englishName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Select Language
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectLanguage}
                onChange={(e) => setSelectLanguage(e.target.value)}
              >
                <option value="">Please Select your Language</option>
                <option value="arabic1">Arabic (Version 1)</option>
                <option value="arabic2">Arabic (Version 2)</option>
                <option value="english">English</option>
                <option value="bengali">Bengali</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-semibold block mb-2">
                Select Audio Recitation
              </label>
              <select
                className="w-full p-2 border rounded-lg"
                value={selectAudioRecitation}
                onChange={(e) => setSelectAudioRecitation(e.target.value)}
              >
                <option value="">Please Select a Audio Recitation</option>
                {fullRawQuranResponse?.audio &&
                  Object.keys(fullRawQuranResponse.audio).map((reciter) => (
                    <option key={reciter} value={reciter}>
                      {fullRawQuranResponse.audio[reciter].reciter}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-6">
              <button
                onClick={() => setShowContent(true)}
                disabled={!allSelectionsMade()}
                className={`w-full py-3 px-6 rounded-lg transition-all font-semibold ${
                  allSelectionsMade()
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Show Quran Content
              </button>
            </div>
          </div>
        </div>

        {error && <div className="text-red-600 p-4">Error: {error}</div>}

        {showContent && fullRawQuranResponse && (
          <div>
            <header className="text-center mb-8">
              <h1 className="font-amiri text-4xl text-emerald-900 mb-4 leading-tight">
                {fullRawQuranResponse.surahNameArabicLong}
              </h1>
              <h2 className="text-2xl font-semibold text-gray-700">
                {fullRawQuranResponse.surahNameTranslation} (
                {fullRawQuranResponse.surahName})
              </h2>
            </header>

            <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <p className="text-gray-600">
                <span className="font-semibold text-emerald-800">
                  Revelation Place:
                </span>{" "}
                {fullRawQuranResponse.revelationPlace}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold text-emerald-800">
                  Total Verses:
                </span>{" "}
                {fullRawQuranResponse.totalAyah}
              </p>
            </section>

            <section className="mb-12">
              <h3 className="text-xl font-semibold text-emerald-900 mb-4">
                Audio Recitations
              </h3>
              {fullRawQuranResponse.audio[selectAudioRecitation] && (
                <div className="bg-white p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-medium text-gray-700 mb-2">
                    {fullRawQuranResponse.audio[selectAudioRecitation].reciter}
                  </p>
                  <AudioPlayer
                    src={fullRawQuranResponse.audio[selectAudioRecitation].url}
                  />
                </div>
              )}
            </section>

            <section className="space-y-8">
              {Array.from({ length: fullRawQuranResponse.totalAyah }).map(
                (_, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                        {selectLanguage.toUpperCase()}
                      </h4>
                      <p className="font-amiri text-3xl leading-relaxed text-emerald-900">
                        {fullRawQuranResponse[selectLanguage][index]}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                        English Translation
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {fullRawQuranResponse.english[index]}
                      </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                        Bengali Translation
                      </h4>
                      <p className="text-gray-700 leading-relaxed">
                        {fullRawQuranResponse.bengali[index]}
                      </p>
                    </div>
                  </article>
                )
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default FullQuran;