import React, { useState } from "react";
import { getDateChanger } from "../../apiServices/apiServices";
import { CiCalendar } from "react-icons/ci";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";


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
    <>
    <div className="relative flex flex-col items-center  min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
      <div className="absolute top-[1px] left-0 hidden sm:block">
      <Breadcrumb pageName=' Date Converter:(Gregorian to Hijri)' />
      </div>
     
      <div className="absolute top-[1px] left-0 sm:hidden ">
      <Breadcrumb pageName=' Date Converter:(Greg to Hijri)' />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-[6.5rem]">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Hijri Date Converter
        </h1>
        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Select a Date
          </label>
          <div className="relative">
            <CiCalendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="date"
              id="date"
              name="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="block w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleConvert}
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Convert Date
        </button>
        {convertedDate && typeof convertedDate === "object" && (
          <div className="mt-8 text-green-600">
            <table className="table-auto mx-auto border-collapse border border-green-600">
              <thead>
                <tr>
                  <th className="border border-green-600 px-4 py-2 bg-green-100">
                    Attribute
                  </th>
                  <th className="border border-green-600 px-4 py-2 bg-green-100">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Hijri Date</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.date}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Day (EN)</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.weekday.en}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Day (AR)</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.weekday.ar}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Month (EN)</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.month.en}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Month (AR)</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.month.ar}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Days in Month</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.month.days}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">Year</td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.year}
                  </td>
                </tr>
                <tr>
                  <td className="border border-green-600 px-4 py-2">
                    Year (Designation)
                  </td>
                  <td className="border border-green-600 px-4 py-2">
                    {convertedDate.hijri.designation.expanded}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {error && (
          <p className="mt-4 text-red-600 text-center font-semibold">{error}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default DateConverter;
