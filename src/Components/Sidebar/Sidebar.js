import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
// import SidebarLinkGroup from './SidebarGroup';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
// console.log(setSidebarExpanded,pathname);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // Close on pressing the Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[15rem] flex-col overflow-y-hidden text-white bg-[#1C2434] duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-4 px-6 py-5 lg:py-6 mt-5">
        <NavLink to="/">
          <h1 className="text-white my-3 font-bold text-xl">ISLAMIC Calendar</h1>
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        />
      </div>

      {/* Sidebar Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <ul className="mb-6 flex flex-col gap-4">
            {/* Updated NavLinks */}
            <li>
              <NavLink 
                to="/islamic-calendar" 
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 font-bold' : ''}`}
              >
                Islamic Calendar
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/al-quran" 
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 font-bold' : ''}`}
              >
                Al Quran
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/prayer-times" 
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 font-bold' : ''}`}
              >
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/date-converter" 
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 font-bold' : ''}`}
              >
                Date Converter
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/zakat-calculator" 
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 cursor-pointer ${isActive ? 'text-blue-500 font-bold' : ''}`}
              >
                Zakat Calculator
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
