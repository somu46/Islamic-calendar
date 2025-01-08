import React, { useState } from 'react';
import { getDateChanger } from '../../apiServices/apiServices';

export const DateConverter = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [convertedDate, setConvertedDate] = useState('');
  const [error, setError] = useState('');

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleConvert = async () => {
    if (!selectedDate) {
      setError('Please select a date first.');
      setConvertedDate('');
      return;
    }

    const formattedDate = formatDateToDDMMYYYY(selectedDate);
    console.log('Formatted Date for API:', formattedDate); // Debug formatted date

    try {
      const result = await getDateChanger(formattedDate);
      console.log('Converted Date Result:', result); // Debug API result
      setConvertedDate(result);
      setError('');
    } catch (err) {
      console.error('Conversion Error:', err);
      setError('Failed to convert the date. Please try again.');
      setConvertedDate('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Date Converter
        </h1>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Select a Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              console.log('Selected Date:', e.target.value); // Debugging log
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <button
          onClick={handleConvert}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Convert
        </button>
        {convertedDate && typeof convertedDate === 'string' && (
          <p className="mt-4 text-green-600 text-center">
            Converted Date: <strong>{convertedDate}</strong>
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DateConverter;
