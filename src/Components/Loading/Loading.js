import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
        role="status"
      ></div>
      <p className="mt-4 text-lg font-medium text-gray-700">
        Please wait, loading...
      </p>
    </div>
  );
}

export default Loading;
