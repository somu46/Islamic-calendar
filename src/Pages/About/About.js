import React from 'react';
import { FaHandsHelping, FaHeart, FaPeace, FaQuran, FaMosque } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-br from-blue-500 via-blue-100 to-blue-300 py-20 mt-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 -left-20 w-48 h-48 bg-yellow-300 rounded-full mix-blend-multiply animate-blob"></div>
        <div className="absolute top-40 right-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Embracing Islamic Values of Peace & Compassion
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg md:text-xl text-gray-800 mb-6">
              As a non-profit Islamic organization blessed by Allah (SWT), we dedicate ourselves to sharing the beautiful message of Islam through compassion and understanding. Rooted in Quranic teachings and the Sunnah of Prophet Muhammad (PBUH), our interfaith dialogue initiatives and community outreach programs have reached over 500,000 people worldwide.
            </p>
            <p className="text-lg md:text-xl text-gray-800 mb-6">
              Through our charity projects, educational resources, and peace-building workshops, we strive to dispel misconceptions about Islam while promoting social harmony. Join us in our mission to foster global understanding of Islamic values, humanitarian aid, and spiritual growth.
            </p>
          </div>
        </div>

        {/* Enhanced About Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Card 1 - Updated with gradient and animation */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-blue-100">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <FaHandsHelping className="text-blue-600 text-4xl" />
                <FaMosque className="text-green-500 text-2xl ml-2 -mt-4" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Islamic Community Service
            </h2>
            <p className="text-gray-600 text-center">
              Providing humanitarian aid, educational programs, and interfaith dialogue opportunities based on Quranic principles. Our community outreach has established 15 Islamic centers across 3 continents.
            </p>
          </div>

          {/* Card 2 - Added statistics */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-green-100">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-green-100 rounded-full">
                <FaHeart className="text-green-600 text-4xl" />
                <FaQuran className="text-blue-500 text-2xl ml-2 -mt-4" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Quranic Education & Charity
            </h2>
            <p className="text-gray-600 text-center">
              Distributed 50,000 Quran copies globally, supported 200+ orphans through Islamic charity (Zakat), and conducted 500+ workshops on Prophet Muhammad's teachings. Join our Sadaqah initiatives today.
            </p>
          </div>

          {/* Card 3 - Added CTA */}
          <div className="bg-white rounded-2xl shadow-xl p-8 transform hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl border border-yellow-100">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-yellow-100 rounded-full">
                <FaPeace className="text-yellow-600 text-4xl" />
                <span className="text-2xl ml-2 -mt-4">🕋</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Global Peace Initiatives
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Leading international peace conferences and youth mentorship programs based on Islamic ethics. Partnered with 50+ organizations to promote social justice and environmental stewardship.
            </p>
            <button className="w-full py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Join Our Mission
            </button>
          </div>
        </div>

        {/* Additional SEO-rich content */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-800">
            Why Islamic Values Matter in Modern Society
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h4 className="text-xl font-semibold mb-4 text-blue-600">Islamic Teachings on Community</h4>
              <p className="text-gray-600">
                Our work in establishing Islamic food banks, free medical camps, and educational scholarships reflects the Quranic emphasis on social responsibility (Surah Al-Ma'un). Learn about our upcoming Ramadan 2024 initiatives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <h4 className="text-xl font-semibold mb-4 text-green-600">Understanding Muslim Practices</h4>
              <p className="text-gray-600">
                Explore our resources explaining the Five Pillars of Islam, Halal lifestyle, and the significance of Hajj. Discover how Islamic finance principles promote economic justice and ethical business practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;