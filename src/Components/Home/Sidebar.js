import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="w-full h-full bg-gray-200 p-4">
     <NavLink to="/"> <h3 className="text-lg font-semibold">Home</h3></NavLink>
      <ul className="mt-2 space-y-4">
       <li><NavLink to="/app" className="text-sm hover:text-blue-500 cursor-pointer">Islamic calendar</NavLink></li
        <li><NavLink className="text-sm hover:text-blue-500 cursor-pointer">Al Quran</NavLink></li
        <li><NavLink className="text-sm hover:text-blue-500 cursor-pointer">Prayer Times</NavLink></li
       <li> <NavLink className="text-sm hover:text-blue-500 cursor-pointer">Date Converter</NavLink></li
      <li> <NavLink to="/zakat-calculator" className="text-sm hover:text-blue-500 cursor-pointer">Zakat Calculator</NavLink></li
       
      </ul>
    </div>
  );
};

export default Sidebar;


