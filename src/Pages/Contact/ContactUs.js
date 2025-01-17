import React from 'react';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

const ContactUs = () => {
  return (
    <>
     
   
    <div className="relative flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100  items-center justify-center px-4 sm:px-6 lg:px-8  mt-[4.8rem]"> 
    <div className="absolute top-[1px] left-0">
      <Breadcrumb pageName='Contact Us' />
      </div>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-[3.5rem]">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Have any questions or feedback? We'd love to hear from you!
        </p>
        
        <form className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="How can we help you?"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="mt-10 border-t pt-6 text-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Our Contact Information</h3>
          <p className="text-gray-600">
            Phone: <span className="font-medium">+1 (234) 567-890</span>
          </p>
          <p className="text-gray-600">
            Email: <span className="font-medium">contact@yourwebsite.com</span>
          </p>
          <p className="text-gray-600">
            Address: <span className="font-medium">1234 Main St, Anytown, USA</span>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
