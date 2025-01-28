import React from 'react';

const Community = () => {
  const testimonials = [
    {
      name: 'Ahmed Hassan',
      country: 'United Kingdom',
      initials: 'AH',
      feedback:
        'This platform has helped me stay connected with my faith despite my busy schedule. The prayer times and Quran features are invaluable.',
    },
    {
      name: 'Fatima Rahman',
      country: 'Malaysia',
      initials: 'FR',
      feedback:
        'The Zakat calculator and Islamic calendar have made it so much easier to fulfill my religious obligations accurately.',
    },
    {
      name: 'Mohammad Khan',
      country: 'Canada',
      initials: 'MK',
      feedback:
        'The daily Hadith and Duas section has become an essential part of my morning routine. Thank you for this beautiful platform.',
    },
  ];

  return (
    <div className="p-6 ">
      <h1 className="text-center text-3xl font-bold mb-4">Our Community</h1>
      <p className="text-center text-lg mb-8">
        Join our growing community of believers seeking knowledge and guidance
      </p>

      {/* Stats Section */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
  {[
    { value: '50K+', label: 'Active Members' },
    { value: '1M+', label: 'Daily Prayers' },
    { value: '5K+', label: 'Daily Questions' },
  ].map((stat, index) => (
    <div key={index} className='bg-white shadow-md rounded-lg p-6 text-center flex flex-col ' >
      <h2 className="text-3xl font-bold text-teal-500">{stat.value}</h2>
      <p className="text-gray-600">{stat.label}</p>
    </div>
  ))}
</div>

      {/* Testimonials Section */}
      <h2 className="text-center text-2xl font-bold mb-6">
        Community Testimonials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <div className="flex justify-center items-center w-16 h-16 bg-teal-100 text-teal-500 rounded-full mx-auto mb-4 text-xl font-bold">
              {testimonial.initials}
            </div>
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{testimonial.country}</p>
            <p className="text-gray-600">{testimonial.feedback}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-10">
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          Join Our Community
        </button>
      </div>
      {/* Subscription Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-10">
        <h3 className="text-lg font-semibold text-center mb-4">
          Stay Connected
        </h3>
        <p className="text-center text-gray-600 mb-4">
          Subscribe to receive daily Islamic reminders and updates
        </p>
        <form className="flex flex-col md:flex-row justify-center items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 border rounded-lg w-full md:w-2/3 focus:outline-none"
          />
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;
