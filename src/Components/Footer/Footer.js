import React from 'react'

const Footer = () => {
  return (
    <div>
           <footer className="bg-teal-900 text-white py-6 z-50">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Islamic Knowledge.All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer