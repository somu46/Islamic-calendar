import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const sidebarExpanded =  storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true';

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
  },);

  // Close on pressing the Escape key
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, );

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  },);

  return (
    <aside
      ref={sidebar}
      className={`fixed left-0 top-[3rem] z-30 flex min-h-screen w-56 flex-col  overflow-y-hidden bg-gray-300 text-black duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 py-4 lg:py-6">
        
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="text-white focus:outline-none lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="no-scrollbar flex flex-col overflow-y-auto px-5 py-6 lg:py-6 mt-[4.5rem]">
        <nav>
          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/data/islamic-calendar"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Islamic Calendar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/al-quran"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Al Quran
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/prayer-times"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/prayer-times-table"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
              Monthly Prayer Times Table
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/date-converter"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
              >
                Date Converter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/zakat-calculator"
                className={({ isActive }) =>
                  `text-sm hover:text-blue-500 ${isActive ? 'text-blue-500 font-bold' : ''}`
                }
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
