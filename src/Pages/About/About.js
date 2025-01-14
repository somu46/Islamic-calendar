import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 py-12 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Our company was founded in 2020 by a group of passionate individuals who wanted to make Islamic knowledge more accessible to everyone. We believe that by providing accurate and reliable information about Islam, we can help people better understand and appreciate the beauty of this great religion.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {/* Vision Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-72">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To create a world where accurate knowledge about Islam is easily accessible to all, promoting peace, understanding, and tolerance.
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-72">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide a reliable platform for authentic Islamic content, helping individuals deepen their understanding and practice of Islam.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-72">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Integrity in our content</li>
              <li>Commitment to accuracy</li>
              <li>Respect for diverse perspectives</li>
              <li>Empathy and community building</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
