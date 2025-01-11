import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Hamburger from "hamburger-react";
import SetLocation from "../SetLocation/SetLocation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="text-white font-bold top-0 w-full">
      {/* Navbar */}
      <header className="bg-teal-700 text-white py-4 shadow-md">
        <nav className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-bold tracking-wide mx-3 text-left"
          >
            Islamic Knowledge
          </Link>

          {/* Hamburger Icon */}
          <div className="md:hidden mx-3">
            <Hamburger
              toggled={isMenuOpen}
              toggle={setIsMenuOpen}
              color="#FFFFFF" // Adjust color for visibility
            />
          </div>

          {/* Navigation Links (Desktop) */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <NavLink
                to=""
                className="flex items-center px-3 hover:text-teal-500"
              >
                <SetLocation />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/islamic-calendar"
                className=" hover:text-teal-500"
              >
                Islamic Calendar
              </NavLink>
            </li>
            <li>
              <NavLink to="#prayers" className=" hover:text-teal-500">
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink to="#about" className=" hover:text-teal-500">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#articles" className=" hover:text-teal-500">
                Blogs
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="md:hidden bg-teal-600 space-y-2 py-4">
            <li>
              <NavLink
                to="#prayers"
                className="block px-4 py-2 hover: hover:text-teal-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#about"
                className="block px-4 py-2 hover: hover:text-teal-500"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#articles"
                className="block px-4 py-2 hover: hover:text-teal-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/islamic-calendar"
                className="block px-4 py-2 hover: hover:text-teal-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Islamic Calendar
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/data/al-quran"
                className="block px-4 py-2 hover: hover:text-teal-500"
              >
                Al Quran
              </NavLink>
              <NavLink
                to="/data/prayer-times"
                className="block px-4 py-2 hover: hover:text-teal-500"
              >
                Prayer Times
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/prayer-times-table"
                className="block px-4 py-2 hover: hover:text-teal-500"
              >
                Prayer Times Table
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/date-converter"
                className="block px-4 py-2 hover: hover:text-teal-500"
              >
                Date Converter
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/data/zakat-calculator"
                className="block px-4 py-2 hover: hover:text-teal-500"
              >
                Zakat Calculator
              </NavLink>
            </li>
          </ul>
        )}
      </header>
    </div>
  );
};

export default Navbar;
