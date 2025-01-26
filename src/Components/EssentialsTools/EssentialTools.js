import React from 'react';
import { FaPray, FaQuran, FaCalendarAlt, FaCalculator, FaBook, FaSyncAlt } from 'react-icons/fa';

const EssentialTools = () => {
  const tools = [
    {
      title: 'Prayer Times',
      description: 'Accurate prayer times based on your location with Qibla direction',
      icon: <FaPray className="text-4xl text-green-500" />,
      link: '#',
    },
    {
      title: 'Digital Quran',
      description: 'Read and listen to the Quran with multiple translations',
      icon: <FaQuran className="text-4xl text-green-500" />,
      link: '#',
    },
    {
      title: 'Islamic Calendar',
      description: 'Track Hijri dates and important Islamic events',
      icon: <FaCalendarAlt className="text-4xl text-green-500" />,
      link: '#',
    },
    {
      title: 'Zakat Calculator',
      description: 'Calculate your Zakat easily with our comprehensive tool',
      icon: <FaCalculator className="text-4xl text-green-500" />,
      link: '#',
    },
    {
      title: 'Islamic Knowledge',
      description: 'Access Hadiths, Duas, and Islamic teachings',
      icon: <FaBook className="text-4xl text-green-500" />,
      link: '#',
    },
    {
      title: 'Date Converter',
      description: 'Convert between Hijri and Gregorian calendars',
      icon: <FaSyncAlt className="text-4xl text-green-500" />,
      link: '#',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl font-bold mb-4">Essential Islamic Tools</h1>
      <h3 className="text-center text-lg mb-6">
        Discover our comprehensive collection of Islamic resources designed to enhance your spiritual journey
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start"
          >
            <div className="mb-4">{tool.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{tool.title}</h2>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <a
              href={tool.link}
              className="text-green-500 font-medium hover:underline"
            >
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssentialTools;
