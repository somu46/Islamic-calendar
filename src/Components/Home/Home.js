import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Feature from '../Feature/Feature';
import PrayerTimesWidge from '../../Pages/PrayerTime/Widgets/PrayerTimesWidge';
import EssentialTools from '../EssentialsTools/EssentialTools';
import Community from '../Community/Community';
import QiblaDirection from '../Qibla/QiblaDirection';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const latitude = sessionStorage.getItem('latitude');
    const longitude = sessionStorage.getItem('longitude');
    const location = sessionStorage.getItem('location');

    // console.log('latitude:', latitude);
    // console.log('longitude:', longitude);
    // console.log('location:', location);

    if ((!latitude && !longitude) && !location) {
     
      navigate('/change-location');
    }
  }, [navigate]);

  return (
    <>
      <div className="mt-[4.9rem]">
        <PrayerTimesWidge />
      </div>
      <div className="flex flex-col min-h-screen ">
        <main className="flex-grow">
          {/* Welcome Section */}
          <section className="container mx-auto text-center py-20">
            <h2 className="text-5xl font-extrabold text-teal-900 mb-6">
              Welcome to Islamic Knowledge
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
              Discover the beauty of Islamic teachings, explore the rich heritage of Islamic history, 
              and stay informed about key events and dates.
            </p>
            <Link
              to="/essentials"
              className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300"
            >
              Explore the Islamic Knowledge
            </Link>
          </section>
          <EssentialTools />
          {/* Featured Content */}
          
          <Feature />
          <QiblaDirection/>
          {/* Inspirational Quote */}
          {/* <section id="prayers" className="bg-transparent py-20">
            <div className="container mx-auto text-center">
              <blockquote className="text-2xl italic text-gray-800 max-w-3xl mx-auto">
                "Indeed, the reminder benefits the believers."
                <span className="block mt-4 text-lg font-semibold text-teal-700">— Quran 51:55</span>
              </blockquote>
            </div>
          </section> */}
        </main>
        <Community/>
      </div>
    </>
  );
};

export default Home;
