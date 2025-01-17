import React from 'react';
import { Link } from 'react-router-dom';
import Feature from '../Feature/Feature';
import PrayerTimesWidge from '../../Pages/PrayerTime/Widgets/PrayerTimesWidge';
// import ScrollTop from '../ScrollTop/ScrollTop';
const Home = () => {
  return (
    <>
    <div className='bg-gradient-to-r from-teal-50 to-cyan-100  mt-[4.9rem]'>
      <PrayerTimesWidge/>
    </div>
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-50 to-cyan-100  ">
    
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
            href="/data/islamic-calendar" 
            className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300"
          >
            Explore the Islamic Calendar
          </Link>
        </section>

        {/* Featured Content */}
        <section id="calendar" className=" py-16 ">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-bold text-teal-800 mb-4">Islamic Calendar</h3>
            <p className="text-gray-600 mb-6">
              Keep track of important Islamic dates, events, and holidays throughout the year.
            </p>
            <a 
              href="/data/islamic-calendar"
              className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300"
            >
              Open Calendar
            </a>
          </div>
        </section>
        <Feature/>
        {/* Inspirational Quote */}
        <section id="prayers" className="bg-transparent py-20">
          <div className="container mx-auto text-center">
            <blockquote className="text-2xl italic text-gray-800 max-w-3xl mx-auto">
              "Indeed, the reminder benefits the believers."
              <span className="block mt-4 text-lg font-semibold text-teal-700">— Quran 51:55</span>
            </blockquote>
          </div>
        </section>
      </main>
     {/* <ScrollTop/> */}
      {/* Footer */}
 
    </div>
    </>
  );
};

export default Home;
