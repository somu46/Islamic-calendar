import React, { useEffect, useState } from 'react';
import { getFullQuran } from '../../../apiServices/apiServices';
import axios from 'axios';

const FullQuran = () => {
  const [fullQuranResponse, setFullQuranResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchFullQuranData = async () => {
      try {
        const response = await getFullQuran(source);
        setFullQuranResponse(response);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching Quran data:', error);
          setError(error.message);
        }
      }
    };

    fetchFullQuranData();

    return () => {
      source.cancel('Component unmounted, canceling request');
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!fullQuranResponse) {
    return (
      <div className="p-4 text-center text-gray-600">
        Loading Quran...
      </div>
    );
  }

  return (
    <>
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="font-amiri text-4xl text-emerald-900 mb-4 leading-tight">
            {fullQuranResponse.surahNameArabicLong}
          </h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            {fullQuranResponse.surahNameTranslation} ({fullQuranResponse.surahName})
          </h2>
        </header>

        {/* Meta Information */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-semibold text-emerald-800">Revelation Place:</span>{' '}
              {fullQuranResponse.revelationPlace}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold text-emerald-800">Total Verses:</span>{' '}
              {fullQuranResponse.totalAyah}
            </p>
          </div>
        </section>

        {/* Audio Recitations */}
        <section className="mb-12">
          <h3 className="text-xl font-semibold text-emerald-900 mb-4">
            Audio Recitations
          </h3>
          <div className="space-y-4">
            {Object.values(fullQuranResponse.audio).map((recitation, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-medium text-gray-700 mb-2">
                  {recitation.reciter}
                </p>
                <audio 
                  controls 
                  className="w-full mt-2 audio-player"
                  data-reciter={recitation.reciter}
                >
                  <source src={recitation.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        </section>

        {/* Verses Section */}
        <section className="space-y-8">
          {Array.from({ length: fullQuranResponse.totalAyah }).map((_, index) => (
            <article 
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 verse-card"
            >
              {/* Arabic Text */}
              <div className="mb-6" dir="rtl">
                <p className="font-amiri text-3xl leading-relaxed text-emerald-900">
                  {fullQuranResponse.arabic1[index]}
                </p>
                <p className="font-amiri text-xl text-gray-600 mt-4">
                  {fullQuranResponse.arabic2[index]}
                </p>
              </div>

              {/* Translations */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                    English Translation
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {fullQuranResponse.english[index]}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-emerald-800 mb-2">
                    Bengali Translation
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {fullQuranResponse.bengali[index]}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
    </>
  );
};

export default FullQuran;