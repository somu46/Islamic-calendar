import React from 'react';
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <div className="flex h-screen">
      
      <div className="w-1/6 border-r border-gray-300">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
