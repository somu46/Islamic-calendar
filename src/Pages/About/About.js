import React from 'react';
import { FaHandsHelping, FaHeart, FaPeace } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="bg-teal-700 text-white py-12 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">About Us</h2>
          <p className="text-lg text-gray-100 mb-8">
            We are a non-profit organization blessed by Allah, driven by love, gratitude, and a
            passion for spreading peace. Our mission is to share the message of Islam, the most
            peaceful and compassionate religion, with people around the world, regardless of their
            background or beliefs.
          </p>
        </div>

        {/* About Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-transparent text-white rounded-lg shadow shadow-white p-6 hover:scale-105 transform transition-all">
            <div className="flex justify-center mb-4">
              <FaHandsHelping className="text-white text-5xl" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center">Our Purpose</h4>
            <p className="text-sm text-white text-center">
              We are here to spread love and kindness to all, guided by the teachings of Islam. Our
              platform is dedicated to helping individuals connect with the true spirit of Islam.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-transparent text-white rounded-lg shadow shadow-white p-6 hover:scale-105 transform transition-all">
            <div className="flex justify-center mb-4">
              <FaHeart className="text-white text-5xl" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center">Our Belief</h4>
            <p className="text-sm text-white text-center">
              We believe that Islam is a religion of peace, compassion, and gratitude. Our goal is
              to foster understanding, unity, and peace by sharing the core values of Islam.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-transparent text-white rounded-lg shadow shadow-white p-6 hover:scale-105 transform transition-all">
            <div className="flex justify-center mb-4">
              <FaPeace className="text-white text-5xl" />
            </div>
            <h4 className="text-xl font-semibold mb-2 text-center">Our Vision</h4>
            <p className="text-sm text-white text-center">
              Our vision is to bring peace, hope, and blessings to every individual we reach. By
              sharing the teachings of Islam, we hope to inspire others to live with compassion and
              gratitude.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
