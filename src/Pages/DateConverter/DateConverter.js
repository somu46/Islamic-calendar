import React, { useState } from "react";
import { getDateChanger } from "../../apiServices/apiServices";
import { CiCalendar } from "react-icons/ci";

export const DateConverter = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [convertedDate, setConvertedDate] = useState("");
  const [error, setError] = useState("");

  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleConvert = async () => {
    if (!selectedDate) {
      setError("Please select a date first.");
      setConvertedDate("");
      return;
    }

    const formattedDate = formatDateToDDMMYYYY(selectedDate);

    try {
      const result = await getDateChanger(formattedDate);
      setConvertedDate(result);
      setError("");
    } catch (err) {
      console.error("Conversion Error:", err);
      setError("Failed to convert the date. Please try again.");
      setConvertedDate("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Date Converter
        </h1>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700"
          >
            Select a Date
          </label>
          <div className="relative mt-1">
            <CiCalendar
              className="absolute left-3 top-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="date"
              id="date"
              name="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleConvert}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Convert
        </button>
        {convertedDate && typeof convertedDate === "object" && (
          <div className="mt-4 text-green-600 text-center">
            <p>
              <strong>Hijri Date:</strong> {convertedDate.hijri.date}
            </p>
            <p>
              <strong>Day (EN):</strong> {convertedDate.hijri.weekday.en}
            </p>
            <p>
              <strong>Day (AR):</strong> {convertedDate.hijri.weekday.ar}
            </p>
            <p>
              <strong>Month (EN):</strong> {convertedDate.hijri.month.en}
            </p>
            <p>
              <strong>Month (AR):</strong> {convertedDate.hijri.month.ar}
            </p>
            <p>
              <strong>Days in Month:</strong> {convertedDate.hijri.month.days}
            </p>
            <p>
              <strong>Year:</strong> {convertedDate.hijri.year}
            </p>
            <p>
              <strong>Year (Designation):</strong>{" "}
              {convertedDate.hijri.designation.expanded}
            </p>
          </div>
        )}
        {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default DateConverter;
