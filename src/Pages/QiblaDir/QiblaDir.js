import React from 'react';
import Qibla from '../../Components/Qibla/QiblaDirection';
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';

const QiblaDir = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gradient-to-br from-teal-200 via-white to-teal-200 p-4">
      <Breadcrumb pageName="Qibla Direction" />
      <div className="mt-8">
        <Qibla />
      </div>
    </div>
  );
};

export default QiblaDir;