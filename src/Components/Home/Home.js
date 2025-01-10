import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-teal-50 to-cyan-100">
      {/* Navbar */}
      <header className="bg-teal-700 text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">Islamic Knowledge</h1>
          <ul className="flex space-x-6">
            <li><a href="#calendar" className="hover:underline">Islamic Calendar</a></li>
            <li><a href="#prayers" className="hover:underline">Prayer Times</a></li>
            <li><a href="#articles" className="hover:underline">Articles</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
          </ul>
        </nav>
      </header>

      {/* Main Content */}
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
          <a 
            href="#calendar" 
            className="px-8 py-4 bg-amber-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-amber-600 transition-all duration-300"
          >
            Explore the Islamic Calendar
          </a>
        </section>

        {/* Featured Content */}
        <section id="calendar" className="bg-white py-16 shadow-inner">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl font-bold text-teal-800 mb-4">Islamic Calendar</h3>
            <p className="text-gray-600 mb-6">
              Keep track of important Islamic dates, events, and holidays throughout the year.
            </p>
            <a 
              href="/islamic-calendar"
              className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-all duration-300"
            >
              Open Calendar
            </a>
          </div>
        </section>

        {/* Inspirational Quote */}
        <section id="prayers" className="bg-gradient-to-r from-teal-100 to-cyan-50 py-20">
          <div className="container mx-auto text-center">
            <blockquote className="text-2xl italic text-gray-800 max-w-3xl mx-auto">
              "Indeed, the reminder benefits the believers."
              <span className="block mt-4 text-lg font-semibold text-teal-700">— Quran 51:55</span>
            </blockquote>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-teal-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Islamic Knowledge. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
