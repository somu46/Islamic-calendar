import React from 'react';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
    <div className='mt-[5.1rem]'>
    <Breadcrumb pageName="About Us" />
    </div>
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-6 sm:px-10 lg:px-16 ">
      {/* Breadcrumb */}
    

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
          Empowering the Islamic Community Worldwide
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          As a non-profit organization, we are committed to connecting Muslims living in non-Islamic countries with tools, resources, and a community that supports their spiritual journey.
        </p>
      </div>

      {/* Sections */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Section 1 */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To foster a global community where every Muslim can practice their faith with ease and confidence, no matter their location.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To provide an authentic platform for prayer timings, Islamic teachings, and event notifications to connect Muslims worldwide.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-100 shadow-lg rounded-lg p-8 flex items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Serving the Community
            </h2>
            <p className="text-gray-600">
              Our platform offers a wide range of features, including prayer reminders, an Islamic calendar, and access to resources that strengthen faith and unity.
            </p>
          </div>
        </div>

        {/* Section 4 */}
        <div className="bg-gradient-to-r from-cyan-50 to-teal-100 shadow-lg rounded-lg p-8 flex items-center">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Join Our Cause
            </h2>
            <p className="text-gray-600">
              We invite you to be part of this noble mission. Whether through volunteering, contributing, or connecting, you can make a difference.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16 bg-white shadow-lg rounded-lg p-8 text-center">
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          What Our Community Says
        </h3>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="w-full sm:w-72 bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-600">
              "This platform has been a blessing for me. I feel more connected to my faith and community than ever before."
            </p>
            <p className="mt-4 text-teal-700 font-semibold">— Amina, UK</p>
          </div>
          <div className="w-full sm:w-72 bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-600">
              "The prayer reminders and Islamic calendar have made my life so much easier. JazakAllah Khair!"
            </p>
            <p className="mt-4 text-teal-700 font-semibold">— Faisal, USA</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <Link
          to="/contact-us"
          className="inline-block px-8 py-4 bg-teal-600 text-white rounded-lg text-lg font-semibold hover:bg-teal-700 shadow-lg transition duration-300"
        >
          Contact Us
        </Link>
      </div>
    </div>
    </>
  );
};

export default About;
