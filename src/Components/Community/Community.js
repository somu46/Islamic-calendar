import React from 'react';

const Community = () => {
  const testimonials = [
    {
      name: 'Anis Khan',
      country: 'Bangladesh',
      initials: 'AK',
      feedback:
        'এই প্ল্যাটফর্মটি আমাকে আমার ব্যস্ত সময়সূচী সত্ত্বেও আমার বিশ্বাসের সাথে সংযুক্ত থাকতে সাহায্য করেছে। নামাজের সময় এবং কুরআনের বৈশিষ্ট্যগুলি অমূল্য।',
    },
    {
      name: 'Md. Anisur Rahman',
      country: 'India',
      initials: 'AR',
      feedback:
        'The Prayer Time feature and Islamic calendar have made it so much easier to fulfill my religious obligations accurately.',
    },
    {
      name: 'Zakir Hossain',
      country: 'India',
      initials: 'ZH',
      feedback:
        'Al-Quran and Prayer times section has become an essential part of my morning routine. Thank you for this beautiful platform.',
    },
  ];

  return (
    <div className="p-6 ">
      <h1 className="text-center text-3xl font-bold mb-4">Our Community</h1>
      <p className="text-center text-lg mb-8">
        Join our growing community of believers seeking knowledge and guidance
      </p>

      {/* Stats Section */}
    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 mx-auto">
  {[
    { value: '5K+', label: 'Active Members' },
    { value: '100K+', label: 'Daily Prayers' },
    { value: '500+', label: 'Daily Questions' },
  ].map((stat, index) => (
    <div key={index} className='flex flex-col items-center justify-center w-[140px] h-[140px] p-4 bg-white rounded-lg shadow-lg mb-10' >
      <h2 className="text-3xl font-bold text-teal-500 mb-1">{stat.value}</h2>
      <p className="text-gray-600 text-center">{stat.label}</p>
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
      {/* <div className="text-center mt-10">
        <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
          Join Our Community
        </button>
      </div> */}
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
          <button className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600">
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;
