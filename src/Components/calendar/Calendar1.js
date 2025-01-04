import React from 'react';

const Calendar1 = () => {
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const bengaliDays = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহস্পতি', 'শুক্র', 'শনি'];
  const dates = [
    { date: 5, event: 'পূর্ব আষাঢ়' },
    { date: 6, event: 'দ্বিতীয়া' },
    { date: 7, event: 'তৃতীয়া' },
    { date: 8, event: 'চতুর্থী' },
    { date: 9, event: 'পঞ্চমী' },
    { date: 10, event: 'ষষ্ঠী' },
    { date: 11, event: 'সপ্তমী' },
    { date: 12, event: 'অষ্টমী' },
    { date: 13, event: 'নবমী' },
    { date: 14, event: 'দশমী' },
    { date: 15, event: 'একাদশী' },
    { date: 16, event: 'দ্বাদশী' },
    { date: 17, event: 'ত্রয়োদশী' },
    { date: 18, event: 'চতুর্দশী' },
    { date: 19, event: 'পূর্ণিমা' },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">জানুয়ারি - ২০২৫</h1>
        <h2 className="text-xl">পৌষ - মাস ১৪৩১</h2>
      </div>
      <div className="grid grid-cols-7 gap-4">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center font-bold">
            <div>{day}</div>
            <div>{bengaliDays[index]}</div>
          </div>
        ))}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index}></div>
        ))}
        {dates.map((date, index) => (
          <div key={index} className="border p-2 text-center">
            <div className="text-lg font-bold">{date.date}</div>
            <div>{date.event}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar1;
