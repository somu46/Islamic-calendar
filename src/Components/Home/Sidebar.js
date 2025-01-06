import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-full h-full bg-gray-200 p-4">
      <h3 className="text-lg font-semibold">Home</h3>
      <ul className="mt-2 space-y-4">
        <li className="text-sm hover:text-blue-500 cursor-pointer">Hijri Calendar</li>
        <li className="text-sm hover:text-blue-500 cursor-pointer">Al Quran</li>
        <li className="text-sm hover:text-blue-500 cursor-pointer">Prayer Times</li>
        <li className="text-sm hover:text-blue-500 cursor-pointer">Date Converter</li>
        <li className="text-sm hover:text-blue-500 cursor-pointer">Zakat Calculator</li>
      </ul>
    </div>
  );
};

export default Sidebar;


