import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='  text-white font-bold top-0 w-full'>
         {/* Navbar */}
      <header className="bg-teal-700 text-white py-4 shadow-md">
        <nav className="container  flex justify-between ">
        <Link to='/'>  <h1 className="text-xl font-bold tracking-wide mx-3 ">Islamic Knowledge</h1></Link>
          <ul className="flex space-x-6">
            <li><NavLink to="/data/islamic-calendar" className="">Islamic Calendar</NavLink></li>
            <li><NavLink to="#prayers" className="">Prayer Times</NavLink></li>
            <li><NavLink to="#about" className="">About</NavLink></li>
            <li><NavLink to="#articles" className="">Blogs</NavLink></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar