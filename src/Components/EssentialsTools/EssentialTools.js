import React from 'react';
import { FaPray, FaQuran, FaCalendarAlt, FaCalculator, FaBook, FaSyncAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EssentialTools = () => {
  const handleHistory=()=>{
    window.scrollTo(0,0);
  }
  const tools = [
    {
      title: 'Prayer Times',
      description: 'Accurate prayer times based on your location with Qibla direction',
      icon: <FaPray className="text-4xl text-teal-500" />,
      link: "/essentials/prayer-times",
    },
    {
      title: 'Digital Quran',
      description: 'Read and listen to the Quran with multiple translations',
      icon: <FaQuran className="text-4xl text-teal-500" />,
      link: "/essentials/al-quran",
    },
    {
      title: 'Islamic Calendar',
      description: 'Track Hijri dates and important Islamic events',
      icon: <FaCalendarAlt className="text-4xl text-teal-500" />,
      link: "/essentials/islamic-calendar",
    },
    {
      title: 'Zakat Calculator',
      description: 'Calculate your Zakat easily with our comprehensive tool',
      icon: <FaCalculator className="text-4xl text-teal-500" />,
      link:  "/essentials/zakat-calculator" ,
    },
    {
      title: 'Islamic Knowledge',
      description: 'Access Hadiths, Duas, and Islamic teachings',
      icon: <FaBook className="text-4xl text-teal-500" />,
      link: '#',
    },
    {
      title: 'Date Converter',
      description: 'Convert between Hijri and Gregorian calendars',
      icon: <FaSyncAlt className="text-4xl text-teal-500" />,
      link: "/essentials/date-converter",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-4">Our most popular islamic tools</h1>
      <h3 className="text-center text-lg mb-6">
        Discover our comprehensive collection of Islamic resources designed to enhance your spiritual journey
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col"
          >
            <div className="mb-4 mx-auto">{tool.icon}</div>
            <h2 className="text-xl font-semibold mb-2 mx-auto">{tool.title}</h2>
            <p className="text-gray-600 mb-4 text-center">{tool.description}</p>
            <Link
              to={tool.link}
              onClick={handleHistory}
              className="text-teal-500 text-center font-medium hover:underline hover:scale-105 duration-300 "
            >
              Learn more →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssentialTools;
