import React from 'react'

const Indicator = () => {
  return (
    <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-red-300 rounded-full mr-2"></span>
          <span className="text-sm">Holiday</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-green-400 rounded-full mr-2"></span>
          <span className="text-sm">First Day</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 border-2 border-blue-800 bg-blue-300 rounded-full mr-2"></span>
          <span className="text-sm">Today</span>
        </div>
      </div>
  )
}

export default Indicator